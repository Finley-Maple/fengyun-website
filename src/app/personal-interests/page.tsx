import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Personal Interests - Fengyun Yu',
  description: 'Explore Fengyun Yu\'s personal interests including cooking, running, and badminton.',
  keywords: ['Fengyun Yu', 'personal interests', 'cooking', 'running', 'badminton'],
};

const interests = [
  {
    title: 'Cooking',
    description: 'Cooking, as well as research, is also a kind of art. It needs good taste, and sometimes faces unsatisfactory results.',
    images: [
      { src: '/assets/cooking-photo1.png', alt: 'Cooking photo 1' },
      { src: '/assets/cooking-photo2.png', alt: 'Cooking photo 2' },
      { src: '/assets/cooking-photo3.png', alt: 'Cooking photo 3' },
    ],
  },
  {
    title: 'Running',
    description: 'Once you start, you are getting closer to the destination. Running is a lifestyle that I communicate with my body.',
    images: [
      { src: '/assets/marathon-photo1.png', alt: 'Running photo 1' },
      { src: '/assets/marathon-photo2.png', alt: 'Running photo 2' },
      { src: '/assets/marathon-photo3.png', alt: 'Running photo 3' },
    ],
  },
  // {
  //   title: 'Badminton',
  //   description: 'Badminton is my go-to for staying active and competitive.',
  //   images: [
  //     { src: '/assets/badminton-photo1.jpg', alt: 'Badminton photo 1' },
  //     { src: '/assets/badminton-photo2.jpg', alt: 'Badminton photo 2' },
  //     { src: '/assets/badminton-photo3.jpg', alt: 'Badminton photo 3' },
  //   ],
  // },
];

export default function PersonalInterests() {
  return (
    <main className="bg-white min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mb-2">Personal Interests</h1>
          <p className="text-navy-600 text-lg">A glimpse into my hobbies and passions outside academia.</p>
        </header>
        <div className="space-y-16">
          {interests.map((interest) => (
            <section key={interest.title} aria-labelledby={interest.title.replace(/\s/g, '-') + '-heading'}>
              <h2 id={interest.title.replace(/\s/g, '-') + '-heading'} className="text-2xl font-bold text-navy-900 mb-2">{interest.title}</h2>
              <p className="text-navy-600 mb-6 max-w-2xl">{interest.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {interest.images.map((img, idx) => (
                  <div key={img.src} className="bg-navy-50 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={400}
                      height={300}
                      className="w-full h-56 object-cover object-center transition-transform duration-200 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
} 