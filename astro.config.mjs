import { defineConfig } from "astro/config";
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";


const icon = {
  type: 'element',
  tagName: 'svg',
  properties: {
    className: 'link-icon',
    version: '1.1',
    xmlns: "http://www.w3.org/2000/svg",
    height: "100%",
    width: "100%",
    preserveAspectRatio: "none",
    viewBox: "0 0 32 32"
  },
  children: [{
    type: 'element',
    tagName: 'path',
    properties: {
      d: "M23.459 12.383c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0c0.003 0 0.006 0 0.009 0 2.467 0 4.467 2 4.467 4.467s-2 4.467-4.467 4.467c-0.003 0-0.007 0-0.010 0h-6.352c-0.003 0-0.006 0-0.009 0-2.467 0-4.467-2-4.467-4.467s2-4.467 4.467-4.467c0.003 0 0.007 0 0.010 0h-0.001c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0c-0.003 0-0.008 0-0.012 0-3.848 0-6.967 3.119-6.967 6.967s3.119 6.967 6.967 6.967c0.004 0 0.008 0 0.012 0h6.352c0.003 0 0.008 0 0.012 0 3.848 0 6.967-3.119 6.967-6.967s-3.119-6.967-6.967-6.967c-0.004 0-0.008 0-0.012 0h0.001zM8.534 17.313c-0.003 0-0.006 0-0.009 0-2.465 0-4.463-1.998-4.463-4.463s1.998-4.463 4.463-4.463c0.003 0 0.007 0 0.010 0h6.347c2.461 0.005 4.453 2.001 4.453 4.463s-1.993 4.457-4.453 4.463h-0.001c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0c3.84-0.007 6.951-3.122 6.951-6.963s-3.111-6.956-6.95-6.963h-6.348c-0.004 0-0.008 0-0.012 0-3.845 0-6.963 3.117-6.963 6.963s3.117 6.963 6.963 6.963c0.004 0 0.008 0 0.012 0h-0.001c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0z",
    }
  }]
}

/**
  @see https://github.com/rehypejs/rehype-autolink-headings?tab=readme-ov-file#options
*/
const autolinkOptions = {
  behavior: 'append',
  content: icon,
  properties: {
    ariaHidden: true,
    className: 'link-icon-container'
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
