import { defineCollection, reference, z } from "astro:content";

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
    tags: z.array(reference('tags')).optional(),
    project: reference('projects').optional(),
  }),
});

const projects = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    description: z.string(),
    heroImage: z.string().optional(),
    tags: z.array(reference('tags')).optional(),
    motivation: z.string(),
  })
})

const tags = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    // TODO add additional properties for tags here once you need them
  })
})

export const collections = { blog, projects, tags };
