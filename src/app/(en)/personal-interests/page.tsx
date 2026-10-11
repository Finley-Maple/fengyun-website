import type { Metadata } from 'next';
import PersonalInterestsPage, { personalInterestsMetadata } from '@/components/pages/PersonalInterestsPage';

export const metadata: Metadata = personalInterestsMetadata.en;

export default function Page() {
  return <PersonalInterestsPage lang="en" />;
}
