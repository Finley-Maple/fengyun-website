import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Fengyun Yu - Master Student at Universität Heidelberg',
    template: '%s | Fengyun Yu'
  },
  description: 'Personal website of Fengyun Yu, Master student at Universität Heidelberg specializing in Computer Science.',
  openGraph: {
    title: 'Fengyun Yu - Master Student at Universität Heidelberg',
    description: 'Personal website of Fengyun Yu, Master student at Universität Heidelberg specializing in Computer Science.',
    url: 'https://fengyunyu.de',
    siteName: 'Fengyun Yu',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
} 