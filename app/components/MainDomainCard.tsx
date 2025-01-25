import Image from 'next/image';

import { Separator } from '@/components/ui/separator';
import type { DomainCardInfo } from '@/contents/domain-section';

type MainDomainCardProps = {
  content: DomainCardInfo;
};

const MainDomainCard = ({ content }: MainDomainCardProps) => {
  return (
    <div className="flex h-full flex-col justify-between gap-y-10 rounded-3xl bg-white p-6">
      <div className="relative">
        <h4 className="absolute bottom-6 left-6 font-clash text-4xl font-medium text-white">
          {content.title}
        </h4>
        <Image
          src={content.thumbnail}
          alt="Web Design & Development"
          className="h-60 w-full rounded-xl"
          width={200}
          height={200}
        />
      </div>
      <div className="flex flex-col gap-y-4">
        <Separator className="w-16 bg-neutral-800" />
        <p className="line-clamp-3 text-neutral-800">{content.description}</p>
      </div>
    </div>
  );
};

export default MainDomainCard;
