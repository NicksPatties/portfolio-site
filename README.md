# Portfolio site

## Commands

| Command                 | Action                                           |
| :---------------------- | :----------------------------------------------- |
| `pnpm run dev`          | Starts local dev server at `localhost:4321`      |
| `pnpm run dev --host`   | Exposes `10.0.0.12:4321` for testing on devices  |
| `pnpm run build`        | Build your production site to `./dist/`          |
| `pnpm run preview`      | Preview your build locally, before deploying     |
| `pnpm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `pnpm run astro --help` | Get help using the Astro CLI                     |

## Updating my resume

Edit the `resume.json` file to add new information.

This file follows the JSON format as seen in MegaResume. Here are some [details](https://github.com/NicksPatties/megaresume/blob/e798e819630448d1169ac10f0216da609a3c2eae/src/data/data.ts) about the expected JSON format.

## Adding a blog post

```md
---
title: "Blog title"
description: "A description of the blog I'm writing."
pubDate: "2024-04-18PDT" # Don't forget the timezone code at the end!
# optional, assumes image is in the `public` folder
heroImage: "/blog-hero-image.jpg"
# optional, set this to true if you want it on the site
published: true
---
```

## Adding new tags

1. Create a new YAML file (this filename is pretty much the slug of the tag)
2. Add a `name` property to the file
3. Add the tag filename to your blog posts in the `tags` array.

## Adding new projects

```yml
---
name: "Project title"
description: "A description of the project"
heroImage: "/path/to/hero/image"
published: false
tags:
  - "astro"
  - "javascript"
---
```
