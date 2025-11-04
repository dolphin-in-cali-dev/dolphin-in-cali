'use client';

import { useEffect, useRef, useState } from 'react';

import AsteriskGraphic from './AsteriskGraphic';

const CatchPhraseSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.3,
        rootMargin: '-50px',
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <div className="absolute -left-20 top-16 h-40 w-9/12 rounded-[1500px/400px] bg-[#2658ff] sm:top-24 sm:h-48 lg:top-32 lg:h-60 lg:rounded-[2000px/500px]" />
      <div className="absolute right-0 top-28 h-16 w-4/12 rounded-[800px/200px] bg-[#2658ff] sm:top-36 sm:h-20 lg:top-48 lg:h-24 lg:rounded-[1000px/300px]" />

      <div className="relative z-10 flex flex-col gap-y-16 bg-background/55 pb-16 pt-20 backdrop-blur-3xl sm:gap-y-20 sm:pb-24 sm:pt-28 lg:gap-y-28 lg:pb-32 lg:pt-40">
        <div ref={sectionRef} className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-y-8 px-6 sm:px-10 lg:flex-row lg:justify-center lg:gap-x-0">
          <div
            className={`hidden items-center justify-end transition-all duration-700 ease-out lg:flex lg:-mr-16 ${
              isVisible
                ? 'translate-x-0 opacity-100'
                : '-translate-x-36 opacity-0'
            }`}
          >
            <AsteriskGraphic />
          </div>
          <div className="flex flex-col gap-y-4 sm:gap-y-6 lg:-ml-16 lg:gap-y-7">
            <p
              className={`break-keep text-xl font-bold leading-snug transition-all duration-700 ease-out sm:text-2xl sm:leading-snug lg:text-4xl lg:leading-snug ${
                isVisible
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-12 sm:translate-x-20 lg:translate-x-36 opacity-0'
              }`}
            >
              FULL IDEA ENJOY IMAGNIATION
              <br />
              WITH COMPANY, WE THINK
              <br />
              WITH YOUR IDEA, WE DREAM
            </p>
            <p
              className={`break-keep pl-8 text-sm leading-relaxed transition-all duration-700 ease-out sm:pl-20 sm:text-base lg:pl-32 lg:text-lg ${
                isVisible
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-16 sm:translate-x-28 lg:translate-x-48 opacity-0'
              }`}
            >
              {/* 돌핀인캘리는 아이디어를 현실화하는 걸 가장 좋아합니다. 아이디어가 현실이 되고 그 현실이 세상을 조금 더 나아지게 만들면 그 기분은 이루어 말할 수 없죠. 당신의 아이디어는 무엇인가요? */}
              돌핀인캘리는 당신의 아이디어를 현실로 만들어 드립니다.
              <br />
              그 아이디어가 세상을 나아지게 만든다면, 그 기분은 이루어 말할 수 없죠.
              <br />
              당신의 아이디어는 무엇인가요?
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CatchPhraseSection;
