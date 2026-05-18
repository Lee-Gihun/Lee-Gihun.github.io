import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('posts');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const post = props.post as CollectionEntry<'posts'>;
  const date = post.data.pubDate.toISOString().split('T')[0];

  const body = [
    `# ${post.data.title}`,
    `# ${post.data.title_en}`,
    '',
    `> Published: ${date}`,
    `> Author: Lee Gihun (이기훈)`,
    `> URL: https://lee-gihun.github.io/posts/${post.id}/`,
    '',
    post.body ?? '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
};
