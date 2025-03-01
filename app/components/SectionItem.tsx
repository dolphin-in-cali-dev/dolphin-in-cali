import { FC } from 'react';

interface SectionItemProps {
  title: string;
  imageSrc: string;
  index: number;
  className?: string;
}

const SectionItem: FC<SectionItemProps> = ({ title, imageSrc, index, className }) => {
  const indexSymbol = ['①', '②', '③'][index - 1] || '';

  return (
    <section className={`mt-30 lg:mt-36 ${className || ''}`}>
      <h1 className="text-gray-200 text-center text-base lg:text-2xl font-medium">
        <span className="font-bold">{indexSymbol} {title.split(' ')[0]}</span>
        {title.slice(title.indexOf(' ') + 1)}
      </h1>
      <hr className="w-full max-w-[400px] lg:max-w-[800px] mx-auto mt-4 border-white" />
      <div className="flex justify-center mt-8 lg:mt-10 px-8">
        <img
          src={imageSrc}
          alt="RoofTop Example"
          className="w-full max-w-[800px]"
        />
      </div>
    </section>
  );
};

export default SectionItem; 