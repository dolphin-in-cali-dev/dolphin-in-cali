import filled from '@assets/images/asterisk-icon.png';
import outlined from '@assets/images/asterisk-icon-outline.svg';
import Image from 'next/image';

const AsteriskGraphic = () => {
  return (
    <div className="group relative h-[200px] w-[320px]">
      <Image
        src={outlined}
        alt=""
        width={240}
        height={240}
        className="duration-440 absolute left-[105px] top-0 rotate-[30deg] scale-[86%] opacity-30 transition-transform group-hover:rotate-0"
      />
      <Image
        src={outlined}
        alt=""
        width={240}
        height={240}
        className="duration-420 absolute left-[90px] top-0 rotate-[30deg] scale-[88%] opacity-30 transition-transform group-hover:rotate-0"
      />
      <Image
        src={outlined}
        alt=""
        width={240}
        height={240}
        className="duration-400 absolute left-[75px] top-0 rotate-[30deg] scale-[90%] opacity-30 transition-transform group-hover:rotate-0"
      />
      <Image
        src={outlined}
        alt=""
        width={240}
        height={240}
        className="duration-380 absolute left-[60px] top-0 rotate-[30deg] scale-[92%] opacity-40 transition-transform group-hover:rotate-0"
      />
      <Image
        src={outlined}
        alt=""
        width={240}
        height={240}
        className="duration-360 absolute left-[45px] top-0 rotate-[30deg] scale-[94%] opacity-60 transition-transform group-hover:rotate-0"
      />
      <Image
        src={outlined}
        alt=""
        width={240}
        height={240}
        className="duration-340 absolute left-[30px] top-0 rotate-[30deg] scale-[96%] opacity-80 transition-transform group-hover:rotate-0"
      />
      <Image
        src={outlined}
        alt=""
        width={240}
        height={240}
        className="duration-320 absolute left-[15px] top-0 rotate-[30deg] scale-[98%] opacity-100 transition-transform group-hover:rotate-0"
      />
      <Image
        src={filled}
        alt="Logo"
        width={240}
        height={240}
        className="absolute left-0 top-0 rotate-[30deg] transition-transform duration-300 group-hover:rotate-0"
      />
    </div>
  );
};

export default AsteriskGraphic;
