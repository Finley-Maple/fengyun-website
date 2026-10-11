import type { Metadata } from 'next';
import AboutPage, { aboutMetadata } from '@/components/pages/AboutPage';

export const metadata: Metadata = aboutMetadata.en;

export default function Page() {
  return <AboutPage lang="en" />;
}
