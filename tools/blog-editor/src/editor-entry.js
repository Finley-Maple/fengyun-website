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
