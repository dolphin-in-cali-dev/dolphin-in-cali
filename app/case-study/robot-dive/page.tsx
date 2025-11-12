import image1 from '@assets/images/robot-dive-detail-1.png';
import image2 from '@assets/images/robot-dive-detail-2.png';
import image3 from '@assets/images/robot-dive-detail-3.png';
import image4 from '@assets/images/robot-dive-detail-4.png';
import Image from 'next/image';

const PickForPage = () => {
  return (
    <main className="mx-auto flex w-full max-w-[1100px] flex-col px-10 pb-20 pt-10">
      <Image src={image1} alt="Robot Dive Case Study 1" priority quality={100} />
      <Image src={image2} alt="Robot Dive Case Study 2" quality={100} />
      <Image src={image3} alt="Robot Dive Case Study 3" quality={100} />
      <Image src={image4} alt="Robot Dive Case Study 4" quality={100} />
    </main>
  );
};

export default PickForPage;
