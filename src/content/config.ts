import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    published: z.boolean().default(false),
    tagSlugs: z.array(z.string()).optional()
  }),
});

const tags = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    color: z.string().optional(),
  })
})

export const collections = { blog, tags };
