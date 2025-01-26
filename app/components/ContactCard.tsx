import ShaderTest from './ShaderTest';

const ContactCard = () => {
  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-3xl bg-background">
      <div className="absolute bottom-10 left-10 z-10 flex flex-col gap-y-1">
        <span className="font-clash text-7xl font-black text-neutral-800">
          Who&apos;s Next?
        </span>
        <span className="font-clash text-4xl font-medium text-neutral-800">
          Tell us about your great idea
        </span>
      </div>
      <ShaderTest />
    </div>
  );
};

export default ContactCard;
