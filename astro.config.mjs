import { defineConfig } from "astro/config";
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

/**
  @see https://github.com/rehypejs/rehype-autolink-headings?tab=readme-ov-file#options
*/
const autolinkOptions = {
  behavior: "wrap"
}

// https://astro.build/config
export default defineConfig({
  site: "https://nickspatties.com",
  integrations: [mdx(), sitemap()],
  markdown: {
    syntaxHighlight: "prism",
    rehypePlugins: [
      rehypeHeadingIds,
      [rehypeAutolinkHeadings, autolinkOptions]
    ]
  },
  devToolbar: {
    enabled: false
  }
});
