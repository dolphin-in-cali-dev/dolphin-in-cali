'use client';

import { useEffect, useRef, useState } from 'react';

import { Separator } from '@/components/ui/separator';

const MainDescription = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.3,
        rootMargin: '-50px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="flex w-full flex-col items-center justify-center gap-y-12 sm:gap-y-16 lg:gap-y-20">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full flex-col items-center gap-y-3 pb-24 sm:gap-y-4">
          <p
            className={`break-keep text-center text-lg leading-8 text-neutral-700 transition-all duration-700 ease-out sm:text-2xl sm:leading-10 lg:text-3xl lg:leading-[3rem] ${isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
              }`}
            style={{ transitionDelay: '0ms' }}
          >
            돌핀인캘리는 효과적인 디지털 경험을 설계하는 데 중점을 둡니다.
            <br />
            아름답고 기능적인 웹앱을 만드는 것을 넘어, 모든 과정을 깊이 있게 동행합니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainDescription;
