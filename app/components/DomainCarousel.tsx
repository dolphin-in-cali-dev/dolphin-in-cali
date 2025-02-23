'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { buttonVariants } from '@/components/ui/button';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { domainCards } from '@/constants/domain-section';
import { cn } from '@/lib/utils';

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

  const first = domainCards[0];
  const rest = domainCards.slice(1);

  return (
    <Carousel className="flex flex-col gap-y-4" setApi={setApi}>
      <CarouselContent>
        <CarouselItem className="flex basis-1/5 flex-col">
          <Link
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'w-fit items-center rounded-full border-black bg-transparent py-5 text-lg transition-colors duration-300 hover:bg-white',
            )}
            href="service"
          >
            Discover Our Service
            <ArrowUpRight />
          </Link>
        </CarouselItem>
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
