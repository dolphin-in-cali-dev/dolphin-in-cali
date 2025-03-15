import image1 from '@assets/images/pick-for-detail-1.png';
import image2 from '@assets/images/pick-for-detail-2.png';
import image3 from '@assets/images/pick-for-detail-3.png';
import image4 from '@assets/images/pick-for-detail-4.png';
import image5 from '@assets/images/pick-for-detail-5.png';
import image6 from '@assets/images/pick-for-detail-6.png';
import image7 from '@assets/images/pick-for-detail-7.png';
import Image from 'next/image';

const PickForPage = () => {
  return (
    <main className="mx-auto flex w-full max-w-[1100px] flex-col px-10 pb-20 pt-10">
      <Image src={image1} alt="Pickfor Case Study 1" priority />
      <Image src={image2} alt="Pickfor Case Study 2" />
      <Image src={image3} alt="Pickfor Case Study 3" />
      <Image src={image4} alt="Pickfor Case Study 4" />
      <Image src={image5} alt="Pickfor Case Study 5" />
      <Image src={image6} alt="Pickfor Case Study 6" />
      <Image src={image7} alt="Pickfor Case Study 7" />
    </main>
  );
};

export default PickForPage;
