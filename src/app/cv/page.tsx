import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CV - Fengyun Yu',
  description: 'Download Fengyun Yu\'s CV and view professional highlights.',
};

const highlights = [
  {
    title: 'Academic Excellence',
    description: 'M.Sc. Scientific Computing, Universität Heidelberg (2026); B.Sc. Industrial Engineering, Tsinghua University',
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
    description: 'Expertise in geometric deep learning, causal inference, and numerical optimization',
  },
];

export default function CV() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-clay-600">Curriculum Vitae</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-navy-900">Professional Highlights</h1>

        <div className="mt-16">
          <div>
            <a
              href="/Fengyun_Yu_CV.pdf"
              download
              className="btn-primary"
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
                  className="card"
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