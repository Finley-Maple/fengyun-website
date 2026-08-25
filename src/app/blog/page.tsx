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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-navy-600 font-semibold tracking-wide uppercase">Blog</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-navy-900 sm:text-4xl">
            Writing
          </p>
        </div>

        <div className="mt-16 max-w-3xl mx-auto space-y-10">
          {posts.length === 0 && (
            <p className="text-center text-gray-500">No posts yet — check back soon.</p>
          )}
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-gray-200 pb-8">
              <Link href={`/blog/${post.slug}`} className="block group">
                <h3 className="text-xl font-medium text-navy-900 group-hover:text-navy-600">
                  {post.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{post.date}</p>
                {post.excerpt && <p className="mt-3 text-gray-600">{post.excerpt}</p>}
                {post.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-navy-50 text-navy-700 text-xs font-medium px-2 py-1 rounded"
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
