'use client';

import { useEffect } from 'react';

import { Gradient } from '../Gradient.js';

const TitleGradient = () => {
  useEffect(() => {
    const gradient = new Gradient();
    // @ts-expect-error Property 'initGradient' does not exist on type 'Gradient'.
    gradient.initGradient('#gradient-canvas');
  }, []);

  return (
    <div className="h-[600px] w-full">
      <canvas id="gradient-canvas" data-transition-in className="" />;
    </div>
  );
};

export default TitleGradient;
