# Blog writing tool + /blog site section — Design

Date: 2026-08-25
Status: Approved by user, ready for implementation planning

## Goal

Let Finley write blog posts in a clean, Typora-like markdown editor on his
own laptop, publish them with one click (commit + push, reusing the
existing Vercel/GitHub deploy pipeline), and have them render as a new
`/blog` section on yufengyun.de. Starting the editor should be as easy as
typing `/blog` in a Claude Code chat. Optionally, he can hand a draft off
to a Claude Code chat to discuss and polish the writing.

## Non-goals

- No public-facing editor or admin route on the live site — writing only
  happens locally, on Finley's machine.
- No authentication system — there is nothing on the internet that can
  write to the repo; the local tool is the only writer.
- No database — posts are markdown files in the git repo, same as every
  other page on the site.
- No inline AI chat panel / direct Anthropic API integration in the
  editor. Discussing/polishing a draft happens by handing it off to a
  Claude Code chat session, not by embedding an LLM call in the tool.
- No image uploads, tag-filtering UI, or categories in this pass. Tags are
  stored and displayed as simple badges only.
- No automated test suite. Verification is manual (see Testing below).

## Architecture

Three independent pieces:

1. **`tools/blog-editor/`** — a small standalone Node/Express server, never
   deployed (excluded via `.vercelignore`). Serves one HTML page with a
   Milkdown WYSIWYG markdown editor. Talks to the local filesystem and to
   `git` directly via `child_process`.
2. **`content/blog/*.md`** — the post content itself, committed to the
   same repo as the rest of the site.
3. **`src/app/blog/`** — Next.js pages that read `content/blog/` at build
   time and render the public blog section, following the same static-page
   pattern as `src/app/about`, `src/app/cv`, etc.

A fourth piece ties it together for convenience:

4. **`~/.claude/skills/blog/SKILL.md`** — a personal (global, not repo-
   committed) Claude Code skill. Typing `/blog` tells Claude to start the
   `tools/blog-editor` server (if not already running) and open it in a
   browser tab, removing the "cd, npm run write, open browser" ceremony.

```
/blog  (Claude Code)
  └─ starts tools/blog-editor server + opens browser
       └─ editor UI (Milkdown, WYSIWYG)
            ├─ Save Draft  → writes content/blog/<slug>.md (draft: true)
            ├─ Publish     → writes file (draft: false) + git add/commit/push
            └─ Discuss/Polish → writes file + shows "ask Claude to review
                                 content/blog/<slug>.md" note
                                      │
                                      ▼
                            Vercel auto-deploy (existing pipeline)
                                      │
                                      ▼
                     yufengyun.de/blog and /blog/<slug>
                     (built from content/blog/*.md via src/lib/blog.ts)
```

## Components

### `tools/blog-editor/`

- `server.js` — Express app, three responsibilities:
  - Serve the static editor page (`public/index.html` + a pre-bundled
    Milkdown JS bundle, built via a small `esbuild` script rather than
    loaded from a CDN, so the tool works offline and isn't tied to a CDN's
    availability/versioning). The bundle step is wired into
    `tools/blog-editor`'s own `npm run build` and runs automatically the
    first time `npm run write` starts the server if the bundle is missing
    or stale — Finley never has to remember to run it by hand.
  - `GET /api/posts` — list `content/blog/*.md` (slug, title, date, draft
    status) for the "My Posts" screen.
  - `GET /api/posts/:slug` — load one post's frontmatter + body for
    re-opening in the editor.
  - `POST /api/posts/:slug` — write frontmatter + body to
    `content/blog/<slug>.md`. Body includes an `action` field:
    `save-draft` (write only), `publish` (write, then `git add/commit/push`),
    or `discuss` (write only, response includes the file path for the
    hand-off note).
- Started via `npm run write` (a script added to the main `package.json`)
  or by the `/blog` skill; listens on `localhost:4321` and opens the
  browser automatically (e.g. via the `open` npm package).
- Slug is derived from the title (kebab-cased) when a post is first
  created, and is immutable afterwards — it's the filename, so changing it
  would require a file rename, which is out of scope for this pass. If a
  new title collides with an existing slug, the tool appends `-2`, `-3`,
  etc.

### `content/blog/*.md`

Frontmatter:

```yaml
---
title: "My Post Title"
date: "2026-08-25"
excerpt: "One-line summary shown on the blog index"
tags: ["research", "life"]
draft: false
---
Post body in markdown...
```

The slug is the filename (`content/blog/my-post-title.md`), not a
frontmatter field, so the file path and the `/blog/<slug>` URL can never
drift apart.

### `src/lib/blog.ts`

- `getAllPosts()` — reads `content/blog/*.md`, parses frontmatter with
  `gray-matter`, filters out `draft: true`, sorts by `date` descending.
- `getPostBySlug(slug)` — reads one file, parses frontmatter, renders the
  markdown body to HTML with `marked` (the same library the editor's own
  preview uses, so the WYSIWYG-rendered look and the published look never
  diverge).

### `src/app/blog/page.tsx` and `src/app/blog/[slug]/page.tsx`

- Index page lists published posts: title, date, excerpt, tag badges,
  linking to `/blog/<slug>`.
- Post page statically generated via `generateStaticParams`, matching the
  rest of the site's static-export pattern (`output: 'standalone'` in
  `next.config.js`). Body HTML is inserted via `dangerouslySetInnerHTML` —
  safe here because all content is authored solely by Finley through the
  local tool, never from public input.
- "Blog" added to `src/types/navigation.ts` / `src/components/Navbar.tsx`
  alongside the existing nav items.

### `~/.claude/skills/blog/SKILL.md`

- Personal skill, not part of the git repo (it's specific to how Finley
  invokes tools locally, not to the site's codebase).
- Instructs Claude, on `/blog`: check whether the `tools/blog-editor`
  server is already running on port 4321; if not, start it in the
  background (`run_in_background`); then open
  `http://localhost:4321` in the browser preview pane.

## Data flow

1. `/blog` → editor opens to "My Posts" (existing drafts/published posts)
   or "New Post".
2. Compose in the Milkdown surface; title/tags/excerpt in plain fields
   above it.
3. **Save Draft** — writes the file with `draft: true`. No git action.
   Safe to hit repeatedly while mid-post.
4. **Publish** — writes the file with `draft: false`, then
   `git add`, `git commit -m "Blog post: <title>"`, `git push`. Vercel's
   existing GitHub integration deploys it automatically — no new deploy
   mechanism.
5. **Discuss/Polish** — writes the file (whatever its current draft
   state), and shows a message: "Saved. Ask Claude in your chat to review
   `content/blog/<slug>.md`." Finley switches to the Claude Code chat
   already open (the one that ran `/blog`) and asks for feedback there;
   Claude reads the file directly.
6. On successful publish, the UI shows the commit hash and a link to the
   Vercel deployments page.

## Error handling

- `git push` failure (offline, remote moved on) — the commit has already
  happened locally, so nothing is lost. The UI surfaces the raw git error
  and tells Finley to run `git push` manually once resolved, rather than
  silently retrying.
- Filesystem write failure (e.g. disk full, permissions) — surfaced
  directly as an error in the UI; the in-progress editor content is not
  cleared, so no work is lost even if the save fails.
- Slug collisions on new-post creation are resolved automatically
  (`-2`, `-3`, ...) rather than erroring, since there's only one author and
  no real risk of a meaningful conflict.

## Testing

No automated test suite for this pass. Manual verification before calling
it done:

1. Write a real test post through the editor end-to-end: create, save
   draft, reopen the draft, edit, publish.
2. Confirm the resulting `content/blog/<slug>.md` has correct frontmatter
   and body.
3. Confirm `git log` shows the expected commit and `git push` succeeded.
4. Run `npm run build && npm run start` locally and confirm the post
   renders correctly at `/blog` and `/blog/<slug>`, and that a draft post
   does NOT appear on the index.
5. Confirm the `/blog` Claude Code skill starts the server and opens the
   browser when it isn't already running, and just re-opens the browser
   (without erroring or double-starting) when it already is.
6. Delete the test post's file and commit before considering the feature
   done, so a placeholder post doesn't stay live on yufengyun.de.

## Open questions / future work

- Cover images, categories, and tag-filtering are all deliberately out of
  scope for this pass — can be added later without changing the core
  file-per-post architecture.
- Slug is currently immutable after creation (tied to the filename); a
  rename flow could be added later if needed.
