import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

import Navigation from '@/components/ui/navigation';
import { ArrowLeft } from 'lucide-react';

const poppins = Poppins({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'Gamebytes',
  description:
    'A platform designed for gamers on the go, offering concise and engaging summaries of the latest and most relevant gaming news.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={poppins.className + 'relative'}>
        <main className="flex flex-col h-full w-full justify-between">
          <div className="flex font-bold items-center gap-2 self-start bg-background p-3 w-full">
            <ArrowLeft />
            <h1 className="text-lg">Discover</h1>
          </div>

          <div className="flex-grow-1 overflow-y-scroll flex flex-col gap-5 relative px-3">
            {children}
          </div>

          <Navigation />
        </main>
      </body>
    </html>
  );
}
