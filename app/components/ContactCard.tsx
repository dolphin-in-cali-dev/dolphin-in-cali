import { CS_EMAIL } from '@/constants/basic';

import WavyAnimationCanvas from './WavyAnimationCanvas';

const ContactCard = () => {
  return (
    <div className="h-[520px] w-full overflow-hidden rounded-3xl bg-background">
      <a href={`mailto:${CS_EMAIL}`} className="relative size-full">
        <div className="pointer-events-none absolute bottom-10 left-10 z-10 flex flex-col gap-y-1">
          <span className="font-clash text-7xl font-black text-neutral-800">
            Who&apos;s Next?
          </span>
          <span className="font-clash text-4xl font-medium text-neutral-800">
            Tell us about your great idea
          </span>
        </div>
        <WavyAnimationCanvas />
      </a>
    </div>
  );
};

export default ContactCard;
