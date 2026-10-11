import Image from 'next/image';
import type { Lang } from '@/lib/i18n';

export const personalInterestsMetadata = {
  en: {
    title: 'Personal Interests',
    description: "Explore Fengyun Yu's personal interests including cooking, running, and badminton.",
    keywords: ['Fengyun Yu', 'personal interests', 'cooking', 'running', 'badminton'],
  },
  zh: {
    title: '兴趣爱好',
    description: '了解余枫云的个人兴趣：做饭、跑步与羽毛球。',
    keywords: ['余枫云', '兴趣爱好', '做饭', '跑步', '羽毛球'],
  },
};

const content = {
  en: {
    eyebrow: 'Personal Interests',
    heading: 'Outside the lab',
    sub: 'A glimpse into my hobbies and passions outside academia.',
    interests: [
      {
        id: 'cooking',
        title: 'Cooking',
        description:
          'Cooking, as well as research, is also a kind of art. It needs good taste, and sometimes faces unsatisfactory results.',
        alt: 'Cooking photo',
        images: ['/assets/cooking-photo1.png', '/assets/cooking-photo2.png', '/assets/cooking-photo3.png'],
      },
      {
        id: 'running',
        title: 'Running',
        description:
          'Once you start, you are getting closer to the destination. Running is a lifestyle that I communicate with my body.',
        alt: 'Running photo',
        images: ['/assets/marathon-photo1.png', '/assets/marathon-photo2.png', '/assets/marathon-photo3.png'],
      },
    ],
  },
  zh: {
    eyebrow: '兴趣爱好',
    heading: '实验室之外',
    sub: '学术之外的爱好与热情。',
    interests: [
      {
        id: 'cooking',
        title: '做饭',
        description: '做饭和做研究一样，也是一门艺术：需要好的品味，有时也会遇到不尽如人意的结果。',
        alt: '做饭照片',
        images: ['/assets/cooking-photo1.png', '/assets/cooking-photo2.png', '/assets/cooking-photo3.png'],
      },
      {
        id: 'running',
        title: '跑步',
        description: '只要开始，就在靠近终点。跑步是我与身体对话的一种生活方式。',
        alt: '跑步照片',
        images: ['/assets/marathon-photo1.png', '/assets/marathon-photo2.png', '/assets/marathon-photo3.png'],
      },
    ],
  },
};

export default function PersonalInterestsPage({ lang }: { lang: Lang }) {
  const t = content[lang];
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-clay-600">{t.eyebrow}</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-navy-900">{t.heading}</h1>
          <p className="mt-2 text-lg text-gray-500">{t.sub}</p>
        </header>
        <div className="space-y-16">
          {t.interests.map((interest) => (
            <section key={interest.id} aria-labelledby={`${interest.id}-heading`}>
              <h2 id={`${interest.id}-heading`} className="text-2xl font-bold text-navy-900 mb-2">
                {interest.title}
              </h2>
              <p className="text-navy-600 mb-6 max-w-2xl">{interest.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {interest.images.map((src, idx) => (
                  <div
                    key={src}
                    className="bg-navy-50 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden"
                  >
                    <Image
                      src={src}
                      alt={`${interest.alt} ${idx + 1}`}
                      width={400}
                      height={300}
                      className="w-full h-56 object-cover object-center transition-transform duration-200 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
