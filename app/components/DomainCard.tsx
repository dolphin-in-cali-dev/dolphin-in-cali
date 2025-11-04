'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

import type { DomainCardInfo } from '@/constants/domain-section';
import { cn } from '@/lib/utils';

type DomainCardProps = {
  content: DomainCardInfo;
};

const DomainCard = ({ content }: DomainCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const titleLineNumber = (content.title.match(/\n/g) || []).length + 1;
  const lineClamp = {
    1: 'line-clamp-4',
    2: 'line-clamp-3',
    3: 'line-clamp-2',
    4: 'line-clamp-1',
  }[titleLineNumber];

  return (
    <motion.div
      className="group relative h-full overflow-hidden rounded-2xl  sm:rounded-3xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Card content */}
      <div className="relative flex h-full flex-col gap-y-6 rounded-2xl p-4 transition-all duration-300 sm:gap-y-8 sm:rounded-3xl sm:p-5 lg:gap-y-10 lg:p-6">
        <div className="flex flex-col gap-y-4 sm:gap-y-5 lg:gap-y-6">
          <h4 className="whitespace-pre-line font-clash text-2xl font-bold text-neutral-800 transition-colors duration-300 group-hover:text-blue-600 sm:text-3xl lg:text-4xl">
            {content.title}
          </h4>
          
          {/* <div className="relative overflow-hidden rounded-lg sm:rounded-xl">
            <Image
              src={content.thumbnail}
              alt={content.title}
              className="h-32 w-full rounded-lg object-cover transition-all duration-500 sm:h-36 sm:rounded-xl lg:h-40"
            />
            
            <motion.div
              className="absolute inset-0 rounded-lg bg-gradient-to-t from-blue-600/30 to-transparent sm:rounded-xl"
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </div> */}
        </div>
        
        <div className="flex flex-col gap-y-3 sm:gap-y-4">
          <p
            className={cn(
              'break-keep text-sm text-neutral-700 transition-colors duration-300 group-hover:text-neutral-900 sm:text-base',
              lineClamp,
            )}
          >
            {content.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default DomainCard;
