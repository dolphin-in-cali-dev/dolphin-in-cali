'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { CS_EMAIL } from '@/constants/basic';

import TitleGradient from './TitleGradient';

const TitleAnimation = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative max-h-[360px] overflow-hidden rounded-t-2xl rounded-br-2xl rounded-bl-2xl sm:max-h-[500px] sm:rounded-t-3xl sm:rounded-br-3xl lg:max-h-[600px]">
      {/* Right Bottom - Copyright */}
      <div className="absolute bottom-4 right-4 z-50 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-10">
        <span className="font-sans text-[10px] font-medium text-neutral-700 sm:text-xs lg:text-lg">© 2023.</span>
      </div>

      {/* Right Side - Contact Button */}
      <div className="absolute right-4 top-6 z-50 sm:right-6 lg:right-8">
        <Link
          className="flex w-fit items-center gap-x-1.5 rounded-full border border-black bg-black px-2 py-1 text-[14px] text-white transition-all duration-300 hover:bg-black hover:text-white sm:gap-x-2 sm:px-5 sm:py-2.5 sm:text-xs lg:px-6 lg:py-3 lg:text-sm"
          href={`mailto:${CS_EMAIL}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="whitespace-nowrap">
            <span>Contact </span><span className="hidden sm:inline"></span>Us
          </span>
          <motion.div
            animate={{
              y: isHovered ? [-2, 2, -2] : 0,
            }}
            transition={{
              duration: 0.6,
              ease: 'easeInOut',
              repeat: isHovered ? Infinity : 0,
            }}
          >
            <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4" />
          </motion.div>
        </Link>
      </div>
      {/* Main Text */}
      <div className="absolute -bottom-2 left-0 z-50 flex flex-col gap-y-1.5 pb-4 pl-4 pr-6 pt-6 sm:pb-6 sm:pl-6 sm:pr-8 sm:pt-8 lg:bg-background lg:clip-wave lg:gap-y-3 lg:pb-0 lg:pl-0 lg:pr-12 lg:pt-10">
        <span className="border-l-2 border-neutral-400 p-0.5 pl-1.5 text-[10px] text-slate-800 sm:pl-2 sm:text-xs lg:text-sm">
          SOLUTION FOR YOU
        </span>
        
        <h2 className="font-clash text-2xl font-bold leading-tight text-slate-800 sm:text-5xl lg:text-7xl">
          WEB APP
          <br />
          CREATIVE AGENCY
        </h2>
      </div>

      {/* CONTACT Button */}
      {/* <a
        href={`mailto:${CS_EMAIL}`}
        className="clip-connect-button absolute bottom-2 left-[280px] flex items-center gap-x-2 rounded-r-full bg-[radial-gradient(circle_at_194px,transparent_21px,rgba(5,57,203,0.6)_22px)] p-1 pl-8 sm:bottom-2.5 sm:left-[420px] sm:gap-x-3 sm:p-1.5 sm:pl-10 md:left-[550px] lg:left-[732px] lg:pl-14"
      >
        <span className="whitespace-nowrap text-xs font-medium text-white sm:text-sm lg:text-base">
          CONTACT US
        </span>
        <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full sm:h-[38px] sm:w-[38px] lg:h-[42px] lg:w-[42px]">
          <ArrowUpRight className="h-4 w-4 sm:h-[18px] sm:w-[18px] lg:h-5 lg:w-5" />
        </div>
      </a> */}

      <TitleGradient />
    </div>
  );
};

export default TitleAnimation;
