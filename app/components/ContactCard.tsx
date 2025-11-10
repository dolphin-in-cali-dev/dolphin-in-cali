import Link from 'next/link';

import WavyAnimationCanvas from './WavyAnimationCanvas';

const ContactCard = () => {
  return (
    <div className="h-screen w-full overflow-hidden bg-background">
      <Link href="/contact" className="relative block size-full overflow-hidden">
        <div className="pointer-events-none absolute bottom-6 left-6 z-10 flex flex-col gap-y-0.5 sm:bottom-8 sm:left-8 sm:gap-y-1 lg:bottom-12 lg:left-12 lg:gap-y-2">
          <span className="font-clash text-3xl font-black text-neutral-800 sm:text-5xl lg:text-7xl">
            Who&apos;s Next?
          </span>
          <span className="font-clash text-xl font-medium text-neutral-800 sm:text-2xl lg:text-4xl">
            Tell us about your great idea
          </span>
        </div>
        <WavyAnimationCanvas />
      </Link>
    </div>
  );
};

export default ContactCard;
