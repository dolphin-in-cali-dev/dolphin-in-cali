import Marquee from 'react-fast-marquee';

const Footer = () => {
  return (
    <footer className="flex flex-col">
      <div className="flex items-center gap-x-20 bg-[#5AC4FF] py-7 font-clash">
        <Marquee autoFill className="overflow-hidden">
          <span className="ml-20 text-7xl">Let&lsquo;s Talk</span>
          <span className="ml-20 text-lg font-bold">GET IN TOUCH</span>
        </Marquee>
      </div>
      <div className="flex w-full items-center justify-center bg-[#2C313F] p-5 font-medium text-slate-400">
        © Copyright 2023 DOLPHIN IN CALI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
