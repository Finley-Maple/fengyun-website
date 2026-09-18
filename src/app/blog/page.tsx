import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog - Fengyun Yu',
  description: 'Posts on research, engineering, and life from Fengyun Yu.',
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-clay-600">Blog</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-navy-900">Writing</h1>

        <div className="mt-12 max-w-3xl space-y-6">
          {posts.length === 0 && (
            <p className="text-gray-500">No posts yet — check back soon.</p>
          )}
          {posts.map((post) => (
            <article key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="card block group">
                <h3 className="text-xl font-medium text-navy-900 group-hover:text-clay-700">
                  {post.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{post.date}</p>
                {post.excerpt && <p className="mt-3 text-gray-600">{post.excerpt}</p>}
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
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
