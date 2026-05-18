import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    title_en: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    lang: z.enum(['ko', 'en']).default('ko'),
  }),
});

export const collections = { posts };
