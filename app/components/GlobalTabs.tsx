'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const GlobalTabs = () => {
  const pathname = usePathname();
  const isRooftop = pathname.split('/')?.[1] === 'rooftop';

  return (
    <header className="mx-auto flex w-full max-w-[1440px] gap-x-2 px-10">
      <Link
        href="/"
        className={cn(
          'rounded-b-lg px-2 pb-2 pt-3 text-sm font-extrabold',
          isRooftop ? 'text-neutral-500' : 'bg-neutral-900 text-white',
        )}
      >
        AGENCY
      </Link>
      <Link
        href="/rooftop"
        className={cn(
          'rounded-b-lg px-2 pb-2 pt-3 text-sm font-extrabold',
          isRooftop ? 'bg-neutral-900 text-white' : 'text-neutral-500',
        )}
      >
        ROOFTOP
      </Link>
    </header>
  );
};

export default GlobalTabs;
