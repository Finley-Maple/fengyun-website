import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Publications - Fengyun Yu',
  description: 'Academic publications and research papers by Fengyun Yu.',
};

const publications = [
  {
    title: 'Exploring COPD patient clusters and associations with health-related quality of life using a machine learning approach: a nationwide cross-sectional study',
    journal: 'Engineering',
    description: 'identify the phenotypes of COPD patients with respect to the socio-characteristics and comorbidities using unsupervised machine learning techniques',
  },
  {
    title: 'Preferences regarding COVID-19 vaccination among 12,000 adults in China: A cross-sectional discrete choice experiment.',
    journal: 'PLOS Global Public Health',
    description: 'how the vaccine preference changes with respect to the socio-characteristics using supervised machine learning techniques',
  },
  {
    title: 'The global economic burden of chronic obstructive pulmonary disease for 204 countries and territories in 2020-50: a health-augmented macroeconomic modelling study.',
    journal: 'Lancet Glob Health',
    description: 'First to estimate the global economic burden of COPD using a health-augmented macroeconomic modelling approach',
  },
  {
    title: 'Knowledge About COVID-19 Among Adults in China: Cross-sectional Online Survey',
    journal: 'Journal of Medical Internet Research',
    description: 'First to explore the knowledge about COVID-19 among adults in China using a cross-sectional online survey',
  },
];

export default function Publications() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-navy-600 font-semibold tracking-wide uppercase">Publications</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-navy-900 sm:text-4xl">
            Research Papers
          </p>
        </div>

        <div className="mt-16">
          <div className="text-center mb-12">
            <a
              href="https://scholar.google.com/citations?user=[YourID]"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-navy-700 bg-navy-100 hover:bg-navy-200"
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
              View on Google Scholar
            </a>
          </div>

          <div className="space-y-8">
            {publications.map((publication, index) => (
              <div
                key={index}
                className="relative p-6 bg-white rounded-lg border border-gray-200 hover:border-navy-500 transition-colors"
              >
                <h3 className="text-lg font-medium text-navy-900">{publication.title}</h3>
                <p className="mt-1 text-sm text-navy-600">{publication.journal}</p>
                <p className="mt-2 text-base text-gray-500">{publication.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 