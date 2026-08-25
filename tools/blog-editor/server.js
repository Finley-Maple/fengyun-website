import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { execFileSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '..', '..', 'content', 'blog');
const REPO_ROOT = path.join(__dirname, '..', '..');
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

app.listen(PORT, () => {
  console.log(`Blog editor running at http://localhost:${PORT}`);
});
