import Image from 'next/image';

import { Separator } from '@/components/ui/separator';
import type { DomainCardInfo } from '@/constants/domain-section';

type MainDomainCardProps = {
  content: DomainCardInfo;
};

const MainDomainCard = ({ content }: MainDomainCardProps) => {
  return (
    <div className="flex h-full flex-col justify-between gap-y-6 rounded-2xl bg-white p-4 sm:gap-y-8 sm:rounded-3xl sm:p-5 lg:gap-y-10 lg:p-6">
      <div className="relative">
        <h4 className="absolute bottom-3 left-3 whitespace-pre-line font-clash text-xl font-medium text-white sm:bottom-4 sm:left-4 sm:text-2xl lg:bottom-6 lg:left-6 lg:text-4xl">
          {content.title}
        </h4>
        <Image
          src={content.thumbnail}
          alt="Web Design & Development"
          className="h-48 w-full rounded-lg sm:h-52 sm:rounded-xl lg:h-60"
          width={200}
          height={200}
        />
      </div>
      <div className="flex flex-col gap-y-3 sm:gap-y-4">
        <Separator className="w-12 bg-neutral-800 sm:w-14 lg:w-16" />
        <p className="line-clamp-3 break-keep text-sm text-neutral-800 sm:text-base">
          {content.description}
        </p>
      </div>
    </div>
  );
};

export default MainDomainCard;
