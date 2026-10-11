import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug } from '@/lib/blog';
import { localize, type Lang } from '@/lib/i18n';

export default function BlogPostPage({ lang, slug }: { lang: Lang; slug: string }) {
  const post = getPostBySlug(slug);
  if (!post || post.draft) notFound();

  return (
    <div className="bg-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {lang === 'zh' && (
          <p className="mb-6 rounded-md bg-navy-50 px-4 py-3 text-sm text-navy-700">
            本文以英文撰写。
            <Link href={localize(lang, '/blog')} className="ml-2 font-medium underline">
              返回文章列表
            </Link>
          </p>
        )}
        <h1 className="text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-2 text-sm text-gray-500">{post.date}</p>
        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-clay-50 text-clay-700 text-xs font-medium px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div
          className="prose max-w-none mt-10"
          lang="en"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>
    </div>
  );
}
