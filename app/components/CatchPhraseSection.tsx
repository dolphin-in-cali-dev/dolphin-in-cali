'use client';

import { useEffect, useRef, useState } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import AsteriskGraphic from './AsteriskGraphic';
import ScrollReveal from './ScrollReveal';

gsap.registerPlugin(ScrollTrigger);

const CatchPhraseSection = () => {
  const [progress, setProgress] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const currentRef = sectionRef.current;

    if (!currentRef) return;

    const handleScroll = () => {
      const rect = currentRef.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // 요소가 화면 중앙에 있을 때를 기준으로 계산
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const elementCenter = elementTop + elementHeight / 2;
      const viewportCenter = windowHeight / 2;
      
      // 진행도 계산 (0 ~ 1)
      // 요소 중심이 viewport 중심과 일치하면 1, 멀어질수록 0에 가까워짐
      const distance = Math.abs(elementCenter - viewportCenter);
      const maxDistance = windowHeight * 0.5;
      
      let calculatedProgress = 1 - Math.min(distance / maxDistance, 1);
      
      // 요소가 화면 밖에 있으면 0
      if (elementTop + elementHeight < 0 || elementTop > windowHeight) {
        calculatedProgress = 0;
      }
      
      // 값 범위 제한
      calculatedProgress = Math.max(0, Math.min(1, calculatedProgress));
      setProgress(calculatedProgress);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      handleScroll();
    };

    // 초기 계산
    setWindowWidth(window.innerWidth);
    handleScroll();

    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMounted]);

  // SVG 이미지 애니메이션
  useEffect(() => {
    if (!isMounted) return;
    
    const wrapperEl = imageRef.current;
    if (!wrapperEl) return;

    // 약간의 지연을 두고 실행 (DOM이 완전히 렌더링된 후)
    const timeoutId = setTimeout(() => {
      const imgEl = wrapperEl.querySelector('img') as HTMLImageElement;
      if (!imgEl) return;

      // 초기 상태 설정
      gsap.set(imgEl, {
        opacity: 0,
        filter: 'blur(10px)',
        transformOrigin: '0% 50%',
        rotate: 5,
      });

      // 회전 애니메이션
      gsap.fromTo(
        imgEl,
        { 
          transformOrigin: '0% 50%',
          rotate: 5 
        },
        {
          ease: 'none',
          rotate: 0,
          scrollTrigger: {
            trigger: wrapperEl,
            start: 'top bottom',
            end: 'center center',
            scrub: true,
          },
        }
      );

      // opacity와 blur 애니메이션
      gsap.fromTo(
        imgEl,
        {
          opacity: 0,
          filter: 'blur(10px)',
        },
        {
          ease: 'none',
          opacity: 1,
          filter: 'blur(0px)',
          scrollTrigger: {
            trigger: wrapperEl,
            start: 'top bottom-=20%',
            end: 'center center',
            scrub: true,
          },
        }
      );

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && trigger.vars.trigger === wrapperEl) {
          trigger.kill();
        }
      });
    };
  }, [isMounted]);

  // progress를 사용하여 transform과 opacity 계산
  // 반응형 translate 값 (모바일/태블릿/데스크톱)
  const getTranslateX = (mobile: number, tablet: number, desktop: number) => {
    if (!isMounted || windowWidth === 0) return desktop; // 초기 렌더링 시
    if (windowWidth < 640) return mobile; // sm 미만
    if (windowWidth < 1024) return tablet; // lg 미만
    return desktop; // lg 이상
  };

  const asteriskTranslate = -getTranslateX(0, 0, 36) * (1 - progress);
  const asteriskOpacity = progress;

  return (
    <div className="relative overflow-x-hidden">
      <div className="absolute -left-20 top-16 h-40 w-9/12 rounded-[1500px/400px] bg-[#2658ff] sm:top-24 sm:h-48 lg:top-32 lg:h-60 lg:rounded-[2000px/500px]" />
      <div className="absolute right-0 top-28 h-16 w-4/12 rounded-[800px/200px] bg-[#2658ff] sm:top-36 sm:h-20 lg:top-48 lg:h-24 lg:rounded-[1000px/300px]" />

      <div className="relative z-10 flex flex-col gap-y-16 bg-background/55 pb-16 pt-20 backdrop-blur-3xl sm:gap-y-20 sm:pb-24 sm:pt-28 lg:gap-y-28 lg:pb-32 lg:pt-40">
        <div ref={sectionRef} className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-y-8 px-6 sm:px-10 lg:flex-row lg:justify-center lg:gap-x-0">
          <div
            className="hidden items-center justify-end transition-all duration-300 ease-out lg:flex lg:-mr-16"
            style={isMounted ? {
              transform: `translateX(${asteriskTranslate}px)`,
              opacity: asteriskOpacity,
            } : undefined}
            suppressHydrationWarning
          >
            <AsteriskGraphic />
          </div>
          <div className="flex flex-col gap-y-4 sm:gap-y-6 lg:-ml-16 lg:gap-y-7">
            <div ref={imageRef} className="relative w-full" suppressHydrationWarning>
              <img
                src="/images/catchprise.svg"
                alt="FULL IDEA ENJOY IMAGINATION WITH COMPANY, WE THINK WITH YOUR IDEA, WE DREAM"
                className="w-full h-auto"
                style={isMounted ? {
                  willChange: 'opacity, filter, transform',
                } : undefined}
              />
            </div>
            {isMounted ? (
              <ScrollReveal
                as="div"
                baseOpacity={0}
                enableBlur={true}
                baseRotation={3}
                blurStrength={8}
                containerClassName="break-keep pl-8 text-sm leading-relaxed sm:pl-20 sm:text-base lg:pl-32 lg:text-lg"
                wordAnimationEnd="center center"
                rotationEnd="center center"
              >
                당신의 아이디어는 세상을 더 나아지게 할 잠재력을 가지고 있습니다.<br />그 아이디어가 세상을 움직일 파도가 될 수 있도록, 돌핀인캘리가 함께하겠습니다.
              </ScrollReveal>
            ) : (
              <div className="break-keep pl-8 text-sm leading-relaxed sm:pl-20 sm:text-base lg:pl-32 lg:text-lg">
                당신의 아이디어는 세상을 더 나아지게 할 잠재력을 가지고 있습니다.<br />그 아이디어가 세상을 움직일 파도가 될 수 있도록, 돌핀인캘리가 함께하겠습니다.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CatchPhraseSection;
