import type { Metadata } from 'next';
import BlogIndexPage, { blogMetadata } from '@/components/pages/BlogIndexPage';

export const metadata: Metadata = blogMetadata.en;

export default function Page() {
  return <BlogIndexPage lang="en" />;
}
