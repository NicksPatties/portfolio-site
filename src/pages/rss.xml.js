import rss from "@astrojs/rss";
import getPosts from "@utils/posts";
import isDev from "@utils/isDev";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import sanitizeHtml from 'sanitize-html'
import markdownit from "markdown-it"

const parser = new markdownit({
  html: true
});

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    // refer to the port defined in package.json when building the dev URL
    site: isDev() ? "http://localhost:4321": context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/blog/${post.slug}/`,
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags:
          sanitizeHtml.defaults.allowedTags.concat(['details', 'summary', 'img'])
      })
    })),
  });
}
