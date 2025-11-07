'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

import { caseStudyItems } from '@/constants/case-studies-section';

import CaseStudyCard from './CaseStudyCard';
import ViewAllCard from './ViewAllCard';

const CaseStudyList = () => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Featured items만 필터링하고 8개만 가져오기
  const featuredItems = caseStudyItems
    .filter((item) => item.isFeatured)
    .slice(0, 8);

  return (
    <div ref={containerRef} className="relative w-full sm:px-6">
      <div ref={ref} className="relative grid grid-cols-1 pt-0 gap-6 sm:pt-4 sm:grid-cols-2 sm:gap-10 lg:pt-8 lg:grid-cols-3 lg:gap-4">
        {featuredItems.map((item, index) => (
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
        {/* View All Card - 일반 카드처럼 1칸만 차지 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: (featuredItems.length % 3) * 0.1 }}
          className="w-full"
        >
          <ViewAllCard />
        </motion.div>
      </div>
    </div>
  );
};

export default CaseStudyList;
