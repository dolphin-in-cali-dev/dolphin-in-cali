'use client';

import { useEffect, useRef, useState } from 'react';

import ScrollDownInstruction from './ScrollDownInstruction';
import TitleAnimation from './TitleAnimation';

const TitleSection = () => {
  const [titleAnimationHeight, setTitleAnimationHeight] = useState<number | null>(null);
  const scrollDownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateHeight = () => {
      if (!scrollDownRef.current) return;

      const viewportHeight = window.innerHeight;
      const scrollDownHeight = scrollDownRef.current.offsetHeight;
      const windowWidth = window.innerWidth;
      
      // 반응형 gap-y 값
      const gap = windowWidth >= 1024 ? 24 : windowWidth >= 640 ? 20 : 16;
      
      // 반응형 padding-bottom 값
      const paddingBottom = windowWidth >= 1024 ? 24 : windowWidth >= 640 ? 20 : 24;
      
      // TitleAnimation 높이 계산
      const calculatedHeight = viewportHeight - scrollDownHeight - gap - paddingBottom;
      
      setTitleAnimationHeight(Math.max(calculatedHeight, 400));
    };

    // 초기 계산
    calculateHeight();

    // 리사이즈 이벤트
    window.addEventListener('resize', calculateHeight);
    
    // DOM이 완전히 렌더링된 후 재계산
    const timeoutId = setTimeout(calculateHeight, 100);

    return () => {
      window.removeEventListener('resize', calculateHeight);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="mx-auto flex w-full flex-col gap-y-4 px-6 pb-6 sm:gap-y-5 sm:px-10 sm:pb-5 lg:gap-y-6 lg:pb-6" 
      style={{ minHeight: '100vh' }}
    >
      <div className="flex flex-col gap-y-4 sm:gap-y-5 lg:gap-y-6">
        <div 
          style={titleAnimationHeight ? { height: `${titleAnimationHeight-50}px`, minHeight: '400px' } : { minHeight: '600px' }}
        >
          <TitleAnimation />
        </div>
        <div ref={scrollDownRef}>
          <ScrollDownInstruction />
        </div>
      </div>
    </div>
  );
};

export default TitleSection;
