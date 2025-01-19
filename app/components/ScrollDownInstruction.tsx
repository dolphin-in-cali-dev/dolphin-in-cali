import scrollDownIcon from '@assets/images/scroll-down-icon.svg';
import Image from 'next/image';

const ScrollDownInstruction = () => {
  return (
    <div className="flex w-full items-center justify-between">
      <Image src={scrollDownIcon} alt="" width={32} />
      <span className="font-anonymous-pro text-xl font-normal text-neutral-500">
        SCROLL DOWN TO OUR JOURNEY
      </span>
      <Image src={scrollDownIcon} alt="" width={32} />
    </div>
  );
};

export default ScrollDownInstruction;
