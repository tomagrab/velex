import './globals.scss';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Header from '@/components/layout/header/header';
import Sidebar from '@/components/layout/sidebar/sidebar';
import ChatWidgetServerWrapper from '@/components/layout/chat-widget/chat-widget-server-wrapper/chat-widget-server-wrapper';
import { UserProvider } from '@auth0/nextjs-auth0/client';

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
      <UserProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="flex min-h-[100dvh] min-w-[100vw]">
            <Sidebar />
            <div className="flex flex-1 flex-col">
              <Header />
              <div className="flex flex-1 bg-gray-200 p-4 dark:bg-gray-800">
                <div className="flex flex-1 rounded bg-background p-4 shadow-md">
                  <main className="flex flex-1">{children}</main>
                </div>
              </div>
            </div>
          </div>
          <ChatWidgetServerWrapper />
        </body>
      </UserProvider>
    </html>
  );
}
