import type { Metadata } from 'next';
import '../globals.css';
import SiteShell from '@/components/SiteShell';

const description =
  'Personal website of Fengyun Yu, researching medical world model and causal inference.';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Fengyun Yu - Scientific Computing Researcher',
    template: '%s | Fengyun Yu',
  },
  description,
  alternates: { languages: { 'zh-CN': '/zh' } },
  openGraph: {
    title: 'Fengyun Yu - Scientific Computing Researcher',
    description,
    url: 'https://yufengyun.de',
    siteName: 'Fengyun Yu',
    locale: 'en_US',
    type: 'website',
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="en">{children}</SiteShell>;
}
