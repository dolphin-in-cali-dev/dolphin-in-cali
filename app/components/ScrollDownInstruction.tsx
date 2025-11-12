'use client';

import scrollDownIcon from '@assets/images/scroll-down-icon.svg';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const ScrollDownInstruction = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div ref={containerRef} className="flex w-full items-center justify-between">
      <motion.div style={{ rotate }}>
        <Image src={scrollDownIcon} alt="" width={20} height={20} className="h-5 w-5 sm:h-7 sm:w-7 lg:h-8 lg:w-8" quality={100} />
      </motion.div>
      <span className="font-anonymous-pro text-xs font-normal text-neutral-500 sm:text-base lg:text-xl">
        SCROLL DOWN TO OUR JOURNEY
      </span>
      <motion.div style={{ rotate }}>
        <Image src={scrollDownIcon} alt="" width={20} height={20} className="h-5 w-5 sm:h-7 sm:w-7 lg:h-8 lg:w-8" quality={100} />
      </motion.div>
    </div>
  );
};

export default ScrollDownInstruction;
