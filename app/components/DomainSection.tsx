import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import DomainCarousel from './DomainCarousel';

const DomainSection = () => {
  return (
    <div>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-y-8 px-6 pb-12 pt-8 sm:gap-y-10 sm:px-10 sm:pb-16 sm:pt-10 lg:gap-y-14 lg:pb-24 lg:pt-12">
        <div className="flex items-center justify-between gap-x-3 sm:gap-x-4">
          <h3 className="font-clash text-2xl font-medium text-neutral-800 sm:text-4xl lg:text-6xl">.What we do</h3>
          <Link
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'flex w-fit items-center gap-x-1.5 rounded-full border-black bg-transparent px-3 py-1.5 text-[10px] transition-colors duration-300 hover:bg-black hover:text-white sm:gap-x-2 sm:px-6 sm:py-4 sm:text-base lg:px-8 lg:py-5 lg:text-lg',
            )}
            href="/service"
          >
            <span className="whitespace-nowrap">
              <span className="hidden sm:inline">Discover </span>Our Service
            </span>
            <ArrowUpRight className="h-3 w-3 sm:h-5 sm:w-5" />
          </Link>
        </div>
        <DomainCarousel />
      </div>
    </div>
  );
};

export default DomainSection;
