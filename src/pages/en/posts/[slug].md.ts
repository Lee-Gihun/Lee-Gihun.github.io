import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('postsEn');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const post = props.post as CollectionEntry<'postsEn'>;
  const date = post.data.pubDate.toISOString().split('T')[0];
  const koEntry = await getEntry('postsKo', post.id);

  const headerLines = [
    `# ${post.data.title}`,
    koEntry ? `# ${koEntry.data.title}` : null,
    '',
    `> Published: ${date}`,
    `> Author: Lee Gihun`,
    `> URL: https://lee-gihun.github.io/en/posts/${post.id}/`,
    koEntry
      ? `> Korean version: https://lee-gihun.github.io/posts/${post.id}/`
      : null,
    '',
  ].filter((line): line is string => line !== null);

  const body = [...headerLines, post.body ?? ''].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
