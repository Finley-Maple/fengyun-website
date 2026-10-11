import type { Lang } from '@/lib/i18n';

export interface NavItem {
  label: Record<Lang, string>;
  href: string;
}

export const navigationItems: NavItem[] = [
  { label: { en: 'Home', zh: '首页' }, href: '/' },
  { label: { en: 'About', zh: '关于我' }, href: '/about' },
  { label: { en: 'Experience', zh: '经历' }, href: '/experience' },
  { label: { en: 'CV', zh: '简历' }, href: '/cv' },
  { label: { en: 'Publications', zh: '论文' }, href: '/publications' },
  { label: { en: 'Personal Interests', zh: '兴趣爱好' }, href: '/personal-interests' },
  { label: { en: 'Blog', zh: '博客' }, href: '/blog' },
  { label: { en: 'Contact', zh: '联系' }, href: '/contact' },
];
