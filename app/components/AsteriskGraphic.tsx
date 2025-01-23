import Logo from '@assets/images/thick_asterisk.png';
import Image from 'next/image';

const AsteriskGraphic = () => {
  return (
    <div>
      <Image src={Logo} alt="Logo" width={200} />
    </div>
  );
};

export default AsteriskGraphic;
