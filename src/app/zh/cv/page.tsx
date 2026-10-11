import type { Metadata } from 'next';
import CvPage, { cvMetadata } from '@/components/pages/CvPage';

export const metadata: Metadata = cvMetadata.zh;

export default function Page() {
  return <CvPage lang="zh" />;
}
