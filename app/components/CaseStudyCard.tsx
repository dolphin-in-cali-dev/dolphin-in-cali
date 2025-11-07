'use client';

import { motion } from 'framer-motion';
import { AsteriskIcon } from 'lucide-react';
import Image from 'next/image';
import { Fragment, useState } from 'react';

import type { CaseStudyInfo } from '@/constants/case-studies-section';

type CaseStudyCardProps = {
  content: CaseStudyInfo;
};

const CaseStudyCard = ({ content }: CaseStudyCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group flex w-full flex-col gap-y-3 sm:gap-y-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
        <Image
          src={content.thumbnail}
          alt={content.title}
          className="aspect-video w-full rounded-2xl sm:rounded-3xl"
          width={400}
          height={400}
        />
        
        {/* Image overlay gradient */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-t from-blue-600/30 to-transparent sm:rounded-3xl"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      <div className="flex flex-col gap-y-1.5 text-neutral-600 sm:gap-y-2">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:gap-x-2.5 sm:text-sm lg:text-base">
          <span>{content.tags[0]}</span>
          {content.tags.slice(1).map((tag) => (
            <Fragment key={`${content.title}_${tag}`}>
              <AsteriskIcon strokeWidth={1} className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{tag}</span>
            </Fragment>
          ))}
        </div>
        <span className="font-clash text-2xl font-medium text-neutral-800 transition-colors duration-300 group-hover:text-blue-600 sm:text-3xl lg:text-5xl">
          {content.title}
        </span>
      </div>
    </div>
  );
};

export default CaseStudyCard;
