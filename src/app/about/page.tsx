import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Fengyun Yu',
  description: 'Learn more about Fengyun Yu\'s education, research interests, and academic background.',
};

export default function About() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-navy-600 font-semibold tracking-wide uppercase">About</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-navy-900 sm:text-4xl">
            Education & Research
          </p>
        </div>

        <div className="mt-16">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {/* Education */}
            <div className="relative">
              <h3 className="text-lg leading-6 font-medium text-navy-900">Education</h3>
              <div className="mt-4 space-y-6">
                <div>
                  <h4 className="text-base font-medium text-navy-900">Master of Science in Scientific Computing</h4>
                  <p className="mt-1 text-sm text-gray-500">Universität Heidelberg</p>
                  <p className="mt-1 text-sm text-gray-500">2023.4 - Present</p>
                  <p className="mt-1 text-sm text-gray-500">Grade: 1.4/1.0</p>
                </div>
                <div>
                  <h4 className="text-base font-medium text-navy-900">Bachelor of Science</h4>
                  <p className="mt-1 text-sm text-gray-500">Tsinghua University</p>
                  <p className="mt-1 text-sm text-gray-500">2017.7 - 2021.6</p>
                  <p className="mt-1 text-sm text-gray-500">GPA: 3.7/4.00</p>
                </div>
              </div>
            </div>

            {/* Research Interests */}
            <div className="relative">
              <h3 className="text-lg leading-6 font-medium text-navy-900">Research Interests</h3>
              <div className="mt-4">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-navy-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-2 text-sm text-gray-500">Geometric Deep Learning</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-navy-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-2 text-sm text-gray-500">Causal Inference</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-navy-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-2 text-sm text-gray-500">Health Economics</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-navy-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-2 text-sm text-gray-500">Numerical Optimization</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 