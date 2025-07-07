import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-300">
              Email: fengyun.yu@stud.uni-heidelberg.de
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/publications" className="text-gray-300 hover:text-white transition-colors">
                  Publications
                </Link>
              </li>
              <li>
                <Link href="/cv" className="text-gray-300 hover:text-white transition-colors">
                  CV
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href={process.env.LINKEDIN_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={process.env.GOOGLE_SCHOLAR_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Google Scholar
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Fengyun Yu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 