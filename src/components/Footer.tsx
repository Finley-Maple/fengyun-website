import Link from 'next/link';
import { localize, type Lang } from '@/lib/i18n';

const EMAIL = 'yufengyun17@gmail.com';

const text = {
  en: {
    contact: 'Contact',
    email: 'Email:',
    quickLinks: 'Quick Links',
    publications: 'Publications',
    cv: 'CV',
    blog: 'Blog',
    connect: 'Connect',
    rights: 'All rights reserved.',
  },
  zh: {
    contact: '联系方式',
    email: '邮箱：',
    quickLinks: '快速链接',
    publications: '论文',
    cv: '简历',
    blog: '博客',
    connect: '社交主页',
    rights: '保留所有权利。',
  },
};

export default function Footer({ lang }: { lang: Lang }) {
  const t = text[lang];
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.contact}</h3>
            <p className="text-gray-300">
              {t.email} {EMAIL}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={localize(lang, '/publications')} className="text-gray-300 hover:text-white transition-colors">
                  {t.publications}
                </Link>
              </li>
              <li>
                <Link href={localize(lang, '/cv')} className="text-gray-300 hover:text-white transition-colors">
                  {t.cv}
                </Link>
              </li>
              <li>
                <Link href={localize(lang, '/blog')} className="text-gray-300 hover:text-white transition-colors">
                  {t.blog}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.connect}</h3>
            <div className="flex space-x-4">
              <a
                href={process.env.LINKEDIN_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={process.env.GOOGLE_SCHOLAR_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Google Scholar
              </a>
              <a
                href="https://www.researchgate.net/profile/Yu-Feng-Yun?ev=hdr_xprf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                ResearchGate
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} {lang === 'zh' ? '余枫云' : 'Fengyun Yu'}. {t.rights}</p>
        </div>
      </div>
    </footer>
  );
}
