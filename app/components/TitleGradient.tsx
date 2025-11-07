'use client';

import { useEffect, useRef, useState } from 'react';

import { Gradient } from '../Gradient.js';

const TitleGradient = () => {
  const [isMounted, setIsMounted] = useState(false);
  const gradientInitialized = useRef(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || gradientInitialized.current) return;
    
    const gradient = new Gradient();
    // @ts-expect-error Property 'initGradient' does not exist on type 'Gradient'.
    gradient.initGradient('#gradient-canvas');
    gradientInitialized.current = true;
  }, [isMounted]);

  return (
    <div 
      className="h-full w-full overflow-hidden relative" 
      suppressHydrationWarning
    >
      <canvas 
        id="gradient-canvas" 
        data-transition-in 
        className="h-full w-full absolute inset-0"
        style={{ 
          backgroundColor: 'transparent',
          display: 'block',
          imageRendering: 'auto',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
      />
    </div>
  );
};

export default TitleGradient;
