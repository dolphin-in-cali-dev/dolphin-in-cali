'use client';

import { useEffect, useState } from 'react';

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { domainCards } from '@/constants/domain-section';

import CarouselIndicator from './CarouselIndicator';
import DomainCard from './DomainCard';

const DomainCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setTotal(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // const first = domainCards[0];
  const rest = domainCards.slice(0);

  return (
    <Carousel className="flex flex-col gap-y-3 sm:gap-y-4" setApi={setApi}>
      <CarouselContent>
        {/* <CarouselItem className="basis-full sm:basis-3/5 lg:basis-1/3">
          <MainDomainCard content={domainCards[0]} />
        </CarouselItem> */}
        {rest.map((content) => (
          <CarouselItem key={content.title} className="basis-full sm:basis-3/5 lg:basis-1/3">
            <DomainCard content={content} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {total > 1 && (
        <div className="flex items-center justify-between">
          <div>
            <CarouselPrevious />
            <CarouselNext />
          </div>
          <CarouselIndicator current={current} total={total} />
        </div>
      )}
    </Carousel>
  );
};

export default DomainCarousel;
