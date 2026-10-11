import type { Metadata } from 'next';
import ExperiencePage, { experienceMetadata } from '@/components/pages/ExperiencePage';

export const metadata: Metadata = experienceMetadata.en;

export default function Page() {
  return <ExperiencePage lang="en" />;
}
