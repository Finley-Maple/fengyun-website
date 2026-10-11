import type { Metadata } from 'next';
import '../globals.css';
import SiteShell from '@/components/SiteShell';

const description =
  '余枫云的个人主页：研究医学世界模型与因果推断。';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: '余枫云',
    template: '%s | 余枫云',
  },
  description,
  alternates: { languages: { en: '/' } },
  openGraph: {
    title: '余枫云',
    description,
    url: 'https://yufengyun.de/zh',
    siteName: '余枫云',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="zh">{children}</SiteShell>;
}
