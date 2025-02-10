import { defineCollection, reference, z } from "astro:content";
import { glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    published: z.boolean().default(false),
    tags: z.array(reference('tags')).optional(),
    project: reference('projects').optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/projects" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    heroImage: z.string().optional(),
    tags: z.array(reference('tags')).optional(),
    published: z.boolean().default(false),
    order: z.number().default(1000)
  })
})

const tags = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{yml,yaml}', base: "./src/content/tags" }),
  schema: z.object({
    name: z.string(),
    // TODO add additional properties for tags here once you need them
  })
})

export const collections = { blog, projects, tags };
