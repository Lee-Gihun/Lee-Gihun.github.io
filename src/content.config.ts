import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
});

const postsKo = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts/ko' }),
  schema: postSchema,
});

const postsEn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts/en' }),
  schema: postSchema,
});

export const collections = { postsKo, postsEn };
