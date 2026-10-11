import { Metadata } from 'next';
import { getAllSlugs, getPostBySlug } from '@/lib/blog';
import BlogPostPage from '@/components/pages/BlogPostPage';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || post.draft) return {};
  return {
    title: post.title,
    description: post.excerpt || post.title,
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  return <BlogPostPage lang="en" slug={slug} />;
}
