# Blog Editor + /blog Site Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let Finley write blog posts in a Typora-like local markdown editor, publish them with one click (git commit + push, reusing the existing Vercel pipeline), have them render at `/blog` on yufengyun.de, and start the whole thing with a `/blog` Claude Code skill.

**Architecture:** Three independent pieces in one repo — (1) `content/blog/*.md` markdown files with YAML frontmatter as the data store, (2) `src/app/blog/` Next.js pages that statically render them at build time, and (3) `tools/blog-editor/`, a standalone local Express + Milkdown server, excluded from the Vercel deploy via `.vercelignore`, that writes those files and runs `git commit`/`git push` on Publish. A personal `~/.claude/skills/blog/SKILL.md` (outside the repo) launches the tool via `/blog`.

**Tech Stack:** Next.js 15 App Router (existing), `gray-matter` + `marked` for frontmatter/markdown parsing (shared pattern between the site and the tool, independent installs), Express 5 for the local server, Milkdown 7 (`@milkdown/core`, `@milkdown/preset-commonmark`, `@milkdown/theme-nord`, `@milkdown/plugin-listener`, `@milkdown/utils`) for the WYSIWYG editor, esbuild for bundling it, `open` for auto-launching a browser.

**Spec:** [docs/superpowers/specs/2026-08-25-blog-editor-design.md](../specs/2026-08-25-blog-editor-design.md)

## Global Constraints

- No authentication anywhere — the editor only runs locally, nothing on the internet can write to the repo.
- No database — posts are markdown files in the git repo, same as every other page on the site.
- No automated test suite. Every task is verified manually (curl, browser, `git log`) per the spec's explicit decision; do not introduce a test framework.
- No inline AI chat panel — "Discuss/Polish" hands a saved draft off to a Claude Code chat, it never calls the Claude API directly.
- No image uploads, tag-filtering UI, or categories in this pass.
- The slug is the filename and is immutable after a post is first created.
- `tools/blog-editor/` must never be part of the Vercel deployment (`.vercelignore`).
- All `git` operations from the editor server use `execFileSync` with argument arrays (never a shell string built from user input like the post title) to avoid command injection.

---

## Task 1: Scaffolding — content directory, shared dependencies, deploy exclusion

**Files:**
- Create: `content/blog/.gitkeep`
- Modify: `package.json`
- Modify: `tailwind.config.ts`
- Modify: `.vercelignore`

**Interfaces:**
- Produces: `gray-matter`, `marked`, and `@tailwindcss/typography` available as root dependencies for Task 2 onward.

- [ ] **Step 1: Create the content directory**

```bash
mkdir -p content/blog
touch content/blog/.gitkeep
```

- [ ] **Step 2: Add shared dependencies to the root `package.json`**

Edit the `dependencies` block (currently `next`, `react`, `react-dom`) to also include `gray-matter` and `marked`, and add `@tailwindcss/typography` to `devDependencies` (alongside the existing `@tailwindcss/forms`):

```json
  "dependencies": {
    "gray-matter": "^4.0.3",
    "marked": "^18.0.11",
    "next": "15.3.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
```

```json
  "devDependencies": {
    "@tailwindcss/forms": "^0.5.7",
    "@tailwindcss/typography": "^0.5.20",
    "@types/node": "^20.11.19",
```

- [ ] **Step 3: Install and verify the build still works**

```bash
npm install
npm run build
```

Expected: install succeeds, `npm run build` completes with no errors (this is the existing static site — nothing about it changes yet, this just confirms the new deps don't break anything).

- [ ] **Step 4: Register the typography plugin in Tailwind**

In `tailwind.config.ts`, add the plugin to the `plugins` array:

```typescript
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
```

- [ ] **Step 5: Exclude the editor tool from Vercel deployments**

Add a line to `.vercelignore`:

```
.git
.next
node_modules
README.md
.env*
tools/blog-editor
```

- [ ] **Step 6: Commit**

```bash
git add content/blog/.gitkeep package.json package-lock.json tailwind.config.ts .vercelignore
git commit -m "Add blog content dir and shared markdown/typography dependencies"
```

---

## Task 2: Blog data library + index page

**Files:**
- Create: `src/lib/blog.ts`
- Create: `src/app/blog/page.tsx`

**Interfaces:**
- Consumes: `gray-matter` (default export `matter`), `marked` (named export `marked`) from Task 1.
- Produces: `getAllPosts(): BlogPostMeta[]`, `getAllSlugs(): string[]`, `getPostBySlug(slug: string): BlogPost | null`, and the types `BlogPostMeta { slug, title, date, excerpt, tags, draft }` and `BlogPost extends BlogPostMeta { contentHtml }` — all consumed by Task 3's `[slug]/page.tsx` and Task 4/7's editor server (as the reference frontmatter shape, reimplemented independently there).

- [ ] **Step 1: Write `src/lib/blog.ts`**

```typescript
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
  const { data, content } = matter(raw);
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
```

- [ ] **Step 2: Write `src/app/blog/page.tsx`**

```tsx
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
```

- [ ] **Step 3: Create sample posts and verify**

```bash
mkdir -p content/blog
cat > content/blog/hello-world.md << 'EOF'
---
title: "Hello World"
date: "2026-08-25"
excerpt: "First test post"
tags: ["test"]
draft: false
---
# Hello

This is a **test** post.
EOF
cat > content/blog/draft-post.md << 'EOF'
---
title: "Draft Post"
date: "2026-08-24"
excerpt: "Should not show up"
tags: []
draft: true
---
Draft body.
EOF
npm run dev &
sleep 3
curl -s http://localhost:3000/blog | grep -o 'Hello World'
curl -s http://localhost:3000/blog | grep -o 'Draft Post' || echo "draft correctly hidden"
kill %1
```

Expected: `Hello World` found once; "draft correctly hidden" printed (the grep for `Draft Post` finds nothing).

- [ ] **Step 4: Remove the scratch posts (real content comes later, via the editor)**

```bash
rm content/blog/hello-world.md content/blog/draft-post.md
```

- [ ] **Step 5: Commit**

```bash
git add src/lib/blog.ts src/app/blog/page.tsx
git commit -m "Add blog data library and /blog index page"
```

---

## Task 3: Individual post page + nav link

**Files:**
- Create: `src/app/blog/[slug]/page.tsx`
- Modify: `src/types/navigation.ts`

**Interfaces:**
- Consumes: `getAllSlugs`, `getPostBySlug`, `BlogPost` from Task 2's `src/lib/blog.ts`.

- [ ] **Step 1: Write `src/app/blog/[slug]/page.tsx`**

```tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllSlugs, getPostBySlug } from '@/lib/blog';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} - Fengyun Yu`,
    description: post.excerpt || post.title,
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || post.draft) notFound();

  return (
    <div className="bg-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-2 text-sm text-gray-500">{post.date}</p>
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
        <div
          className="prose prose-navy max-w-none mt-10"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add "Blog" to the nav**

In `src/types/navigation.ts`, insert a new entry before `Contact`:

```typescript
export const navigationItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Experience', href: '/experience' },
  { label: 'CV', href: '/cv' },
  { label: 'Publications', href: '/publications' },
  { label: 'Personal Interests', href: '/personal-interests' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];
```

`src/components/Navbar.tsx` reads from this array already — no changes needed there.

- [ ] **Step 3: Verify with a real build (static generation) and the nav link**

```bash
cat > content/blog/hello-world.md << 'EOF'
---
title: "Hello World"
date: "2026-08-25"
excerpt: "First test post"
tags: ["test"]
draft: false
---
# Hello

This is a **test** post with a [link](https://example.com) and a list:

- one
- two
EOF
npm run build
npm run start &
sleep 3
curl -s http://localhost:3000/blog/hello-world | grep -o '<h1[^>]*>Hello</h1>'
curl -s http://localhost:3000/ | grep -o 'href="/blog"'
kill %1
```

Expected: the `<h1>Hello</h1>` line is found (confirms markdown → HTML rendering), and `href="/blog"` is found on the home page (confirms the nav link renders).

- [ ] **Step 4: Remove the scratch post**

```bash
rm content/blog/hello-world.md
```

- [ ] **Step 5: Commit**

```bash
git add src/app/blog/\[slug\]/page.tsx src/types/navigation.ts
git commit -m "Add individual blog post page and nav link"
```

---

## Task 4: Editor server core — list, load, create, update (no git yet)

**Files:**
- Create: `tools/blog-editor/package.json`
- Create: `tools/blog-editor/.gitignore`
- Create: `tools/blog-editor/server.js`

**Interfaces:**
- Produces: `GET /api/posts`, `GET /api/posts/:slug`, `POST /api/posts`, `PUT /api/posts/:slug` — consumed by Task 6's browser UI and extended (git logic added) by Task 7.

- [ ] **Step 1: Write `tools/blog-editor/package.json`**

```json
{
  "name": "blog-editor",
  "private": true,
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "build": "node build.js"
  },
  "dependencies": {
    "@milkdown/core": "^7.22.1",
    "@milkdown/plugin-listener": "^7.22.1",
    "@milkdown/preset-commonmark": "^7.22.1",
    "@milkdown/theme-nord": "^7.22.1",
    "@milkdown/utils": "^7.22.1",
    "express": "^5.2.1",
    "gray-matter": "^4.0.3",
    "marked": "^18.0.11",
    "open": "^11.0.1"
  },
  "devDependencies": {
    "esbuild": "^0.28.2"
  }
}
```

- [ ] **Step 2: Write `tools/blog-editor/.gitignore`**

```
node_modules/
public/dist/
```

- [ ] **Step 3: Write `tools/blog-editor/server.js`**

```javascript
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '..', '..', 'content', 'blog');
const PORT = process.env.PORT || 4321;

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function slugify(title) {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'untitled'
  );
}

function uniqueSlug(base) {
  let slug = base;
  let n = 2;
  while (fs.existsSync(path.join(BLOG_DIR, `${slug}.md`))) {
    slug = `${base}-${n}`;
    n += 1;
  }
  return slug;
}

function readPost(slug) {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title || slug,
    date: data.date || '',
    excerpt: data.excerpt || '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    draft: data.draft === true,
    body: content,
  };
}

function writePost(slug, { title, date, excerpt, tags, body, draft }) {
  fs.mkdirSync(BLOG_DIR, { recursive: true });
  const frontmatter = matter.stringify(body || '', {
    title,
    date,
    excerpt,
    tags: Array.isArray(tags) ? tags : [],
    draft: Boolean(draft),
  });
  fs.writeFileSync(path.join(BLOG_DIR, `${slug}.md`), frontmatter, 'utf8');
}

app.get('/api/posts', (req, res) => {
  if (!fs.existsSync(BLOG_DIR)) return res.json([]);
  const posts = fs
    .readdirSync(BLOG_DIR)
    .filter((name) => name.endsWith('.md'))
    .map((name) => readPost(name.replace(/\.md$/, '')))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  res.json(posts);
});

app.get('/api/posts/:slug', (req, res) => {
  const post = readPost(req.params.slug);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

app.post('/api/posts', (req, res) => {
  const { title, date, excerpt, tags, body, action } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const slug = uniqueSlug(slugify(title));
  try {
    writePost(slug, { title, date, excerpt, tags, body, draft: action !== 'publish' });
  } catch (err) {
    return res.status(500).json({ error: `Could not save file: ${err.message}` });
  }
  res.json({ slug });
});

app.put('/api/posts/:slug', (req, res) => {
  const { slug } = req.params;
  if (!readPost(slug)) {
    return res.status(404).json({ error: 'Post not found' });
  }
  const { title, date, excerpt, tags, body, action } = req.body;
  try {
    writePost(slug, { title, date, excerpt, tags, body, draft: action !== 'publish' });
  } catch (err) {
    return res.status(500).json({ error: `Could not save file: ${err.message}` });
  }
  res.json({ slug });
});

app.listen(PORT, () => {
  console.log(`Blog editor running at http://localhost:${PORT}`);
});
```

Wrapping `writePost` in try/catch here (rather than letting a filesystem error fall through to Express's default HTML error page) matters because the client's `save()` always calls `await res.json()` on the response — an HTML error body would fail to parse and the failure would surface as a confusing browser console error instead of the status message the UI is built to show.

- [ ] **Step 4: Install and verify via curl**

```bash
cd tools/blog-editor
npm install
node server.js &
sleep 1

curl -s -X POST localhost:4321/api/posts \
  -H 'Content-Type: application/json' \
  -d '{"title":"Hello World","date":"2026-08-25","excerpt":"test","tags":["test"],"body":"# Hi\n\nBody text","action":"save-draft"}'
# Expected: {"slug":"hello-world"}

curl -s localhost:4321/api/posts
# Expected: an array with one entry, slug "hello-world", draft: true

curl -s localhost:4321/api/posts/hello-world
# Expected: full post JSON including body "# Hi\n\nBody text"

curl -s -X PUT localhost:4321/api/posts/hello-world \
  -H 'Content-Type: application/json' \
  -d '{"title":"Hello World","date":"2026-08-25","excerpt":"test","tags":["test"],"body":"# Hi\n\nUpdated","action":"publish"}'
# Expected: {"slug":"hello-world"}

curl -s localhost:4321/api/posts/hello-world
# Expected: draft: false, body reflects "Updated"

kill %1
cd ../..
rm content/blog/hello-world.md
```

- [ ] **Step 5: Commit**

```bash
git add tools/blog-editor/package.json tools/blog-editor/package-lock.json tools/blog-editor/.gitignore tools/blog-editor/server.js
git commit -m "Add blog editor server core (list/load/create/update, no git yet)"
```

---

## Task 5: Milkdown bundle

**Files:**
- Create: `tools/blog-editor/src/editor-entry.js`
- Create: `tools/blog-editor/build.js`

**Interfaces:**
- Produces: `tools/blog-editor/public/dist/bundle.js` + `bundle.css` (esbuild output, gitignored), consumed by Task 6's `index.html`.
- Consumes: `@milkdown/core` (`Editor`, `rootCtx`, `defaultValueCtx`), `@milkdown/preset-commonmark` (`commonmark`), `@milkdown/theme-nord` (`nord` + its `style.css`), `@milkdown/plugin-listener` (`listener`, `listenerCtx`), `@milkdown/utils` (`getMarkdown`, `replaceAll`) — all installed in Task 4.

- [ ] **Step 1: Write `tools/blog-editor/src/editor-entry.js`**

```javascript
import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core';
import { commonmark } from '@milkdown/preset-commonmark';
import { nord } from '@milkdown/theme-nord';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { getMarkdown, replaceAll } from '@milkdown/utils';
import '@milkdown/theme-nord/style.css';

let editor = null;
let currentMarkdown = '';
let currentSlug = null;

const el = (id) => document.getElementById(id);

async function createEditor(initialMarkdown) {
  if (editor) {
    editor.action(replaceAll(initialMarkdown, true));
    currentMarkdown = initialMarkdown;
    return;
  }
  editor = await Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, el('editor-root'));
      ctx.set(defaultValueCtx, initialMarkdown);
      ctx.get(listenerCtx).markdownUpdated((_ctx, markdown) => {
        currentMarkdown = markdown;
      });
    })
    .config(nord)
    .use(commonmark)
    .use(listener)
    .create();
  currentMarkdown = initialMarkdown;
}

function getEditorMarkdown() {
  return editor ? editor.action(getMarkdown()) : currentMarkdown;
}

function showScreen(name) {
  el('screen-list').classList.toggle('hidden', name !== 'list');
  el('screen-editor').classList.toggle('hidden', name !== 'editor');
}

function setStatus(message, isError = false) {
  const status = el('status');
  status.textContent = message;
  status.classList.toggle('error', isError);
}

async function loadPostList() {
  const res = await fetch('/api/posts');
  const posts = await res.json();
  const list = el('post-list');
  list.innerHTML = '';
  if (posts.length === 0) {
    list.innerHTML = '<p class="empty">No posts yet.</p>';
    return;
  }
  for (const post of posts) {
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'post-row';
    row.innerHTML = `
      <span class="post-row-title"></span>
      <span class="post-row-meta"></span>
    `;
    row.querySelector('.post-row-title').textContent = post.title;
    row.querySelector('.post-row-meta').textContent =
      `${post.date}${post.draft ? ' · draft' : ''}`;
    row.addEventListener('click', () => openPost(post.slug));
    list.appendChild(row);
  }
}

async function openPost(slug) {
  const res = await fetch(`/api/posts/${slug}`);
  if (!res.ok) {
    alert('Could not load that post.');
    return;
  }
  const post = await res.json();
  currentSlug = post.slug;
  el('field-title').value = post.title;
  el('field-date').value = post.date;
  el('field-excerpt').value = post.excerpt;
  el('field-tags').value = post.tags.join(', ');
  await createEditor(post.body);
  showScreen('editor');
  setStatus('');
}

async function openNewPost() {
  currentSlug = null;
  el('field-title').value = '';
  el('field-date').value = new Date().toISOString().slice(0, 10);
  el('field-excerpt').value = '';
  el('field-tags').value = '';
  await createEditor('');
  showScreen('editor');
  setStatus('');
}

function currentFormData(action) {
  return {
    title: el('field-title').value.trim(),
    date: el('field-date').value,
    excerpt: el('field-excerpt').value.trim(),
    tags: el('field-tags')
      .value.split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    body: getEditorMarkdown(),
    action,
  };
}

async function save(action) {
  const payload = currentFormData(action);
  if (!payload.title) {
    setStatus('Title is required.', true);
    return;
  }
  setStatus('Saving...');
  const url = currentSlug ? `/api/posts/${currentSlug}` : '/api/posts';
  const method = currentSlug ? 'PUT' : 'POST';
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const result = await res.json();
  if (!res.ok) {
    setStatus(result.error || 'Save failed.', true);
    return;
  }
  currentSlug = result.slug;
  if (action === 'publish') {
    setStatus('Draft saved (publish wiring comes in a later task).');
  } else if (action === 'discuss') {
    setStatus(`Saved. Ask Claude to review content/blog/${result.slug}.md`);
  } else {
    setStatus('Draft saved.');
  }
}

el('new-post-button').addEventListener('click', openNewPost);
el('back-button').addEventListener('click', () => {
  showScreen('list');
  loadPostList();
});
el('save-draft-button').addEventListener('click', () => save('save-draft'));
el('publish-button').addEventListener('click', () => save('publish'));
el('discuss-button').addEventListener('click', () => save('discuss'));

loadPostList();
```

Note: the `publish` branch's status message is a placeholder for *this task only* — Task 7 replaces it with real commit/push feedback once the server actually does that work. This is intentional sequencing, not a loose end: Task 5/6 wire up and verify Save Draft end-to-end first, since that's the riskiest new piece (Milkdown itself); Task 7 layers git on top of an already-proven save path.

- [ ] **Step 2: Write `tools/blog-editor/build.js`**

```javascript
import { build } from 'esbuild';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

await build({
  entryPoints: [path.join(__dirname, 'src', 'editor-entry.js')],
  bundle: true,
  outfile: path.join(__dirname, 'public', 'dist', 'bundle.js'),
  format: 'iife',
  platform: 'browser',
  target: 'es2020',
  logLevel: 'info',
});
```

- [ ] **Step 3: Run the build and verify it succeeds**

```bash
cd tools/blog-editor
npm run build
ls public/dist/bundle.js public/dist/bundle.css
cd ../..
```

Expected: esbuild logs a success line, and both `bundle.js` and `bundle.css` exist in `public/dist/` (esbuild automatically emits the CSS pulled in via `import '@milkdown/theme-nord/style.css'` as a sibling file).

- [ ] **Step 4: Commit**

```bash
git add tools/blog-editor/src/editor-entry.js tools/blog-editor/build.js
git commit -m "Add Milkdown editor bundle (esbuild)"
```

---

## Task 6: Editor UI (HTML/CSS) — full Save Draft flow working in a browser

**Files:**
- Create: `tools/blog-editor/public/index.html`
- Create: `tools/blog-editor/public/style.css`

**Interfaces:**
- Consumes: DOM ids `screen-list`, `screen-editor`, `post-list`, `new-post-button`, `back-button`, `field-title`, `field-date`, `field-excerpt`, `field-tags`, `editor-root`, `save-draft-button`, `publish-button`, `discuss-button`, `status` — all referenced by `editor-entry.js` from Task 5.

- [ ] **Step 1: Write `tools/blog-editor/public/index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Blog Editor</title>
    <link rel="stylesheet" href="/dist/bundle.css" />
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div id="screen-list" class="screen">
      <header class="topbar">
        <h1>My Posts</h1>
        <button id="new-post-button" type="button" class="button primary">New Post</button>
      </header>
      <div id="post-list" class="post-list"></div>
    </div>

    <div id="screen-editor" class="screen hidden">
      <header class="topbar">
        <button id="back-button" type="button" class="button">&larr; My Posts</button>
        <div class="actions">
          <button id="discuss-button" type="button" class="button">Discuss/Polish</button>
          <button id="save-draft-button" type="button" class="button">Save Draft</button>
          <button id="publish-button" type="button" class="button primary">Publish</button>
        </div>
      </header>
      <div class="fields">
        <input id="field-title" type="text" placeholder="Post title" class="field-title-input" />
        <div class="field-row">
          <input id="field-date" type="date" />
          <input id="field-tags" type="text" placeholder="Tags, comma separated" />
        </div>
        <input id="field-excerpt" type="text" placeholder="One-line excerpt" class="field-excerpt-input" />
      </div>
      <div id="editor-root" class="editor-root"></div>
      <p id="status" class="status"></p>
    </div>

    <script src="/dist/bundle.js"></script>
  </body>
</html>
```

- [ ] **Step 2: Write `tools/blog-editor/public/style.css`**

```css
:root {
  --ink: #1a2533;
  --muted: #677b8f;
  --accent: #2b3a4a;
  --border: #d9e2ec;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  color: var(--ink);
  background: #fff;
}

.hidden {
  display: none;
}

.screen {
  max-width: 760px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.topbar h1 {
  font-size: 1.25rem;
  margin: 0;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.button {
  border: 1px solid var(--border);
  background: #fff;
  color: var(--ink);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
}

.button.primary {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.post-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  text-align: left;
  width: 100%;
  font: inherit;
}

.post-row-title {
  font-weight: 500;
}

.post-row-meta {
  color: var(--muted);
  font-size: 0.8rem;
}

.empty {
  color: var(--muted);
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.fields input {
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  font-family: inherit;
  width: 100%;
}

.field-title-input {
  font-size: 1.5rem;
  font-weight: 600;
}

.field-row {
  display: flex;
  gap: 0.5rem;
}

.field-row input {
  flex: 1;
}

.editor-root {
  min-height: 50vh;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.5rem;
}

.status {
  margin-top: 1rem;
  color: var(--muted);
  font-size: 0.875rem;
  min-height: 1.25rem;
}

.status.error {
  color: #b91c1c;
}
```

- [ ] **Step 3: Run it and verify the full Save Draft flow in a real browser**

```bash
cd tools/blog-editor
npm run build
node server.js &
cd ../..
```

Open `http://localhost:4321` in the browser (use the Browser tool's `preview_start` with that URL, or open it manually). Then:

1. Confirm "My Posts" shows "No posts yet."
2. Click "New Post". Type a title (e.g. "Test Post"), type some markdown in the editor body (e.g. `# Heading` then a new paragraph with `**bold**` text) and confirm it renders inline WYSIWYG-style (the heading looks large, "bold" looks bold) rather than showing raw `#`/`**` characters.
3. Click "Save Draft". Confirm the status line shows "Draft saved."
4. Run `cat content/blog/test-post.md` in a terminal and confirm the frontmatter (`title`, `date`, `draft: true`) and body are correct.
5. Click "← My Posts", confirm "Test Post" now appears in the list with a "· draft" marker.
6. Click it again, confirm the title/date/tags/excerpt fields and the editor body repopulate correctly.

- [ ] **Step 4: Stop the server and remove the scratch post**

```bash
kill %1
rm content/blog/test-post.md
```

- [ ] **Step 5: Commit**

```bash
git add tools/blog-editor/public/index.html tools/blog-editor/public/style.css
git commit -m "Add blog editor UI with working Save Draft flow"
```

---

## Task 7: Publish + Discuss/Polish actions (git wiring)

**Files:**
- Modify: `tools/blog-editor/server.js`
- Modify: `tools/blog-editor/src/editor-entry.js`

**Interfaces:**
- Consumes: Node's `child_process.execFileSync`.
- Produces: `POST /api/posts` and `PUT /api/posts/:slug` now return `{ slug, commit, pushError }` on `action: 'publish'` (in addition to the existing `{ slug }` shape for other actions), and `{ slug, error }` with HTTP 500 if the git commit itself fails for a reason other than "nothing to commit".

- [ ] **Step 1: Add the git publish helper to `server.js`**

Add this import at the top (alongside the existing ones):

```javascript
import { execFileSync } from 'child_process';
```

Add this constant near `BLOG_DIR`:

```javascript
const REPO_ROOT = path.join(__dirname, '..', '..');
```

Add this function (near `writePost`):

```javascript
function publishPost(slug, title) {
  const relPath = path.join('content', 'blog', `${slug}.md`);
  execFileSync('git', ['add', relPath], { cwd: REPO_ROOT, stdio: 'pipe' });
  try {
    execFileSync('git', ['commit', '-m', `Blog post: ${title}`], {
      cwd: REPO_ROOT,
      stdio: 'pipe',
    });
  } catch (err) {
    const output = `${err.stdout || ''}${err.stderr || ''}`;
    if (!output.includes('nothing to commit')) {
      throw new Error(output || err.message);
    }
  }
  let pushError = null;
  try {
    execFileSync('git', ['push'], { cwd: REPO_ROOT, stdio: 'pipe' });
  } catch (err) {
    pushError = err.stderr ? err.stderr.toString() : err.message;
  }
  const commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: REPO_ROOT })
    .toString()
    .trim();
  return { commit, pushError };
}
```

- [ ] **Step 2: Wire it into the two route handlers**

Replace the `POST /api/posts` handler with:

```javascript
app.post('/api/posts', (req, res) => {
  const { title, date, excerpt, tags, body, action } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const slug = uniqueSlug(slugify(title));
  try {
    writePost(slug, { title, date, excerpt, tags, body, draft: action !== 'publish' });
  } catch (err) {
    return res.status(500).json({ error: `Could not save file: ${err.message}` });
  }
  if (action === 'publish') {
    try {
      const { commit, pushError } = publishPost(slug, title);
      return res.json({ slug, commit, pushError });
    } catch (err) {
      return res.status(500).json({ slug, error: err.message });
    }
  }
  res.json({ slug });
});
```

Replace the `PUT /api/posts/:slug` handler with:

```javascript
app.put('/api/posts/:slug', (req, res) => {
  const { slug } = req.params;
  if (!readPost(slug)) {
    return res.status(404).json({ error: 'Post not found' });
  }
  const { title, date, excerpt, tags, body, action } = req.body;
  try {
    writePost(slug, { title, date, excerpt, tags, body, draft: action !== 'publish' });
  } catch (err) {
    return res.status(500).json({ error: `Could not save file: ${err.message}` });
  }
  if (action === 'publish') {
    try {
      const { commit, pushError } = publishPost(slug, title);
      return res.json({ slug, commit, pushError });
    } catch (err) {
      return res.status(500).json({ slug, error: err.message });
    }
  }
  res.json({ slug });
});
```

- [ ] **Step 3: Update the client's publish/discuss status handling**

In `tools/blog-editor/src/editor-entry.js`, replace the `save()` function's result-handling block:

```javascript
  currentSlug = result.slug;
  if (action === 'publish') {
    setStatus('Draft saved (publish wiring comes in a later task).');
  } else if (action === 'discuss') {
    setStatus(`Saved. Ask Claude to review content/blog/${result.slug}.md`);
  } else {
    setStatus('Draft saved.');
  }
```

with:

```javascript
  currentSlug = result.slug;
  if (action === 'publish') {
    if (result.pushError) {
      setStatus(
        `Committed locally (${result.commit.slice(0, 7)}) but push failed: ${result.pushError}`,
        true
      );
    } else {
      setStatus(`Published! Commit ${result.commit.slice(0, 7)}`);
    }
  } else if (action === 'discuss') {
    setStatus(`Saved. Ask Claude to review content/blog/${result.slug}.md`);
  } else {
    setStatus('Draft saved.');
  }
```

- [ ] **Step 4: Rebuild the bundle**

```bash
cd tools/blog-editor
npm run build
cd ../..
```

- [ ] **Step 5: Verify the real publish flow end-to-end**

This step genuinely commits and pushes to the real repo (that's the feature), so clean up immediately after confirming it works.

```bash
cd tools/blog-editor
node server.js &
cd ../..
```

In the browser: create a new post titled "Editor Smoke Test" with a short body, click Publish. Confirm the status shows "Published! Commit &lt;hash&gt;".

```bash
git log -1 --oneline
# Expected: "Blog post: Editor Smoke Test"
git status
# Expected: clean, and origin/main matches HEAD (git push succeeded)
```

Also verify "Discuss/Polish": reopen the same post, click "Discuss/Polish", confirm the status shows "Saved. Ask Claude to review content/blog/editor-smoke-test.md" — then actually ask Claude (in this chat) to review that file, and confirm Claude can read it directly.

- [ ] **Step 6: Remove the smoke-test post and push the removal**

```bash
kill %1
rm content/blog/editor-smoke-test.md
git add content/blog/editor-smoke-test.md
git commit -m "Remove editor smoke-test post"
git push
```

- [ ] **Step 7: Review the failure path (code inspection, not a live test)**

Re-read the `publishPost` function above and confirm: `execFileSync` throws an `Error` with `.stdout`/`.stderr` `Buffer` properties on non-zero exit (this is documented Node.js `child_process` behavior); the `git push` failure is caught separately from `git add`/`git commit` so a network failure surfaces as `pushError` on an otherwise-successful local commit, never as a crash or a silently-swallowed error. (A live simulated network failure isn't tested here — doing that safely would mean temporarily repointing this repo's real `origin` remote, which the spec calls out as not worth the risk for a one-person tool. This code-reading pass is the documented mitigation.)

- [ ] **Step 8: Commit the git-wiring code itself**

```bash
git add tools/blog-editor/server.js tools/blog-editor/src/editor-entry.js
git commit -m "Wire up Publish (git commit+push) and Discuss/Polish hand-off"
```

---

## Task 8: `npm run write` script, auto-open browser, and the no-open flag

**Files:**
- Modify: `package.json`
- Modify: `tools/blog-editor/server.js`

**Interfaces:**
- Produces: root `npm run write` script; `server.js` now opens a browser tab automatically unless `BLOG_EDITOR_NO_OPEN` is set — consumed by Task 9's skill, which sets that flag before starting the server itself.

- [ ] **Step 1: Add the `write` script to the root `package.json`**

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "write": "[ -d tools/blog-editor/node_modules ] || npm install --prefix tools/blog-editor; npm start --prefix tools/blog-editor"
  },
```

- [ ] **Step 2: Add auto-open (with an opt-out) to `server.js`**

Add the import at the top:

```javascript
import open from 'open';
```

Replace the final `app.listen` block:

```javascript
app.listen(PORT, () => {
  console.log(`Blog editor running at http://localhost:${PORT}`);
});
```

with:

```javascript
app.listen(PORT, async () => {
  console.log(`Blog editor running at http://localhost:${PORT}`);
  if (!process.env.BLOG_EDITOR_NO_OPEN) {
    await open(`http://localhost:${PORT}`);
  }
});
```

- [ ] **Step 3: Rebuild and verify both paths**

```bash
cd tools/blog-editor
npm run build
cd ../..

npm run write &
sleep 2
```

Expected: a browser window opens automatically to `http://localhost:4321` showing "My Posts".

```bash
kill %1
BLOG_EDITOR_NO_OPEN=1 npm run write &
sleep 2
curl -s -o /dev/null -w '%{http_code}' http://localhost:4321
# Expected: 200
kill %1
```

Expected: no browser window opens this time, but the server is confirmed reachable via curl.

- [ ] **Step 4: Commit**

```bash
git add package.json tools/blog-editor/server.js
git commit -m "Add npm run write script with auto-open and a no-open flag"
```

---

## Task 9: `/blog` Claude Code skill

**Files:**
- Create: `~/.claude/skills/blog/SKILL.md` (outside the repo — this is personal to how Finley invokes the tool, not site source code)

**Interfaces:**
- Consumes: `npm run write` and `BLOG_EDITOR_NO_OPEN` from Task 8.

- [ ] **Step 1: Write the skill file**

```markdown
---
name: blog
description: Launches Finley's local blog-writing tool (Milkdown editor) for yufengyun.de and opens it in the browser. Use when Finley wants to write, edit, or publish a blog post.
---

# /blog — Launch the blog editor

This skill starts the local blog-writing tool for the `fengyun-website`
project and opens it in the browser, so Finley can go straight from typing
`/blog` to writing.

## Steps

1. The project lives at
   `/Users/finleyyu/Desktop/人事材料/homepage/fengyun-website`. Confirm the
   directory still exists; if not, ask Finley for the current path before
   continuing.
2. Check whether `tools/blog-editor/node_modules` exists in that project.
   If it doesn't, run `npm install` inside `tools/blog-editor` first (this
   only needs to happen once, ever).
3. Check whether something is already listening on port 4321 (e.g.
   `lsof -i :4321`). If the editor is already running, skip straight to
   step 5.
4. Otherwise, start it in the background from the project root:
   `BLOG_EDITOR_NO_OPEN=1 npm run write` — run this as a background
   command, since it's a long-running server, not a one-shot command.
   Give it a couple of seconds to come up before continuing.
5. Open `http://localhost:4321` in the browser preview pane so Finley can
   see and use the editor immediately.
6. Tell Finley it's ready. Mention that "Discuss/Polish" in the editor
   saves the draft and shows which file (`content/blog/<slug>.md`) to
   bring up in this chat for feedback.
```

- [ ] **Step 2: Dry-run the skill's steps manually to confirm they work**

```bash
ls "/Users/finleyyu/Desktop/人事材料/homepage/fengyun-website/tools/blog-editor/node_modules" > /dev/null && echo "deps present"
lsof -i :4321 || echo "port free"
```

If "port free": start it exactly as the skill describes (`BLOG_EDITOR_NO_OPEN=1 npm run write`, backgrounded, from the project root), then open `http://localhost:4321` with the Browser tool and confirm "My Posts" loads. Then stop the background server.

- [ ] **Step 3: Commit the repo-visible parts only**

The skill file itself lives outside the repo (`~/.claude/skills/`), so there's nothing new to commit here — this step just confirms git status is clean:

```bash
git status
```

Expected: clean working tree (everything from Tasks 1–8 was already committed).

---

## Task 10: End-to-end verification and final cleanup

**Files:** none (verification only)

- [ ] **Step 1: Full real-world run-through via the skill path**

Start the editor the way Finley actually will — `BLOG_EDITOR_NO_OPEN=1 npm run write` in the background, then open `http://localhost:4321` via the Browser tool. Write a genuine test post end to end: New Post → type a title, tags, excerpt, and a body with a heading, bold text, and a list → Save Draft → confirm the file and its frontmatter via `cat` → go back to "My Posts" and confirm it's listed as a draft → reopen it → edit the body → Publish → confirm the status shows a commit hash.

- [ ] **Step 2: Verify it's actually live**

```bash
git log -1 --oneline
```

Then check the corresponding Vercel deployment has picked it up (the same GitHub-integration pipeline verified in the earlier vercel.json fix): visit the Deployments list for the `fengyun-website` project and confirm a new deployment triggered by this commit, and once it's Ready, visit `https://www.yufengyun.de/blog` and confirm the test post appears, and `https://www.yufengyun.de/blog/<slug>` renders it correctly.

- [ ] **Step 3: Remove the test post**

```bash
kill %1  # stop the local editor server
rm content/blog/<slug-used-above>.md
git add content/blog/<slug-used-above>.md
git commit -m "Remove end-to-end test post"
git push
```

Confirm the Vercel deployment for this removal also goes green, and `https://www.yufengyun.de/blog` no longer lists the test post.

- [ ] **Step 4: Final check**

```bash
git status
git log --oneline -12
```

Expected: clean working tree, and the log shows the full sequence of commits from Tasks 1 through this cleanup — no stray test content left in `content/blog/`.
