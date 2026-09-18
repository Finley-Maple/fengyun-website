import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experience - Fengyun Yu',
  description: 'Research experience and professional timeline of Fengyun Yu.',
};

const experiences = [
  {
    title: 'Research Assistant',
    organization: 'Heidelberg Institute of Global Health (HIGH)',
    period: '2026.1 - 2026.6',
    description: 'Benchmarked time-encoding strategies (sinusoidal, learned embeddings, text serialization, LLM encoding) for mortality risk prediction on UK Biobank (n=124,158).',
  },
  {
    title: 'Master\'s Thesis Researcher',
    organization: 'German Cancer Research Center (DKFZ)',
    period: '2025.3 - 2026.3',
    description: 'Thesis on top of Elyas Heidari\'s Segger model: an interpretability framework for its attention and embeddings, a study of the Aligned Segger extension, and a benchmark across 8 cancer datasets.',
  },
  {
    title: 'Research Assistant',
    organization: 'Heidelberg Universität',
    period: '2024.9 - 2025.3',
    description: 'Developed a generative model for discrete data by projecting high-dimensional flow matching (Generative Assignment Flows).',
  },
  {
    title: 'Research Assistant',
    organization: 'CAMS & PUMC',
    period: '2023.12 - 2025.3',
    description: 'Led clustering analysis identifying phenotypes of COPD patients from a nationwide cohort (n>10,000); co-first author, published in Engineering (2025).',
  },
  {
    title: 'Research Assistant',
    organization: 'CAMS & PUMC',
    period: '2020.12 - 2024.6',
    description: 'First-author discrete choice experiment on COVID-19 vaccine preferences among 12,000 adults in China; contributed to 5+ peer-reviewed publications.',
  },
];

export default function Experience() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-clay-600">Experience</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-navy-900">Research Timeline</h1>

        <div className="mt-16">
          <div className="flow-root">
            <ul className="-mb-8">
              {experiences.map((experience, index) => (
                <li key={index}>
                  <div className="relative pb-8">
                    {index !== experiences.length - 1 && (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-clay-500 flex items-center justify-center ring-8 ring-white">
                          <svg
                            className="h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-navy-900 font-medium">
                            {experience.title} at {experience.organization}
                          </p>
                          <p className="mt-0.5 text-sm text-gray-500">{experience.description}</p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          <time dateTime={experience.period}>{experience.period}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 