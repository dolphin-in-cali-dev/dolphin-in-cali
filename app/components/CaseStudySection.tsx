'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Marquee from 'react-fast-marquee';

import CaseStudyList from './CaseStudyList';
import GradualBlur from './GradualBlur';

const CaseStudySection = () => {
  const [isFixed, setIsFixed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current && headerRef.current) {
        const sectionTop = sectionRef.current.getBoundingClientRect().top;
        const sectionBottom = sectionRef.current.getBoundingClientRect().bottom;
        const headerHeight = headerRef.current.offsetHeight;

        // 섹션이 화면 상단 위로 올라가고, 아직 섹션이 화면에 남아있으면 fixed
        if (sectionTop < 0 && sectionBottom > headerHeight + 100) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 체크

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative">
      <div className="mx-auto max-w-[1440px] pb-8 sm:pb-24 lg:pb-16 ">
        <div
          ref={headerRef}
          className={`pb-2 pt-4 transition-all duration-500 ease-out sm:pb-4 lg:pb-5 ${isFixed
              ? 'fixed left-0 right-0 top-0 z-[200]'
              : 'relative z-40 bg-background'
            }`}
          style={isFixed ? { maxWidth: '1440px', margin: '0 auto', paddingLeft: '1.5rem', paddingRight: '1.5rem' } : {}}
        >
          <GradualBlur
            target={isFixed ? "page" : "parent"}
            position="top"
            height="8rem"
            strength={4.5}
            divCount={3}
            curve="bezier"
            exponential={true}
            opacity={1}
            zIndex={10}
          />
          <div className="flex items-center justify-end gap-x-3 px-6 sm:gap-x-4 relative z-[201]">
            <Link
              className="group flex w-fit items-center gap-x-1 transition-colors duration-300 sm:gap-x-1.5"
              href="/works"
              scroll={true}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-transparent transition-colors duration-300 group-hover:bg-black sm:h-10 sm:w-10 lg:h-12 lg:w-12">
                <ArrowUpRight className="h-4 w-4 transition-colors duration-300 group-hover:text-white sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
              </div>
              <h3 className="font-clash text-2xl font-medium text-black transition-colors duration-300 group-hover:text-blue-600 sm:text-4xl lg:text-6xl">
                Featured Work.
              </h3>
            </Link>
          </div>
        </div>
          
        {/* Spacer when fixed */}
        {isFixed && <div className="h-[60px] sm:h-[80px] lg:h-[100px]" />}
        <div className="mt-8 px-6 space-y-6 sm:mt-10 sm:space-y-16 lg:mt-8 lg:space-y-12">
          <CaseStudyList />
          <Marquee autoFill className="py-1 sm:py-8">
            <span className="ml-20 text-xl font-medium font-clash sm:ml-32 sm:text-2xl lg:text-3xl">
            what is your idea? 🤔
            </span>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default CaseStudySection;
