import ScrollDownInstruction from './ScrollDownInstruction';
import TitleImage from './TitleImage';

const TitleSection = () => {
  return (
    <div className="flex flex-col gap-y-6">
      <TitleImage />
      <ScrollDownInstruction />
    </div>
  );
};

export default TitleSection;
