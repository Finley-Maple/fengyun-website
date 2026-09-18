import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1>
                <span className="block text-sm font-semibold uppercase tracking-wide text-navy-600">
                  Scientific Computing Researcher
                </span>
                <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                  <span className="block text-navy-900">Fengyun Yu</span>
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                M.Sc. Scientific Computing, Universität Heidelberg (2026)
              </p>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                I want to build trustworthy machine learning for health and biomedicine — systems
                whose answers you can inspect, not just score. My thesis at the German Cancer
                Research Center (DKFZ) asked what a spatial-transcriptomics graph model has actually
                learned, and whether higher accuracy means better biology.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <div className="flex flex-wrap gap-4">
                  <a
                    href="/cv"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-navy-600 hover:bg-navy-700"
                  >
                    View CV
                  </a>
                  <a
                    href="/publications"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-navy-700 bg-navy-100 hover:bg-navy-200"
                  >
                    Publications
                  </a>
                  <a
                    href="/blog"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-navy-700 bg-navy-100 hover:bg-navy-200"
                  >
                    Blog
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full bg-navy-50 rounded-lg overflow-hidden p-8">
                  <div className="aspect-w-16 aspect-h-9 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">👨‍🎓</div>
                      <p className="text-navy-600 font-medium">Welcome to my website!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Interests Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
              Research Interests
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Exploring the intersection of machine learning and scientific computing
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-navy-900">Interpretable Geometric Deep Learning</h3>
              <p className="mt-2 text-gray-500">
                Opening up graph neural networks for spatial transcriptomics: what their attention
                learns, and why accuracy metrics alone can decouple from biological meaning
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-navy-900">Causal Inference</h3>
              <p className="mt-2 text-gray-500">
                Applying discrete choice experiments and clustering methods to healthcare decisions,
                from COVID-19 vaccine preferences (n=12,000) to COPD patient phenotypes (n&gt;10,000)
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-navy-900">Health Economics</h3>
              <p className="mt-2 text-gray-500">
                Modeling the global economic burden of chronic disease and benchmarking mortality
                risk prediction on large-scale cohorts such as UK Biobank
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      {recentPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
                Latest from the Blog
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Notes on research, engineering, and life
              </p>
            </div>
            <div className="mt-12 max-w-3xl mx-auto space-y-8">
              {recentPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                  <article className="border-b border-gray-200 pb-8">
                    <h3 className="text-xl font-medium text-navy-900 group-hover:text-navy-600">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{post.date}</p>
                    {post.excerpt && <p className="mt-3 text-gray-600">{post.excerpt}</p>}
                  </article>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-navy-700 bg-navy-100 hover:bg-navy-200"
              >
                View all posts
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
} 