'use client';

import { useState } from 'react';
import type { Lang } from '@/lib/i18n';

const EMAIL = 'yufengyun17@gmail.com';

const content = {
  en: {
    eyebrow: 'Contact',
    heading: 'Get in Touch',
    info: 'Contact Information',
    email: 'Email',
    name: 'Name',
    subject: 'Subject',
    message: 'Message',
    send: 'Send Message',
  },
  zh: {
    eyebrow: '联系',
    heading: '联系我',
    info: '联系方式',
    email: '邮箱',
    name: '姓名',
    subject: '主题',
    message: '留言',
    send: '发送留言',
  },
};

export default function ContactPage({ lang }: { lang: Lang }) {
  const t = content[lang];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const inputClass =
    'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-navy-500 focus:ring-navy-500';

  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-clay-600">{t.eyebrow}</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-navy-900">{t.heading}</h1>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-medium text-navy-900">{t.info}</h3>
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-navy-900">{t.email}</h4>
                  <p className="mt-1 text-base text-gray-500">
                    <a href={`mailto:${EMAIL}`} className="text-navy-600 hover:text-navy-500">
                      {EMAIL}
                    </a>
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-navy-900">LinkedIn</h4>
                  <p className="mt-1 text-base text-gray-500">
                    <a
                      href="https://www.linkedin.com/in/fengyun-yu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-navy-600 hover:text-navy-500"
                    >
                      linkedin.com/in/fengyun-yu
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-navy-900">
                    {t.name}
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-navy-900">
                    {t.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-navy-900">
                    {t.subject}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-navy-900">
                    {t.message}
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <button type="submit" className="btn-primary w-full justify-center">
                    {t.send}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
