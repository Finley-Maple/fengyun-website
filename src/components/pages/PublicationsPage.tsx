import type { Lang } from '@/lib/i18n';

export const publicationsMetadata = {
  en: {
    title: 'Publications',
    description: 'Academic publications and research papers by Fengyun Yu.',
  },
  zh: {
    title: '论文',
    description: '余枫云发表的学术论文与研究成果。',
  },
};

// Titles and journals stay in their original language; only the summaries are translated.
const publications = [
  {
    title:
      'Exploring COPD patient clusters and associations with health-related quality of life using a machine learning approach: a nationwide cross-sectional study',
    journal: 'Engineering',
    description: {
      en: 'Identify the phenotypes of COPD patients with respect to the socio-characteristics and comorbidities using unsupervised machine learning techniques',
      zh: '使用无监督机器学习方法，依据社会特征与合并症识别慢阻肺患者的表型',
    },
    link: 'https://doi.org/10.1016/j.eng.2025.05.005',
  },
  {
    title:
      'Preferences regarding COVID-19 vaccination among 12,000 adults in China: A cross-sectional discrete choice experiment.',
    journal: 'PLOS Global Public Health',
    description: {
      en: 'How the vaccine preference changes with respect to the socio-characteristics using supervised machine learning techniques',
      zh: '使用有监督机器学习方法，分析疫苗接种偏好如何随社会特征而变化',
    },
    link: 'https://doi.org/10.1371/journal.pgph.0003387',
  },
  {
    title:
      'The global economic burden of chronic obstructive pulmonary disease for 204 countries and territories in 2020-50: a health-augmented macroeconomic modelling study.',
    journal: 'Lancet Glob Health',
    description: {
      en: 'First to estimate the global economic burden of COPD using a health-augmented macroeconomic modelling approach',
      zh: '首次采用健康增强型宏观经济模型，估算慢阻肺的全球经济负担',
    },
    link: 'https://doi.org/10.1016/S2214-109X(23)00217-6',
  },
  {
    title: 'Knowledge About COVID-19 Among Adults in China: Cross-sectional Online Survey',
    journal: 'Journal of Medical Internet Research',
    description: {
      en: 'First to explore the knowledge about COVID-19 among adults in China using a cross-sectional online survey',
      zh: '首次通过横断面在线调查，探究中国成年人对新冠肺炎的认知情况',
    },
    link: 'https://doi.org/10.2196/26940',
  },
];

const text = {
  en: { eyebrow: 'Publications', heading: 'Research Papers', scholar: 'View on Google Scholar', view: 'View Paper' },
  zh: { eyebrow: '论文', heading: '研究论文', scholar: '在 Google Scholar 上查看', view: '查看论文' },
};

export default function PublicationsPage({ lang }: { lang: Lang }) {
  const t = text[lang];
  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-clay-600">{t.eyebrow}</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-navy-900">{t.heading}</h1>

        <div className="mt-16">
          <div className="mb-10">
            <a
              href="https://scholar.google.com/citations?user=7bPHV-AAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <svg
                className="mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                  clipRule="evenodd"
                />
              </svg>
              {t.scholar}
            </a>
          </div>

          <div className="space-y-8">
            {publications.map((publication) => (
              <div key={publication.link} className="card">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-navy-900">{publication.title}</h3>
                    <p className="mt-1 text-sm font-medium text-clay-700">{publication.journal}</p>
                    <p className="mt-2 text-base text-gray-500">{publication.description[lang]}</p>
                  </div>
                  {publication.link && (
                    <a
                      href={publication.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-navy-700 bg-navy-50 hover:bg-navy-100 transition-colors"
                    >
                      <svg
                        className="mr-1 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {t.view}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
