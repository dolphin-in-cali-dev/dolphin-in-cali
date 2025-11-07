'use client';

import logo from '@assets/images/logo-black.svg';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const ViewAllCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    // 링크 클릭 시 스크롤을 맨 위로 올리기
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 0);
  };

  return (
    <Link href="/works" className="block w-full" onClick={handleClick} scroll={true}>
      <div 
        className="group flex w-full flex-col gap-y-3 sm:gap-y-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
          <div className="relative flex aspect-video w-full flex-col items-center justify-center gap-y-4 bg-blue-600">
            <Image
              src={logo}
              alt="Dolphin in Cali Logo"
              width={80}
              height={80}
              className="h-12 w-12 brightness-0 invert sm:h-16 sm:w-16 lg:h-20 lg:w-20"
            />
            <span className="font-plus-jakarta-sans text-2xl font-medium text-white sm:text-3xl lg:text-3xl">
              View All Projects
            </span>
          </div>
          
          {/* Image overlay gradient - CaseStudyCard와 동일한 애니메이션 */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-t from-blue-600/30 to-transparent sm:rounded-3xl"
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        {/* CaseStudyCard와 동일한 높이를 위한 빈 텍스트 영역 */}
        <div className="flex flex-col gap-y-1.5 text-neutral-600 sm:gap-y-2">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:gap-x-2.5 sm:text-sm lg:text-base">
            <span className="invisible">Placeholder</span>
          </div>
          <span className="font-plus-jakarta-sans text-2xl font-medium text-transparent sm:text-3xl lg:text-5xl">
            Placeholder
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ViewAllCard;

