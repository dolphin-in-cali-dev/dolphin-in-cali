'use client';

import logo from '@assets/images/logo-black.svg';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { cn } from '@/lib/utils';

const GlobalTabs = () => {
  const pathname = usePathname();
  const isRooftop = pathname.split('/')?.[1] === 'rooftop';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    { href: '/', label: 'HOME' },
    { href: '/works', label: 'WORKS' },
    { href: '/service', label: 'SERVICE' },
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={isRooftop ? 'bg-black' : 'bg-transparent'}>
      <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 sm:px-10">
        {/* Left Side - Logo & Title */}
        <Link href="/" className="flex items-center gap-x-2 rounded-b-lg px-2 pb-2 pt-4 sm:gap-x-3">
          <Image
            src={logo}
            alt="Logo"
            width={28}
            height={28}
            className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8"
          />
          <h1 className={cn(
            "whitespace-nowrap text-sm font-black sm:text-base lg:text-2xl",
            isRooftop ? 'text-white' : 'text-slate-900'
          )}>
            DOLPHIN IN CALI
          </h1>
        </Link>
        {/* Right Side - Navigation */}
        <div className="flex justify-end">
          {/* Desktop Navigation - 숨김: lg 미만, 표시: lg 이상 */}
          <nav className="hidden gap-x-4 lg:flex">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    'rounded-b-lg px-4 pb-2 pt-7 text-sm font-extrabold transition-all duration-300 ease-in-out',
                    isRooftop
                      ? 'text-neutral-500 hover:bg-muted/20 hover:text-neutral-300'
                      : isActive
                        ? 'bg-slate-900 text-white'
                        : 'text-neutral-500 hover:bg-muted hover:text-neutral-600',
                  )}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile/Tablet Hamburger Menu - 표시: lg 미만, 숨김: lg 이상 */}
          <div className="lg:hidden">
            {/* Hamburger Button */}
            <button
              onClick={handleMenuToggle}
              className={cn(
                'rounded-b-lg pb-2 pt-3 transition-all duration-300 ease-in-out',
                isRooftop
                  ? 'text-neutral-300 hover:bg-neutral-100 hover:text-white'
                  : 'text-slate-900 hover:bg-neutral-100 hover:text-neutral-600',
              )}
              aria-label="메뉴 열기"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div
                className={cn(
                  'absolute left-0 right-0 top-[52px] z-50 border-t shadow-lg animate-in fade-in slide-in-from-top-2 duration-200',
                  isRooftop
                    ? 'border-neutral-700 bg-black'
                    : 'border-neutral-200 bg-white',
                )}
              >
                <nav className="mx-auto flex max-w-[1440px] flex-col px-6 py-2 sm:px-10">
                  {tabs.map((tab, index) => {
                    const isActive = pathname === tab.href;
                    return (
                      <Link
                        key={tab.href}
                        href={tab.href}
                        onClick={handleLinkClick}
                        className={cn(
                          'rounded-lg px-4 py-3 text-base font-extrabold transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-left-3',
                          isRooftop
                            ? isActive
                              ? 'bg-neutral-800 text-white'
                              : 'text-neutral-400 hover:bg-muted hover:text-neutral-200'
                            : isActive
                              ? 'bg-slate-900 text-white'
                              : 'text-slate-700 hover:bg-muted hover:text-neutral-600',
                        )}
                        style={{
                          animationDelay: `${index * 50}ms`,
                          animationDuration: '300ms',
                          animationFillMode: 'backwards'
                        }}
                      >
                        {tab.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default GlobalTabs;
