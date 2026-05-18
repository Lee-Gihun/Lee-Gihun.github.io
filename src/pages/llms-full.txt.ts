import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

type AnyEntry = CollectionEntry<'postsKo'> | CollectionEntry<'postsEn'>;

function section(p: AnyEntry, url: string, sister?: { lang: string; url: string }) {
  const date = p.data.pubDate.toISOString().split('T')[0];
  return [
    `# ${p.data.title}`,
    '',
    `URL: ${url}`,
    `Published: ${date}`,
    `Author: Lee Gihun (이기훈)`,
    sister ? `Translation (${sister.lang}): ${sister.url}` : null,
    '',
    p.body ?? '',
    '',
    '---',
    '',
  ]
    .filter((line): line is string => line !== null)
    .join('\n');
}

export const GET: APIRoute = async ({ site }) => {
  const koPosts = (await getCollection('postsKo')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  const enPosts = (await getCollection('postsEn')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  const baseUrl = site!.toString().replace(/\/$/, '');
  const enSlugs = new Set(enPosts.map((p) => p.id));
  const koSlugs = new Set(koPosts.map((p) => p.id));

  const koSections = koPosts.map((p) =>
    section(p, `${baseUrl}/posts/${p.id}/`, enSlugs.has(p.id) ? { lang: 'en', url: `${baseUrl}/en/posts/${p.id}/` } : undefined)
  );
  const enSections = enPosts.map((p) =>
    section(p, `${baseUrl}/en/posts/${p.id}/`, koSlugs.has(p.id) ? { lang: 'ko', url: `${baseUrl}/posts/${p.id}/` } : undefined)
  );

  const content = [
    `# Gihun's brain. Full posts`,
    '',
    `## Korean`,
    '',
    ...koSections,
    `## English`,
    '',
    ...enSections,
  ].join('\n');

  return new Response(content, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
