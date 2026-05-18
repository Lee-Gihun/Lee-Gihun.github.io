import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const posts = (await getCollection('posts')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  const baseUrl = site!.toString().replace(/\/$/, '');

  const lines = [
    `# Gihun's brain`,
    '',
    `> Lee Gihun (이기훈) — ML researcher background, currently leading a 7-person cross-functional product team (backend, frontend, ML, design, PM). Writes mostly in Korean on AI, team building, decision-making, and leadership.`,
    '',
    `## Posts`,
    '',
    ...posts.map((p) => {
      const date = p.data.pubDate.toISOString().split('T')[0];
      return `- [${p.data.title} (${p.data.title_en})](${baseUrl}/posts/${p.id}/) — ${date}. ${p.data.description}`;
    }),
    '',
    `## Optional`,
    '',
    `- [Full posts (markdown)](${baseUrl}/llms-full.txt): All post bodies concatenated for full-context reading.`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
};
