import isDev from '@utils/isDev';
import { type CollectionEntry, getCollection } from "astro:content";

type Blog = CollectionEntry<"blog">

/**
  @returns all my blog posts, sorted by most recent to least recent.
**/
export default async function getPosts(): Promise<Blog[]> {
  return (await getCollection("blog", (post: Blog) => isDev() || (!isDev() && post.data.published)
))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
}
