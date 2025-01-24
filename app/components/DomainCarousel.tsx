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
import { domainContent } from '@/contents/domain-carousel';

import CarouselIndicator from './CarouselIndicator';
import DomainCard from './DomainCard';
import MainDomainCard from './MainDomainCard';

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

  const first = domainContent[0];
  const rest = domainContent.slice(1);

  return (
    <Carousel className="flex flex-col gap-y-4" setApi={setApi}>
      <CarouselContent>
        <CarouselItem className="basis-1/3">
          <MainDomainCard content={first} />
        </CarouselItem>
        {rest.map((content) => (
          <CarouselItem key={content.title} className="basis-1/3">
            <DomainCard content={content} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex items-center justify-between">
        <div>
          <CarouselPrevious />
          <CarouselNext />
        </div>
        <CarouselIndicator current={current} total={total} />
      </div>
    </Carousel>
  );
};

export default DomainCarousel;
