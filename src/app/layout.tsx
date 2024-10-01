import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.scss';
import Header from '@/components/layout/header/header';
import Sidebar from '@/components/layout/sidebar/sidebar';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'velex',
  description: 'velex is the all in one Velocitor Solutions web platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col">
          <Sidebar />
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
