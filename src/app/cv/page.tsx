import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CV - Fengyun Yu',
  description: 'Download Fengyun Yu\'s CV and view professional highlights.',
};

const highlights = [
  {
    title: 'Academic Excellence',
    description: 'Master\'s grade: 1.4/1.0 at Universität Heidelberg',
  },
  {
    title: 'Research Output',
    description: '10+ publications in peer-reviewed journals',
  },
  {
    title: 'Research Experience',
    description: 'Multiple research positions at DKFZ, Heidelberg Universität, and CAMS & PUMC',
  },
  {
    title: 'Technical Skills',
    description: 'Expertise in geometric deep learning, causal inference, and numerical optimization',
  },
];

export default function CV() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-navy-600 font-semibold tracking-wide uppercase">Curriculum Vitae</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-navy-900 sm:text-4xl">
            Professional Highlights
          </p>
        </div>

        <div className="mt-16">
          <div className="text-center">
            <a
              href="/Fengyun_Yu_CV.pdf"
              download
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-navy-600 hover:bg-navy-700"
            >
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
              Download CV
            </a>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="relative p-6 bg-white rounded-lg border border-gray-200 hover:border-navy-500 transition-colors"
                >
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