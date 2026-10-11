import Image from 'next/image';
import type { Lang } from '@/lib/i18n';

export const aboutMetadata = {
  en: {
    title: 'About',
    description: "Education, research interests, and academic background.",
  },
  zh: {
    title: '关于我',
    description: '教育背景、研究兴趣与学术经历。',
  },
};

const content = {
  en: {
    eyebrow: 'About',
    heading: "Hi, I'm Fengyun",
    photoAlt: 'Fengyun Yu standing by a lake with snow-capped mountains behind',
    paragraphs: [
      "I trained as an industrial engineer at Tsinghua, then moved to Heidelberg for a master's in scientific computing. Along the way I've worked between medicine and machine learning — from epidemiology studies at Peking Union Medical College to graph neural networks at the German Cancer Research Center (DKFZ).",
      'What I keep coming back to is trust. A model can post an excellent score and still be wrong about the biology, so I care about being able to look inside it. My goal is to build systems in health and biomedicine that people can reasonably rely on.',
      'I speak Chinese, English, and German (B1). Outside of research I run, cook, and play badminton.',
    ],
    educationTitle: 'Education',
    education: [
      {
        degree: 'Master of Science in Scientific Computing',
        school: 'Universität Heidelberg',
        period: '2023.4 - 2026.4',
        notes: ['Thesis: Digesting Cell Segmentation in Spatial Transcriptomics via Graph Representation Learning'],
      },
      {
        degree: 'Bachelor of Science in Industrial Engineering',
        school: 'Tsinghua University',
        period: '2017.7 - 2021.6',
        notes: ['Exchange: KTH Royal Institute of Technology, 2019.8 - 2020.1'],
      },
    ],
    interestsTitle: 'Research Interests',
    interests: [
      'Trustworthy, interpretable machine learning for health',
      'Geometric Deep Learning',
      'Causal Inference',
      'Health Economics',
      'Numerical Optimization',
    ],
  },
  zh: {
    eyebrow: '关于我',
    heading: '你好，我是余枫云',
    photoAlt: '余枫云站在湖边，背后是雪山',
    paragraphs: [
      '我本科在清华大学学习工业工程，随后来到海德堡攻读科学计算硕士。一路走来，我的工作一直处在医学与机器学习之间——从北京协和医学院的流行病学研究，到德国癌症研究中心（DKFZ）的图神经网络。',
      '我反复回到的主题是“信任”。一个模型可以拿到漂亮的分数，却在生物学上依然是错的，所以我在意能否看清它的内部。我的目标是在健康与生物医学领域构建人们可以合理信赖的系统。',
      '我会说中文、英语和基础德语。研究之外，我喜欢跑步、做饭和打羽毛球。',
    ],
    educationTitle: '教育背景',
    education: [
      {
        degree: '科学计算理学硕士',
        school: '海德堡大学（Universität Heidelberg）',
        period: '2023.4 - 2026.4',
        notes: ['硕士论文：Digesting Cell Segmentation in Spatial Transcriptomics via Graph Representation Learning'],
      },
      {
        degree: '工业工程理学学士',
        school: '清华大学',
        period: '2017.7 - 2021.6',
        notes: ['交换：瑞典皇家理工学院（KTH），2019.8 - 2020.1'],
      },
    ],
    interestsTitle: '研究兴趣',
    interests: [
      '面向健康领域的可信、可解释机器学习',
      '几何深度学习',
      '因果推断',
      '健康经济学',
      '数值优化',
    ],
  },
};

export default function AboutPage({ lang }: { lang: Lang }) {
  const t = content[lang];
  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-clay-600">{t.eyebrow}</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-navy-900">{t.heading}</h1>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="mx-auto max-w-xs -rotate-2 rounded-2xl border border-navy-100 bg-white p-3 shadow-lg">
              <Image
                src="/assets/fengyun-lake.jpg"
                alt={t.photoAlt}
                width={1000}
                height={1100}
                className="h-auto w-full rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-4 text-lg leading-relaxed text-gray-600 lg:col-span-8">
            {t.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="card">
            <h2 className="text-lg font-semibold text-navy-900">{t.educationTitle}</h2>
            <div className="mt-4 space-y-6">
              {t.education.map((item) => (
                <div key={item.degree}>
                  <h3 className="text-base font-medium text-navy-900">{item.degree}</h3>
                  <p className="mt-1 text-sm text-gray-500">{item.school}</p>
                  <p className="mt-1 text-sm text-gray-500">{item.period}</p>
                  {item.notes.map((note) => (
                    <p key={note} className="mt-1 text-sm text-gray-500">
                      {note}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-navy-900">{t.interestsTitle}</h2>
            <ul className="mt-4 space-y-3">
              {t.interests.map((interest) => (
                <li key={interest} className="flex items-start">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-clay-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2 text-gray-600">{interest}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
