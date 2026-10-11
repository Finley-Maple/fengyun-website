export type Lang = 'en' | 'zh';

/** Prefix an internal path with the language segment (English has none). */
export function localize(lang: Lang, path: string): string {
  if (lang === 'en') return path;
  return path === '/' ? '/zh' : `/zh${path}`;
}

/** The same page in the other language, given the current pathname. */
export function switchPath(lang: Lang, pathname: string): string {
  if (lang === 'en') return localize('zh', pathname || '/');
  return pathname.replace(/^\/zh(?=\/|$)/, '') || '/';
}
