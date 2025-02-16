import logo from '@assets/images/logo.svg';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

import { CS_EMAIL } from '@/constants/basic';

import TitleGradient from './TitleGradient';

const TitleAnimation = () => {
  return (
    <div className="relative max-h-[600px] overflow-hidden rounded-t-3xl rounded-br-3xl">
      <span className="absolute left-10 top-6 font-roboto text-xl font-medium text-white">
        © 2023.
      </span>

      <div className="absolute left-1/2 top-6 flex -translate-x-1/2 transform items-center gap-x-3">
        <Image src={logo} alt="Logo" width={44} />
        <h1 className="text-4xl font-black text-white">DOLPHIN IN CALI</h1>
      </div>

      <div className="clip-wave absolute -bottom-3 left-0 z-50 flex flex-col gap-y-3 bg-background pr-12 pt-10">
        <span className="border-l-2 border-neutral-400 p-0.5 pl-2 text-neutral-500">
          SOLUTION FOR YOU
        </span>
        <h2 className="font-clash text-7xl font-bold text-slate-800">
          WEB APP
          <br />
          CREATIVE AGENCY
        </h2>
      </div>

      <a
        href={`mailto:${CS_EMAIL}`}
        className="clip-connect-button absolute bottom-2.5 left-[732px] flex items-center gap-x-3 rounded-r-full bg-[radial-gradient(circle_at_194px,transparent_21px,rgba(5,57,203,0.6)_22px)] p-1.5 pl-14"
      >
        <span className="text-base font-medium text-white">CONNECT US</span>
        <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full">
          <ArrowUpRight size={20} />
        </div>
      </a>

      <TitleGradient />
    </div>
  );
};

export default TitleAnimation;
