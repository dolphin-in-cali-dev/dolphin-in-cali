'use client';

import { useEffect, useRef, useState } from 'react';

import { Gradient } from '../Gradient.js';

const TitleGradient = () => {
  const [isMounted, setIsMounted] = useState(false);
  const gradientInitialized = useRef(false);
  const gradientRef = useRef<Gradient | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || gradientInitialized.current) return;
    
    const canvas = document.getElementById('gradient-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    canvasRef.current = canvas;
    
    const gradient = new Gradient();
    // @ts-expect-error Property 'initGradient' does not exist on type 'Gradient'.
    gradient.initGradient('#gradient-canvas');
    gradientRef.current = gradient;
    gradientInitialized.current = true;

    // Gradient.js의 init()이 비동기적으로 호출되므로, 
    // 잠시 후 window resize 이벤트 리스너를 제거
    // ResizeObserver를 사용하여 실제 canvas 크기를 감지하므로 window resize는 불필요
    const removeWindowResizeListener = () => {
      const gradientInstance = gradientRef.current as unknown as {
        resize: () => void;
      };
      if (gradientInstance && gradientInstance.resize) {
        window.removeEventListener('resize', gradientInstance.resize);
      }
    };
    
    // Gradient.js의 init()이 완료될 때까지 대기 후 제거
    setTimeout(removeWindowResizeListener, 1000);

    // TitleSection의 높이 변경 이벤트 수신 (동기화)
    const handleTitleHeightChange = () => {
      // ResizeObserver가 자동으로 감지하므로 별도 처리 불필요
      // 하지만 명시적으로 알림을 받아서 처리할 수도 있음
      requestAnimationFrame(() => {
        // ResizeObserver가 자동으로 처리하므로 별도 로직 불필요
      });
    };

    window.addEventListener('titleHeightChanged', handleTitleHeightChange);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        
        // 디바운싱: resize 이벤트가 너무 자주 발생하는 것을 방지
        if (resizeTimeoutRef.current) {
          clearTimeout(resizeTimeoutRef.current);
        }
        
        resizeTimeoutRef.current = setTimeout(() => {
          if (gradientRef.current && canvasRef.current) {
            // Gradient 인스턴스의 width와 height를 실제 canvas 크기로 설정
            const gradient = gradientRef.current as unknown as {
              width: number;
              height: number;
              resize: () => void;
              minigl: {
                setSize: (w: number, h: number) => void;
                setOrthographicCamera: () => void;
              };
              conf: {
                density: [number, number];
              };
              mesh: {
                geometry: {
                  setTopology: (x: number, y: number) => void;
                  setSize: (w: number, h: number) => void;
                };
                material: {
                  uniforms: {
                    u_shadow_power: {
                      value: number;
                    };
                  };
                };
              };
            };
            
            const actualWidth = Math.round(width);
            const actualHeight = Math.round(height);
            
            // 실제 canvas 크기로 설정
            gradient.width = actualWidth;
            gradient.height = actualHeight;
            
            // resize 메서드가 window.innerWidth로 덮어쓰는 것을 방지하기 위해
            // resize 메서드의 로직을 직접 수행
            gradient.minigl.setSize(actualWidth, actualHeight);
            gradient.minigl.setOrthographicCamera();

            const xSegCount = Math.ceil(actualWidth * gradient.conf.density[0]);
            const ySegCount = Math.ceil(actualHeight * gradient.conf.density[1]);

            gradient.mesh.geometry.setTopology(xSegCount, ySegCount);
            gradient.mesh.geometry.setSize(actualWidth, actualHeight);
            gradient.mesh.material.uniforms.u_shadow_power.value = actualWidth < 600 ? 5 : 6;
          }
        }, 150); // 150ms 디바운싱
      }
    });

    resizeObserver.observe(canvas);

    return () => {
      window.removeEventListener('titleHeightChanged', handleTitleHeightChange);
      resizeObserver.disconnect();
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      // Gradient의 disconnect 메서드 호출하여 이벤트 리스너 정리
      if (gradientRef.current) {
        const gradient = gradientRef.current as unknown as {
          disconnect: () => void;
        };
        gradient.disconnect();
      }
    };
  }, [isMounted]);

  return (
    <div 
      className="h-full w-full overflow-hidden relative" 
      suppressHydrationWarning
    >
      <canvas 
        id="gradient-canvas" 
        data-transition-in 
        className="h-full w-full absolute inset-0"
        style={{ 
          backgroundColor: 'transparent',
          display: 'block',
          imageRendering: 'auto',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
      />
    </div>
  );
};

export default TitleGradient;
