'use client';

import fragmentShaderSource from '@app/shaders/wave.frag';
import vertexShaderSource from '@app/shaders/wave.vert';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

type ShaderTestProps = {
  className?: string;
};

const BLACKHOLE_MASS = 3000;

const WavyAnimationCanvas = ({ className }: ShaderTestProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2');
    if (!gl) {
      console.error('WebGL 2 is not supported');
      return;
    }

    const createShader = (
      gl: WebGL2RenderingContext,
      type: number,
      source: string,
    ): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const createProgram = (
      gl: WebGL2RenderingContext,
      vertexShader: WebGLShader,
      fragmentShader: WebGLShader,
    ): WebGLProgram | null => {
      const program = gl.createProgram();
      if (!program) return null;
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }
      return program;
    };

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource,
    );
    if (!vertexShader || !fragmentShader) return;

    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    const positionAttributeLocation = gl.getAttribLocation(
      program,
      'aPosition',
    );
    const texCoordAttributeLocation = gl.getAttribLocation(
      program,
      'aTexCoord',
    );
    const resolutionUniformLocation = gl.getUniformLocation(
      program,
      'iResolution',
    );
    const timeUniformLocation = gl.getUniformLocation(program, 'iTime');
    const mouseUniformLocation = gl.getUniformLocation(program, 'iMouse');
    const massUniformLocation = gl.getUniformLocation(program, 'u_mass');

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    gl.useProgram(program);

    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(texCoordAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.vertexAttribPointer(texCoordAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

      // 화면 크기에 따른 반응형 위치 계산 (모바일 대응)
      const isMobile = canvas.width < 640;
      let originalX, originalY;
      
      if (isMobile) {
        // 모바일: 화면 중앙
        originalX = canvas.width / 2;
        originalY = canvas.height / 2;
      } else {
        // 데스크톱: 우측 상단
        const paddingX = Math.min(canvas.width * 0.08, 120);
        const paddingY = Math.min(canvas.height * 0.12, 120);
        originalX = canvas.width - paddingX;
        originalY = paddingY;
      }
      
      mouseRef.current = { x: originalX, y: originalY };
      targetMouseRef.current = { x: originalX, y: originalY };
      setTextPosition({ x: originalX, y: originalY });
    };

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const render = (time: number) => {
      const lerpFactor = 0.07;
      mouseRef.current = {
        x: lerp(mouseRef.current.x, targetMouseRef.current.x, lerpFactor),
        y: lerp(mouseRef.current.y, targetMouseRef.current.y, lerpFactor),
      };

      setTextPosition({
        x: mouseRef.current.x,
        y: canvas.height - mouseRef.current.y,
      });

      gl.uniform3f(resolutionUniformLocation, canvas.width, canvas.height, 1.0);
      gl.uniform1f(timeUniformLocation, time * 0.001);
      gl.uniform2f(
        mouseUniformLocation,
        mouseRef.current.x,
        mouseRef.current.y,
      );
      gl.uniform1f(massUniformLocation, BLACKHOLE_MASS * 0.00001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(render);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    requestAnimationFrame(render);

    const handleMouseMove = (event: MouseEvent) => {
      // 모바일에서는 마우스 이벤트 무시
      const isMobile = canvas.width < 640;
      if (isMobile) return;
      
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current = {
        x: event.clientX - rect.left,
        y: canvas.height - (event.clientY - rect.top),
      };
    };

    const handleMouseLeave = () => {
      // 화면 크기에 따른 반응형 위치 계산 (모바일 대응)
      const isMobile = canvas.width < 640;
      let originalX, originalY;
      
      if (isMobile) {
        // 모바일: 화면 중앙
        originalX = canvas.width / 2;
        originalY = canvas.height / 2;
      } else {
        // 데스크톱: 우측 상단
        const paddingX = Math.min(canvas.width * 0.08, 120);
        const paddingY = Math.min(canvas.height * 0.12, 120);
        originalX = canvas.width - paddingX;
        originalY = paddingY;
      }
      
      targetMouseRef.current = { x: originalX, y: originalY };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className={cn('relative h-full w-full', className)}>
      <canvas ref={canvasRef} className="h-full w-full" />
      <div
        className="pointer-events-none absolute"
        style={{
          left: `${textPosition.x}px`,
          top: `${textPosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <span className="font-clash text-5xl font-black text-white sm:text-4xl lg:text-3xl">
          CONTACT
        </span>
      </div>
    </div>
  );
};

export default WavyAnimationCanvas;
