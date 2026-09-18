import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About - Fengyun Yu',
  description: 'Learn more about Fengyun Yu\'s education, research interests, and academic background.',
};

const education = [
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
];

const interests = [
  'Trustworthy, interpretable machine learning for health',
  'Geometric Deep Learning',
  'Causal Inference',
  'Health Economics',
  'Numerical Optimization',
];

export default function About() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-clay-600">About</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-navy-900">Hi, I&apos;m Fengyun</h1>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="mx-auto max-w-xs -rotate-2 rounded-2xl border border-navy-100 bg-white p-3 shadow-lg">
              <Image
                src="/assets/fengyun-lake.jpg"
                alt="Fengyun Yu standing by a lake with snow-capped mountains behind"
                width={1000}
                height={1100}
                className="h-auto w-full rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-4 text-lg leading-relaxed text-gray-600 lg:col-span-8">
            <p>
              I trained as an industrial engineer at Tsinghua, then moved to Heidelberg for a
              master&apos;s in scientific computing. Along the way I&apos;ve worked between medicine and
              machine learning — from epidemiology studies at Peking Union Medical College to graph
              neural networks at the German Cancer Research Center (DKFZ).
            </p>
            <p>
              What I keep coming back to is trust. A model can post an excellent score and still be
              wrong about the biology, so I care about being able to look inside it. My goal is to
              build systems in health and biomedicine that people can reasonably rely on.
            </p>
            <p>
              I speak Chinese, English, and German (B1). Outside of research I run, cook, and play
              badminton.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="card">
            <h2 className="text-lg font-semibold text-navy-900">Education</h2>
            <div className="mt-4 space-y-6">
              {education.map((item) => (
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
            <h2 className="text-lg font-semibold text-navy-900">Research Interests</h2>
            <ul className="mt-4 space-y-3">
              {interests.map((interest) => (
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
