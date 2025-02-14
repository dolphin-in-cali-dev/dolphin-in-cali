import MainDescription from './MainDescription';
import ScrollDownInstruction from './ScrollDownInstruction';
import TitleAnimation from './TitleAnimation';

const TitleSection = () => {
  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-y-48 px-10 pb-6">
      <div className="flex flex-col gap-y-6">
        <TitleAnimation />
        <ScrollDownInstruction />
      </div>
      <MainDescription />
    </div>
  );
};

export default TitleSection;
