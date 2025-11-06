'use client';

import { domainCards } from '@/constants/domain-section';

import DomainCard from './DomainCard';

const DomainCarousel = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
      {domainCards.map((content) => (
        <DomainCard key={content.title} content={content} />
      ))}
    </div>
  );
};

export default DomainCarousel;
