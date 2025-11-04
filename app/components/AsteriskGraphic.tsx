'use client';

import filled from '@assets/images/asterisk-icon-blue.png';
import outlined from '@assets/images/asterisk-icon-outline.svg';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const AsteriskGraphic = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rotate1 = useTransform(scrollYProgress, [0, 1], [30, 180]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [30, 190]);
  const rotate3 = useTransform(scrollYProgress, [0, 1], [30, 200]);
  const rotate4 = useTransform(scrollYProgress, [0, 1], [30, 210]);
  const rotate5 = useTransform(scrollYProgress, [0, 1], [30, 220]);
  const rotate6 = useTransform(scrollYProgress, [0, 1], [30, 230]);

  return (
    <div ref={containerRef} className="group relative h-[200px] w-[650px]">
      <motion.div style={{ rotate: rotate1 }} className="absolute left-[2500px] top-0">
        <Image src={outlined} alt="" width={240} height={240} className="scale-[94%] opacity-60" />
      </motion.div>
      <motion.div style={{ rotate: rotate2 }} className="absolute left-[200px] top-0">
        <Image src={outlined} alt="" width={240} height={240} className="scale-[96%] opacity-70" />
      </motion.div>
      <motion.div style={{ rotate: rotate3 }} className="absolute left-[150px] top-0">
        <Image src={outlined} alt="" width={240} height={240} className="scale-[98%] opacity-80" />
      </motion.div>
      <motion.div style={{ rotate: rotate4 }} className="absolute left-[100px] top-0">
        <Image src={outlined} alt="" width={240} height={240} className="scale-[99%] opacity-90" />
      </motion.div>
      <motion.div style={{ rotate: rotate5 }} className="absolute left-[50px] top-0">
        <Image src={outlined} alt="" width={240} height={240} className="scale-[99.5%] opacity-95" />
      </motion.div>
      <motion.div style={{ rotate: rotate6 }} className="absolute left-0 top-0">
        <Image src={filled} alt="Logo" width={240} height={240} />
      </motion.div>
    </div>
  );
};

export default AsteriskGraphic;
