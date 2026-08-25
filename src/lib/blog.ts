import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const BLOG_DIRECTORY = path.join(process.cwd(), 'content', 'blog');

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  draft: boolean;
}

export interface BlogPost extends BlogPostMeta {
  contentHtml: string;
}

function readPostFile(slug: string): { meta: BlogPostMeta; body: string } {
  const filePath = path.join(BLOG_DIRECTORY, `${slug}.md`);
  const raw = fs.readFileSync(filePath, 'utf8');
  let parsed;
  try {
    parsed = matter(raw);
  } catch (err) {
    throw new Error(`Malformed frontmatter in content/blog/${slug}.md: ${(err as Error).message}`);
  }
  const { data, content } = parsed;
  return {
    meta: {
      slug,
      title: typeof data.title === 'string' ? data.title : slug,
      date: typeof data.date === 'string' ? data.date : '',
      excerpt: typeof data.excerpt === 'string' ? data.excerpt : '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      draft: data.draft === true,
    },
    body: content,
  };
}

function listSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIRECTORY)) return [];
  return fs
    .readdirSync(BLOG_DIRECTORY)
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''));
}

export function getAllPosts(): BlogPostMeta[] {
  return listSlugs()
    .map((slug) => readPostFile(slug).meta)
    .filter((meta) => !meta.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllSlugs(): string[] {
  return listSlugs();
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIRECTORY, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const { meta, body } = readPostFile(slug);
  const contentHtml = marked.parse(body) as string;
  return { ...meta, contentHtml };
}
