const ContactCard = () => {
  return (
    <div className="relative h-[520px] w-full rounded-3xl bg-gradient-to-br from-[#96CDFF] to-[#E3F2FF]">
      <div className="absolute bottom-10 left-10 flex flex-col gap-y-1">
        <span className="font-clash text-7xl font-black text-neutral-800">
          Who&apos;s Next?
        </span>
        <span className="font-clash text-4xl font-medium text-neutral-800">
          Tell us about your great idea
        </span>
      </div>
    </div>
  );
};

export default ContactCard;
