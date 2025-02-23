import image1 from '@assets/images/service-process1.png';
import image2 from '@assets/images/service-process2.png';
import image3 from '@assets/images/service-process3.png';
import Image from 'next/image';

const ServicePage = () => {
  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col px-10 pb-20 pt-10">
      <Image src={image1} alt="Service Process 1" priority />
      <Image src={image2} alt="Service Process 2" />
      <Image src={image3} alt="Service Process 3" />
    </main>
  );
};

export default ServicePage;
