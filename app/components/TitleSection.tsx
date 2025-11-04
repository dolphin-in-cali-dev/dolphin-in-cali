import ScrollDownInstruction from './ScrollDownInstruction';
import TitleAnimation from './TitleAnimation';

const TitleSection = () => {
  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-y-12 px-6 pb-6 sm:gap-y-24 sm:px-10 sm:pb-5 lg:gap-y-36 lg:pb-6">
      <div className="flex flex-col pb-12 gap-y-4 sm:gap-y-5 lg:gap-y-6">
        <TitleAnimation />
        <ScrollDownInstruction />
      </div>
    </div>
  );
};

export default TitleSection;
