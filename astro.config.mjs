import { defineConfig } from "astro/config";
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";

/**
  @see https://github.com/rehypejs/rehype-autolink-headings?tab=readme-ov-file#options
*/
const autolinkOptions = {
  behavior: 'append',
  content: {
    type: 'element',
    tagName: 'span',
    properties: {
      className: 'haha'
    },
    children: [{ type: 'text', value: 'a' }]
  },
  properties: {
    ariaHidden: true
  }

}

// https://astro.build/config
export default defineConfig({
  site: "https://nickspatties.com",
  integrations: [mdx(), sitemap()],
  markdown: {
    syntaxHighlight: "prism",
    remarkPlugins: [remarkToc],
    rehypePlugins: [
      rehypeHeadingIds,
      [rehypeAutolinkHeadings, autolinkOptions]
    ]
  }
});
