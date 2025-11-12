import image1 from '@assets/images/sincere-flower-detail-1.png';
import image2 from '@assets/images/sincere-flower-detail-2.png';
import image3 from '@assets/images/sincere-flower-detail-3.png';
import image4 from '@assets/images/sincere-flower-detail-4.png';
import image5 from '@assets/images/sincere-flower-detail-5.png';
import Image from 'next/image';

const ObjetSincerityPage = () => {
  return (
    <main className="mx-auto flex w-full max-w-[1100px] flex-col px-10 pb-20 pt-10">
      <Image src={image1} alt="진심꽃방 Case Study 1" priority quality={100} />
      <Image src={image2} alt="진심꽃방 Case Study 2" quality={100} />
      <Image src={image3} alt="진심꽃방 Case Study 3" quality={100} />
      <Image src={image4} alt="진심꽃방 Case Study 4" quality={100} />
      <Image src={image5} alt="진심꽃방 Case Study 5" quality={100} />
    </main>
  );
};

export default ObjetSincerityPage;
