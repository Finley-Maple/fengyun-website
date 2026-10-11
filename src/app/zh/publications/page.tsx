import type { Metadata } from 'next';
import PublicationsPage, { publicationsMetadata } from '@/components/pages/PublicationsPage';

export const metadata: Metadata = publicationsMetadata.zh;

export default function Page() {
  return <PublicationsPage lang="zh" />;
}
