import Link from 'next/link';

const GlobalTabs = () => {
  return (
    <header className="flex w-full gap-x-2">
      <Link
        href="/"
        className="rounded-b-lg bg-neutral-900 px-2 pb-2 pt-3 text-sm font-extrabold text-white"
      >
        AGENCY
      </Link>
      <div className="cursor-pointer px-2 pb-2 pt-3 text-sm font-extrabold text-neutral-500">
        ROOFTOP
      </div>
    </header>
  );
};

export default GlobalTabs;
