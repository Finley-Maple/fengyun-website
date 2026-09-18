import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

const iconProps = {
  className: 'h-6 w-6',
  fill: 'none',
  viewBox: '0 0 24 24',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  'aria-hidden': true,
};

const interests = [
  {
    title: 'Interpretable Geometric Deep Learning',
    description:
      'Opening up graph neural networks for spatial transcriptomics: what their attention learns, and why accuracy metrics alone can decouple from biological meaning.',
    icon: (
      <svg {...iconProps}>
        <circle cx="6" cy="6" r="2.25" />
        <circle cx="18" cy="6" r="2.25" />
        <circle cx="12" cy="18" r="2.25" />
        <path strokeLinecap="round" d="M8 6h8M7.2 8l3.6 8M16.8 8l-3.6 8" />
      </svg>
    ),
  },
  {
    title: 'Causal Inference',
    description:
      'Discrete choice experiments and clustering on health data, from COVID-19 vaccine preferences (n=12,000) to COPD patient phenotypes (n>10,000).',
    icon: (
      <svg {...iconProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
        />
      </svg>
    ),
  },
  {
    title: 'Health Economics',
    description:
      'Modeling the global economic burden of chronic disease and benchmarking mortality risk prediction on large cohorts such as UK Biobank.',
    icon: (
      <svg {...iconProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
        />
      </svg>
    ),
  },
];

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-sm font-semibold uppercase tracking-wide text-clay-600">
                Scientific Computing Researcher
              </p>
              <h1 className="mt-2 text-5xl font-extrabold tracking-tight text-navy-900 sm:text-6xl">
                Fengyun Yu
              </h1>
              <p className="mt-4 text-lg text-navy-500">
                M.Sc. Scientific Computing, Universität Heidelberg (2026)
              </p>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                I want to build trustworthy machine learning for health and biomedicine — systems
                whose answers you can inspect, not just score. My thesis at the German Cancer
                Research Center (DKFZ) asked what a spatial-transcriptomics graph model has actually
                learned, and whether higher accuracy really means better biology.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                Based in Heidelberg. Away from the keyboard, I&apos;m usually running or cooking.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/cv" className="btn-primary">
                  View CV
                </Link>
                <Link href="/publications" className="btn-secondary">
                  Publications
                </Link>
                <Link href="/blog" className="btn-accent">
                  Blog
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="mx-auto max-w-sm rotate-2 rounded-2xl border border-navy-100 bg-white p-3 shadow-xl transition-transform duration-300 hover:rotate-0">
                <Image
                  src="/assets/fengyun-lake.jpg"
                  alt="Fengyun Yu standing by a lake with snow-capped mountains behind"
                  width={1000}
                  height={1100}
                  priority
                  className="h-auto w-full rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Interests */}
      <section className="bg-navy-50/60 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-navy-900">Research Interests</h2>
          <p className="mt-2 text-lg text-gray-500">
            Where machine learning meets health, and where I try to ask what a model actually knows.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {interests.map((interest) => (
              <div key={interest.title} className="card">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy-50 text-navy-600">
                  {interest.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-navy-900">{interest.title}</h3>
                <p className="mt-2 text-gray-600">{interest.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      {recentPosts.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-navy-900">
                  Latest from the Blog
                </h2>
                <p className="mt-2 text-lg text-gray-500">Notes on research, engineering, and life.</p>
              </div>
              <Link href="/blog" className="hidden text-sm font-medium text-clay-700 hover:underline sm:block">
                All posts &rarr;
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {recentPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="card block">
                  <p className="text-sm text-gray-500">{post.date}</p>
                  <h3 className="mt-1 text-lg font-semibold text-navy-900">{post.title}</h3>
                  {post.excerpt && <p className="mt-2 text-gray-600">{post.excerpt}</p>}
                  {post.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-clay-50 px-2 py-1 text-xs font-medium text-clay-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link href="/blog" className="btn-accent">
                View all posts
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
