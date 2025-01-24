import DomainCarousel from './DomainCarousel';

const DomainSection = () => {
  return (
    <div className="bg-neutral-100">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-y-14 px-10 pb-24 pt-12">
        <h3 className="font-clash text-6xl text-neutral-800">What we do</h3>
        <DomainCarousel />
      </div>
    </div>
  );
};

export default DomainSection;
