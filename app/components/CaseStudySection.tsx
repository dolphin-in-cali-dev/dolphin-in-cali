import CaseStudyList from './CaseStudyList';
import ContactCard from './ContactCard';

const CaseStudySection = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1440px] space-y-20 px-10 pb-32 pt-12">
        <h3 className="font-clash text-6xl text-neutral-800">Featured Work</h3>
        <CaseStudyList />
        <ContactCard />
      </div>
    </div>
  );
};

export default CaseStudySection;
