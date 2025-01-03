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

`pnpm new:blog {{name-of-the-article}}`

- `name-of-the-article` should not have spaces

### Images

Cover photos

- place them in the `public/blog/<blog-name>` directory
- size: 1080 x 510

Blog images

- place them in the `src/assets/blog/<blog-name>` directory
- Images here will be processed by Astro

### Info, Warning, and Danger sections

```md
<div class="[info|warning|danger]">

Here's your text

Don't forget the spaces in the front and back. **Formatting works, too!**

</div>
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
# optional
heroImage: "/projects/project-title/cover.png"
# published: true
# optional
tags:
  - "astro"
  - "javascript"
---
```

### Images

Cover photos

- place them in the `public/projects/<project-name>` directory
- size: 1080 x 510

Blog images

- place them in the `src/assets/projects/<project-name>` directory
- Images here will be processed by Astro

#### Adding images to blog posts

`![Image alt text](@assets/blog/{{blog-title}}/{{image-name}})`

## Screenshots

You can automate screenshots for pages you want to check by using this command:

```sh
pnpm pw:screenshots
```

Check the `screenshots` directory for the screenshots and do your visual testing.

## Debugging the Caddy server

This creates a server that is close to the actual `nickspatties.com` site.

```sh
pnpm docker:serve
```

This runs a Caddy server that serves my assets. To visit it, use the local IPv4 address `http://127.0.0.1`.

## Deploying changes to production server

```
pnpm build
scp -r dist/* aws-ubuntu-t2micro:/var/www/html
```

I'll need to configure this better to support a directory that the user actually has access to.

## Important Caddy server files

- `/var/www/html` directory to place built site assets
- `/var/log/caddy/access.log` Caddy server access logs
- `/etc/caddy/Caddyfile` Caddy server configuration

## Gotchas

### Avoiding links with automatic redirects

- Add a trailing slash to html pages (ex: `/blog/my-article/`)
- Add a slash before a section link (ex: `/blog/my-article/#my-section`)
- You don't need trailing slashes when linking to assets (ex: `/rss.xml`)
