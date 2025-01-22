import MainDescription from './MainDescription';
import ScrollDownInstruction from './ScrollDownInstruction';
import TitleImage from './TitleImage';

const TitleSection = () => {
  return (
    <div className="flex flex-col gap-y-48 pb-6">
      <div className="flex flex-col gap-y-6">
        <TitleImage />
        <ScrollDownInstruction />
      </div>
      <MainDescription />
    </div>
  );
};

export default TitleSection;
