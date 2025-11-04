'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

import { caseStudyCards } from '@/constants/case-studies-section';

import CaseStudyCard from './CaseStudyCard';

const CaseStudyList = () => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative w-full sm:px-6">
      <div ref={ref} className="relative grid grid-cols-1 pt-0 gap-6 sm:pt-4 sm:grid-cols-2 sm:gap-10 lg:pt-8 lg:grid-cols-3 lg:gap-4">
        {caseStudyCards.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: (index % 3) * 0.1 }}
            className="w-full"
          >
            <CaseStudyCard content={item} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudyList;
