import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Lang } from '@/lib/i18n';

const inter = Inter({ subsets: ['latin'] });

export default function SiteShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang === 'zh' ? 'zh-CN' : 'en'}>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar lang={lang} />
          <main className="flex-grow">{children}</main>
          <Footer lang={lang} />
        </div>
      </body>
    </html>
  );
}
