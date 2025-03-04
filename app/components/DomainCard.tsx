import Image from 'next/image';

import { Separator } from '@/components/ui/separator';
import type { DomainCardInfo } from '@/constants/domain-section';
import { cn } from '@/lib/utils';

type DomainCardProps = {
  content: DomainCardInfo;
};

const DomainCard = ({ content }: DomainCardProps) => {
  const titleLineNumber = (content.title.match(/\n/g) || []).length + 1;
  const lineClamp = {
    1: 'line-clamp-4',
    2: 'line-clamp-3',
    3: 'line-clamp-2',
    4: 'line-clamp-1',
  }[titleLineNumber];

  return (
    <div className="flex h-full flex-col gap-y-10 rounded-3xl bg-white p-6">
      <div className="flex flex-1 flex-col justify-between gap-y-6">
        <h4 className="whitespace-pre-line font-clash text-4xl font-semibold text-neutral-800">
          {content.title}
        </h4>
        <Image
          src={content.thumbnail}
          alt="Web Design & Development"
          className="h-40 w-full rounded-xl object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-4">
        <Separator className="w-16 bg-neutral-800" />
        <p className={cn('break-keep text-neutral-800', lineClamp)}>
          {content.description}
        </p>
      </div>
    </div>
  );
};

export default DomainCard;
