'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationItems } from '@/types/navigation';
import { localize, switchPath, type Lang } from '@/lib/i18n';

export default function Navbar({ lang }: { lang: Lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const otherLang: Lang = lang === 'en' ? 'zh' : 'en';
  const switchHref = switchPath(lang, pathname);
  const switchLabel = lang === 'en' ? '中文' : 'EN';
  const switchTitle = lang === 'en' ? '切换到中文' : 'Switch to English';

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href={localize(lang, '/')} className="text-navy-900 font-semibold text-xl">
              {lang === 'zh' ? '余枫云' : 'Fengyun Yu'}
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={localize(lang, item.href)}
                className={`${
                  pathname === localize(lang, item.href)
                    ? 'text-navy-900 border-b-2 border-navy-900'
                    : 'text-gray-600 hover:text-navy-900'
                } px-3 py-2 text-sm font-medium transition-colors duration-200`}
              >
                {item.label[lang]}
              </Link>
            ))}
            <a
              href={switchHref}
              hrefLang={otherLang === 'zh' ? 'zh-CN' : 'en'}
              lang={otherLang === 'zh' ? 'zh-CN' : 'en'}
              title={switchTitle}
              className="whitespace-nowrap rounded-md border border-navy-200 px-3 py-1.5 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50"
            >
              {switchLabel}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-navy-900 focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={localize(lang, item.href)}
              className={`${
                pathname === localize(lang, item.href)
                  ? 'bg-navy-50 text-navy-900'
                  : 'text-gray-600 hover:bg-navy-50 hover:text-navy-900'
              } block px-3 py-2 rounded-md text-base font-medium`}
              onClick={() => setIsOpen(false)}
            >
              {item.label[lang]}
            </Link>
          ))}
          <a
            href={switchHref}
            hrefLang={otherLang === 'zh' ? 'zh-CN' : 'en'}
            lang={otherLang === 'zh' ? 'zh-CN' : 'en'}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-navy-50 hover:text-navy-900"
          >
            {switchLabel}
          </a>
        </div>
      </div>
    </nav>
  );
} 