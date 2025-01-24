import { cn } from '@/lib/utils';

const IndicatorBar = ({ active }: { active: boolean }) => {
  return (
    <div
      className={cn(
        'h-1 w-10 rounded-full bg-neutral-300 transition-all duration-1000 ease-in-out',
        active && 'w-20 bg-neutral-800',
      )}
    />
  );
};

type CarouselIndicatorProps = {
  current: number;
  total: number;
};

const CarouselIndicator = ({ current, total }: CarouselIndicatorProps) => {
  return (
    <div className="flex gap-x-3">
      {Array.from({ length: total }).map((_, index) => (
        <IndicatorBar key={index} active={index + 1 === current} />
      ))}
    </div>
  );
};

export default CarouselIndicator;
