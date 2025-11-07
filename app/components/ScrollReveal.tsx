'use client';

import { useEffect, useRef, useMemo, ReactNode, createElement, isValidElement } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'div';
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom',
  as = 'p',
}) => {
  const containerRef = useRef<HTMLElement>(null);
  
  const splitText = useMemo(() => {
    // children을 줄 단위로 분리 (서버와 클라이언트에서 동일한 결과 보장)
    const processChildren = (node: ReactNode): ReactNode[] => {
      if (typeof node === 'string') {
        // 문자열을 <br />로 분리
        const lines = node.split(/<br\s*\/?>/gi);
        return lines.map((line, lineIndex) => {
          if (lineIndex > 0) {
            // 줄바꿈 후의 텍스트
            return (
              <div key={`line-${lineIndex}`} className="scroll-reveal-line">
                {line.split(/(\s+)/).map((word, wordIndex) => {
                  if (word.match(/^\s+$/)) {
                    return <span key={`space-${lineIndex}-${wordIndex}`}>{word}</span>;
                  }
                  return (
                    <span className="word" key={`word-${lineIndex}-${wordIndex}`}>
                      {word}
                    </span>
                  );
                })}
              </div>
            );
          }
          // 첫 줄
          return (
            <div key={`line-${lineIndex}`} className="scroll-reveal-line">
              {line.split(/(\s+)/).map((word, wordIndex) => {
                if (word.match(/^\s+$/)) {
                  return <span key={`space-${lineIndex}-${wordIndex}`}>{word}</span>;
                }
                return (
                  <span className="word" key={`word-${lineIndex}-${wordIndex}`}>
                    {word}
                  </span>
                );
              })}
            </div>
          );
        });
      }

      if (Array.isArray(node)) {
        const result: ReactNode[] = [];
        let currentLine: ReactNode[] = [];
        let lineIndex = 0;

        const processArrayItem = (item: ReactNode) => {
          if (typeof item === 'string') {
            currentLine.push(
              ...item.split(/(\s+)/).map((word, wordIndex) => {
                if (word.match(/^\s+$/)) {
                  return <span key={`space-${lineIndex}-${wordIndex}`}>{word}</span>;
                }
                return (
                  <span className="word" key={`word-${lineIndex}-${wordIndex}`}>
                    {word}
                  </span>
                );
              })
            );
          } else if (isValidElement(item) && item.type === 'br') {
            // 줄바꿈: 현재 줄을 완성하고 새 줄 시작
            if (currentLine.length > 0) {
              result.push(
                <div key={`line-${lineIndex}`} className="scroll-reveal-line">
                  {currentLine}
                </div>
              );
              currentLine = [];
              lineIndex++;
            }
          } else if (isValidElement(item)) {
            // 다른 요소는 현재 줄에 추가
            currentLine.push(item);
          }
        };

        node.forEach(processArrayItem);

        // 마지막 줄 추가
        if (currentLine.length > 0) {
          result.push(
            <div key={`line-${lineIndex}`} className="scroll-reveal-line">
              {currentLine}
            </div>
          );
        }

        return result;
      }

      if (isValidElement(node)) {
        if (node.type === 'br') {
          return [<br key="br" />];
        }
        // Use a type assertion on node to ensure props is not just {}:
        const element = node as React.ReactElement<any, any>;
        if (element.props && 'children' in element.props) {
          return processChildren(element.props.children);
        }
      }

      return [node];
    };

    return processChildren(children);
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // 컨테이너 회전 애니메이션
    const rotationTrigger = gsap.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: rotationEnd,
          scrub: true,
        },
      }
    );

    // 각 줄별로 애니메이션 적용
    const lineElements = el.querySelectorAll<HTMLElement>('.scroll-reveal-line');
    
    lineElements.forEach((lineEl, lineIndex) => {
      const wordElements = lineEl.querySelectorAll<HTMLElement>('.word');
      
      if (wordElements.length === 0) return;
      
      // 각 줄의 단어들에 대해 opacity와 blur 애니메이션
      // 줄 단위로 순차적으로 나타나도록 start 위치를 조정
      const lineOffset = lineIndex * 10; // 각 줄마다 10% offset
      
      // opacity와 blur 애니메이션 (fromTo 사용)
      if (enableBlur) {
        gsap.fromTo(
          wordElements,
          {
            opacity: baseOpacity,
            filter: `blur(${blurStrength}px)`,
            willChange: 'opacity, filter',
          },
          {
            ease: 'none',
            opacity: 1,
            filter: 'blur(0px)',
            stagger: 0.05,
            scrollTrigger: {
              trigger: el,
              start: `top bottom-=${20 + lineOffset}%`,
              end: wordAnimationEnd,
              scrub: true,
            },
          }
        );
      } else {
        gsap.fromTo(
          wordElements,
          {
            opacity: baseOpacity,
            willChange: 'opacity',
          },
          {
            ease: 'none',
            opacity: 1,
            stagger: 0.05,
            scrollTrigger: {
              trigger: el,
              start: `top bottom-=${20 + lineOffset}%`,
              end: wordAnimationEnd,
              scrub: true,
            },
          }
        );
      }
    });

    return () => {
      rotationTrigger.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === el) {
          trigger.kill();
        }
      });
    };
  }, [enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  // suppressHydrationWarning을 사용하여 hydration 경고 무시
  // (GSAP 애니메이션은 클라이언트에서만 적용되므로 안전)
  return createElement(
    as,
    {
      ref: containerRef,
      className: `scroll-reveal ${containerClassName}`,
      suppressHydrationWarning: true,
    },
    <span className={`scroll-reveal-text ${textClassName}`} suppressHydrationWarning>{splitText}</span>
  );
};

export default ScrollReveal;

