import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const posts = (await getCollection('posts')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  const baseUrl = site!.toString().replace(/\/$/, '');

  const sections = posts.map((p) => {
    const date = p.data.pubDate.toISOString().split('T')[0];
    return [
      `# ${p.data.title}`,
      `# ${p.data.title_en}`,
      '',
      `URL: ${baseUrl}/posts/${p.id}/`,
      `Published: ${date}`,
      `Author: Lee Gihun (이기훈)`,
      '',
      p.body ?? '',
      '',
      '---',
      '',
    ].join('\n');
  });

  const content = `# Gihun's brain — Full posts\n\n${sections.join('')}`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
};
