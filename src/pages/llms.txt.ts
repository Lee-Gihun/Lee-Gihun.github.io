import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const koPosts = (await getCollection('postsKo')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  const enPosts = (await getCollection('postsEn')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  const enSlugs = new Set(enPosts.map((p) => p.id));
  const baseUrl = site!.toString().replace(/\/$/, '');

  const lines = [
    `# Gihun's brain`,
    '',
    `> Lee Gihun (이기훈). ML researcher background, currently leading a 7-person cross-functional product team (backend, frontend, ML, design, PM). Writes on AI, team building, decision-making, and leadership. Primary language Korean. Selected posts also available in English.`,
    '',
    `## Posts (Korean)`,
    '',
    ...koPosts.map((p) => {
      const date = p.data.pubDate.toISOString().split('T')[0];
      const enLink = enSlugs.has(p.id)
        ? ` [EN: ${baseUrl}/en/posts/${p.id}/]`
        : '';
      return `- [${p.data.title}](${baseUrl}/posts/${p.id}/) (${date}).${enLink} ${p.data.description}`;
    }),
    '',
    `## Posts (English)`,
    '',
    ...enPosts.map((p) => {
      const date = p.data.pubDate.toISOString().split('T')[0];
      return `- [${p.data.title}](${baseUrl}/en/posts/${p.id}/) (${date}). ${p.data.description}`;
    }),
    '',
    `## Optional`,
    '',
    `- [Full posts (markdown)](${baseUrl}/llms-full.txt): All post bodies concatenated for full-context reading.`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
