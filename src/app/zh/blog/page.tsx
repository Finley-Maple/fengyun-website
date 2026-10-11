import type { Metadata } from 'next';
import BlogIndexPage, { blogMetadata } from '@/components/pages/BlogIndexPage';

export const metadata: Metadata = blogMetadata.zh;

export default function Page() {
  return <BlogIndexPage lang="zh" />;
}
