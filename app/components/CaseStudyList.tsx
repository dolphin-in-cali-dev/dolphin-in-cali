import dummyImage1 from '@assets/images/dummy-portfolio-1.png';
import dummyImage2 from '@assets/images/dummy-portfolio-2.png';
import Image from 'next/image';

import { caseStudyItems } from '@/constants/case-studies-section';

import CaseStudyCard from './CaseStudyCard';

const CaseStudyList = () => {
  if (caseStudyItems.length % 2 !== 0)
    throw new Error('The number of case study items should be even');

  const rowNumber = caseStudyItems.length / 2;
  return (
    <div className="flex flex-col gap-16">
      {Array.from({ length: rowNumber }).map((_, index) => {
        const evenItem = caseStudyItems[index * 2];
        const oddItem = caseStudyItems[index * 2 + 1];
        return (
          <div
            className="flex w-full flex-row gap-x-12 space-y-8"
            key={`${evenItem.title}_${oddItem.title}`}
          >
            <CaseStudyCard content={evenItem} />
            <CaseStudyCard content={oddItem} />
          </div>
        );
      })}
      <div className="relative">
        <div className="flex w-full flex-row gap-x-12 space-y-8">
          <div className="w-full">
            <Image
              src={dummyImage1}
              alt="Next Project 1"
              className="aspect-video w-full rounded-t-3xl border object-cover object-top"
            />
          </div>
          <div className="w-full">
            <Image
              src={dummyImage2}
              alt="Next Project 1"
              className="aspect-video w-full rounded-t-3xl border object-cover object-top"
            />
          </div>
        </div>
        <div className="absolute -left-3 bottom-0 h-[420px] w-[102%] bg-gradient-to-t from-white from-10% to-white/40 backdrop-blur-sm" />
      </div>
    </div>
  );
};

export default CaseStudyList;
