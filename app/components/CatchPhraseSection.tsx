import Marquee from 'react-fast-marquee';

import AsteriskGraphic from './AsteriskGraphic';

const CatchPhraseSection = () => {
  return (
    <div className="relative">
      <div className="absolute -left-20 top-64 h-60 w-9/12 rounded-[2000px/500px] bg-[#1242FB]" />
      <div className="absolute right-0 top-80 h-24 w-4/12 rounded-[1000px/300px] bg-[#1242FB]" />

      <div className="relative z-10 flex flex-col gap-y-28 bg-background/70 pb-32 pt-60 backdrop-blur-3xl">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-x-20 px-10">
          <div className="flex flex-col gap-y-7">
            <p className="text-4xl leading-snug">
              FULL IDEA ENJOY IMAGNIATION
              <br />
              WITH COMPANY, WE THINK
              <br />
              WITH YOUR IDEA, WE DREAM
            </p>
            <p className="text-lg">
              돌핀인캘리는 아이디어를 현실화하는 걸 가장 좋아합니다.
              <br />
              아이디어가 현실이 되고 그 현실이 세상을 조금 더 나아지게 만들면 그
              기분은 이루어 말할 수 없죠.
              <br />
              당신의 아이디어는 무엇인가요?
            </p>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <AsteriskGraphic />
          </div>
        </div>
        <Marquee autoFill className="py-2">
          <span className="ml-32 text-3xl font-medium">
            what is your idea? 🤔
          </span>
        </Marquee>
      </div>
    </div>
  );
};

export default CatchPhraseSection;
