---
title: "Adding tags"
description: "The description for me adding tags"
pubDate: "2024-04-18PST" # Don't forget the timezone code at the end!
published: false
project: "portfolio-site"
tags:
  - "javascript"
  - "typescript"
  - "astro"
---

Here's my notes/post for adding tags

# How I've done it before

I made TimeClock, which had a similar concept. When recording multiple events, I combined events of different types (or tags) by just string comparison. This made it difficult for me to modify different things about the tag, such as presentation stuff like colors. It made it difficult to work with.

# How I think it should be done

I need to create another data type to represent tags. They need:

- A slug (so I can reference them in my url, and also on other pages. This will effectively be my id for the tag)
- A printable name (How the tag appears in the UI)
- Optional colors (This could either be a hex value, although it'll be easier to style with css, and I could probably use the slug as a css class instead. This may not actually be necessary)

Tags should also follow Twitter format. I should look for tags on Twitter and see which ones return the greatest results. That way, if I want to automate social posts, then I can just grab the information from the name.

I don't want to automatically generate a slug for tags. I would like to use the most effective slug for the job by searching the above. Plus, it's just easier for me to

# How other people do it?

How do other people add tags on their pages?

- Old Ham Vocke site
  - [Pages have tags](https://github.com/hamvocke/hamvocke.github.io/blob/c5def81486d2c4dcb091024cad10eaa23f7ac714/_posts/2020-02-02-distraction-free-writing.md?plain=1#L5), which are an array. If a tag has a dash, then you need to do the YAML list format thing (which I'll probably have to do)
  - In the tag-page layout, iterate through the posts. [If the current post has the tag in its list, then show it.](https://github.com/hamvocke/hamvocke.github.io/blob/c5def81486d2c4dcb091024cad10eaa23f7ac714/_layouts/tag-page.html#L12)
  - [tags have the slug layout already](https://github.com/hamvocke/hamvocke.github.io/blob/main/tags/command-line.html#L3), no pretty name, but they have a punchline, which is shown in the tag page layout
- swyx's site (Learn In Public guy)
  - Aside, but actually has his posts in his issues on github!
  - his tags are prettified and included in his frontmatter
  - searching is done by `hashtag-<tagname>`, which is weird
  - He lists the tags at the bottom of the post. His posts are fetched from his github issues.
  - They're also just strings in the end. No additional information.
- elian.codes blog (Astro maintainer)
  - [Tags are also an array of strings](https://github.com/ElianCodes/ElianCodes-frontend/blob/880308f638ba325c5663f006729d07cf0dbb7cc3/src/content/config.ts#L8)
  - How is the slug handled? It's an escaped space, so the URL looks gross. `https://www.elian.codes/blog/tags/open%20source/` for the 'Open Source' tag
  - There's no root tags page as well. Meaning there's no place for me to see all of his tags.
  - Different colors when hovering! Where does the color come from? It comes from the Pill component in his brutal-ui package. If there's no color that's passed into the Pill component, [then a random one is selected](https://github.com/ElianCodes/brutal-ui/blob/60ec17de404ce77a73553707ced16be7852a8cc7/src/components/Pill.astro#L7-L10) from [a list](https://github.com/ElianCodes/brutal-ui/blob/60ec17de404ce77a73553707ced16be7852a8cc7/src/config/colors.json). [The color is then assigned as an inline style.](https://github.com/ElianCodes/brutal-ui/blob/60ec17de404ce77a73553707ced16be7852a8cc7/src/components/Pill.astro#L31)

# The game plan

1. Create a content type of Tag in config.ts
2. Attach a tags property to my blog

# Adding the tags

I created some configuration in my content/config.ts file. This configuration defined the data type of tag.

At first, I figured having a `slug` property would make this process easier. This would allow me to only have to assign the slug to the blog post that I wanted. I could create urls that looked more sane.

However, I ran into an issue. I didn't have a clean way to obtain the tags with just the slug alone. I needed this to print the pretty name of the tag in the tags list on each of my cards.

Re-reviewing the documentation, I can create references to many tags by just providing the name of the file that contains the tag data.

Instead of creating a `slug` property for my use case, I created a `decorated` property, which contains the printable name, along with the rest of the tag data

## Weird expected `blank` to be a string error

This sometimes happens in the getStaticPaths function inside a dynamic route.

If you do not return the correct array of objects, then the routes cannot be generated. You may get an error called something like expected `slug` to be a string. This happens when there is no property in each object of the array you return that matches the name of the variable name in your file.

For a while I was looking in the `getStaticPaths` function for something that was wrong. I thought there was an issue with the objects I was using to generate the array. Because I was only looking at my code instead of my file

## Finding the correct type

Since I'm using TypeScript, I need to make sure I'm getting the right types when I'm doing operations on collections. Specifically, I need to find the right type for _references to collections_ from within another collection.

I'm trying to do this to have my find call work correctly
