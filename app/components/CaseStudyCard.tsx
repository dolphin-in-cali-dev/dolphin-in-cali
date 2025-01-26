import { AsteriskIcon } from 'lucide-react';
import Image from 'next/image';
import { Fragment } from 'react';

import type { CaseStudyInfo } from '@/contents/case-studies-section';

type CaseStudyCardProps = {
  content: CaseStudyInfo;
};

const CaseStudyCard = ({ content }: CaseStudyCardProps) => {
  return (
    <div className="flex w-full flex-col gap-y-4">
      <Image
        src={content.thumbnail}
        alt={content.title}
        className="aspect-video w-full rounded-3xl border"
        width={400}
        height={400}
      />
      <div className="flex flex-col gap-y-2 text-neutral-600">
        <div className="flex items-center gap-x-2.5">
          <span>{content.tags[0]}</span>
          {content.tags.slice(1).map((tag) => (
            <Fragment key={`${content.title}_${tag}`}>
              <AsteriskIcon strokeWidth={1} />
              <span>{tag}</span>
            </Fragment>
          ))}
        </div>
        <span className="font-clash text-5xl font-medium text-neutral-800">
          {content.title}
        </span>
      </div>
    </div>
  );
};

export default CaseStudyCard;
