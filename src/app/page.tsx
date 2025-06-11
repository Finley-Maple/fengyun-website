import Image from 'next/image';

export default function Home() {
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
                Master's student in Scientific Computing at Universität Heidelberg
              </p>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                I specialize in geometric deep learning, causal inference, and health economics.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <div className="flex space-x-4">
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
              <h3 className="text-xl font-semibold text-navy-900">Geometric Deep Learning</h3>
              <p className="mt-2 text-gray-500">
                Researching advanced neural network architectures for structured data
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-navy-900">Causal Inference</h3>
              <p className="mt-2 text-gray-500">
                Developing methods to understand cause-and-effect relationships in complex systems
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-navy-900">Health Economics</h3>
              <p className="mt-2 text-gray-500">
                Applying computational methods to healthcare decision-making
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 