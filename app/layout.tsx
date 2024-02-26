import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { Righteous as Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/react';


import { cn } from '@/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontDisplay = Display({
  weight: '400',
  variable: '--font-display',
  preload: false,
});

export const metadata: Metadata = {
  title: 'Photocaster',
  description: 'A photographer focused Farcaster client supporting high res images',
  openGraph: {
    title: 'Photocaster',
    description: 'A photographer focused Farcaster client supporting high res images',
    url: 'https://photocaster.xyz',
    siteName: 'Photocaster',
    images: [
      {
        url:`https://www.photocaster.xyz/og.png`,
        width: 1200,
        height: 630
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Photocaster',
    description: 'A photographer focused Farcaster client supporting high res images',
    creator: '@pinatacloud',
    images: ['https://www.photocaster.xyz/og.png'], // Must be an absolute URL
  },
  icons: {
    icon: '/favicon.svg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
            <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>

      <body
        className={cn(
          'min-h-screen w-full flex flex-col items-center justify-center bg-background font-sans antialiased',
          fontSans.variable,
          fontDisplay.variable,
        )}
      >
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Analytics />
          </ThemeProvider>
      </body>
    </html>
  );
}
