import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

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
        <main className="flex flex-col h-full w-full justify-between">{children}</main>
      </body>
    </html>
  );
}
