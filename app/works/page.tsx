'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import CaseStudyCard from '@/app/components/CaseStudyCard';
import { caseStudyItems } from '@/constants/case-studies-section';

const WorksPage = () => {
  const pathname = usePathname();

  useEffect(() => {
    // 페이지 로드 시 스크롤을 맨 위로 올리기
    const scrollToTop = () => {
      // Lenis 인스턴스 찾기
      const lenisElement = document.querySelector('[data-lenis-root]');
      // @ts-expect-error - Lenis internal property
      const lenis = lenisElement?.__lenis || window.lenis;
      
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        // Lenis를 찾을 수 없으면 직접 스크롤 요소 조작
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    };

    // 즉시 실행
    scrollToTop();

    // Lenis 초기화 대기 후 다시 시도
    const timers = [
      setTimeout(scrollToTop, 0),
      setTimeout(scrollToTop, 50),
      setTimeout(scrollToTop, 100),
      setTimeout(scrollToTop, 200),
    ];

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [pathname]);

  return (
    <main className="mx-auto min-h-screen w-full max-w-[1440px] px-6 pb-20 pt-10 sm:px-10">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-slate-900 sm:text-6xl lg:text-7xl">
          OUR WORKS.
        </h1>
        <p className="mt-4 text-lg text-neutral-600 sm:text-xl">
          돌핀인캘리와 함께한 프로젝트들을 소개합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-4">
        {caseStudyItems.map((project) => (
          <CaseStudyCard key={project.title} content={project} />
        ))}
      </div>
    </main>
  );
};

export default WorksPage;

