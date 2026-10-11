import type { Lang } from '@/lib/i18n';

export const cvMetadata = {
  en: {
    title: 'CV',
    description: "Download Fengyun Yu's CV and view professional highlights.",
  },
  zh: {
    title: '简历',
    description: '下载余枫云的简历',
  },
};

const content = {
  en: {
    eyebrow: 'Curriculum Vitae',
    heading: 'Professional Highlights',
    download: 'Download CV',
    note: '',
    highlights: [
      {
        title: 'Academic Excellence',
        description:
          'M.Sc. Scientific Computing, Universität Heidelberg (2026); B.Sc. Industrial Engineering, Tsinghua University',
      },
      {
        title: 'Research Output',
        description: '5+ peer-reviewed publications, including first and co-first author papers',
      },
      {
        title: 'Research Experience',
        description: 'Research positions at DKFZ, the Heidelberg Institute of Global Health, and CAMS & PUMC',
      },
      {
        title: 'Technical Skills',
        description: 'Expertise in medical world model, causal inference, and numerical optimization',
      },
    ],
  },
  zh: {
    eyebrow: '简历',
    heading: '职业亮点',
    download: '下载简历',
    note: '（简历 PDF 为英文版）',
    highlights: [
      {
        title: '学术背景',
        description: '海德堡大学科学计算理学硕士（2026）；清华大学工业工程理学学士',
      },
      {
        title: '研究成果',
        description: '5 篇以上同行评议论文，包括第一作者与共同第一作者论文',
      },
      {
        title: '研究经历',
        description: '先后在 DKFZ、海德堡全球健康研究所以及 CAMS & PUMC 担任研究职位',
      },
      {
        title: '技术专长',
        description: '擅长医学世界模型、因果推断与数值优化',
      },
    ],
  },
};

export default function CvPage({ lang }: { lang: Lang }) {
  const t = content[lang];
  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-clay-600">{t.eyebrow}</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-navy-900">{t.heading}</h1>

        <div className="mt-16">
          <div className="flex flex-wrap items-center gap-3">
            <a href="/Fengyun_Yu_CV.pdf" download className="btn-primary">
              <svg
                className="mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              {t.download}
            </a>
            {t.note && <span className="text-sm text-gray-500">{t.note}</span>}
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {t.highlights.map((highlight, index) => (
                <div key={index} className="card">
                  <h3 className="text-lg font-medium text-navy-900">{highlight.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
