import './globals.css';

import { ReactLenis } from 'lenis/react';
import type { Metadata } from 'next';
import { Anonymous_Pro, Plus_Jakarta_Sans, Roboto } from 'next/font/google';

import GlobalTabs from './components/GlobalTabs';

// Lenis 인스턴스를 전역으로 관리
declare global {
  interface Window {
    lenis?: any;
  }
}

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
});

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

const anonymousPro = Anonymous_Pro({
  variable: '--font-anonymous-pro',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | 돌핀인캘리',
    default: '돌핀인캘리',
  },
  description: 'WEB APP CREATIVE AGENCY',
  icons: { icon: '/images/favicon.ico' },
  openGraph: {
    title: {
      template: '%s | 돌핀인캘리',
      default: '돌핀인캘리',
    },
    description: 'WEB APP CREATIVE AGENCY',
    images: '/images/og-image.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${roboto.variable} ${anonymousPro.variable} font-sans antialiased`}
      >
        <ReactLenis root>
          <GlobalTabs />
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
