---
title: "Building the site: Part 2"
description: "I share my thoughts on good blog design, and how I modified the default Astro blog template to improve my reading experience."
pubDate: "2024-04-30PDT"
published: false
project: "portfolio-site"
tags:
  - "astro"
  # - "accessibility"
  # - "web design"
  # - "typescript"
  # - "css"
---

## Improved design

Some of the components in the original blog template were pretty good, but I wanted to improve their design. The blog should focus on prose first, and then with visuals. Some of the starter components were ill-suited to satisfy that goal.

### The `Hero` component

Here's what the original blog page looks like.

[Image of original blog theme]()

The first thing you see is this? Nah, let's make this more fun.

This is the first thing a visitor sees when they open my website. I wanted to decorate it with a fun image, and some memorable font.

Additionally, I wanted this component to work on smaller screens as well. The design is a little different for smaller screens; I wanted the text to be centered rather than the dramatic offset alignment. On smaller screens, the offset looks unintentional and unsettling rather than dynamic and fun.

To enable this, I used CSS media queries to modify the layout of the background image and text.

The burger image is absolutely positioned, which means I'm in charge of where it should go relative to the parent container defined with `position: relative`. This creates a new stacking context, which means the css properties `top`, `bottom`, `left`, and `right` are relative to the element rather than the entire document. So, `top: 0` and `right:0` means "move this element's top and right sides to the upper right corner of this parent container."

I did this instead of creating a background in the hero component, because it was easier for me to position and rotate the burger exactly where I wanted.

[Hero component image]()

### The `Card` component

_This can be a section where I talk about design rules, and designs that work on both desktop and mobile devices, and handling focus styles._

These card components were designed to show off some cool stuff in a blog post. However, if I don't supply an image, then the Card breaks.

[Image of card with image and without image]()

To make writing blogs easier for me, I don't want to require myself to have an image in my blog post. Also, I want the title of the blog, and some of its content to draw more attention. To satisfy these requirements, a horizontal layout works better for me.

Here's what I did...

[Image of the new card components]()

### Improved `meta` tags

This makes the blog **easy to share**. Users know what they're getting into when they see a link to my site on their platform of choice.

Astro's starter blog template was great for showing me the basics.

[Image of the old social container]()

I dove deeper into the different tags to see how I could improve the appearance with new pages. I made these code changes:

```astro
the code changes
```

The BaseHead component accepts properties that change the title and description of the site, as well as the image meta tags.

Here's a link for the home page:

[Image of the new container home page]()

Here's the new social media link for the previous blog post.

[Image of the new container after the changes]()

I created different ones for blog posts, the home page, and my resume, for additional context.

# That's it for now!

Although the default theme was a good starting point, I made some modifications to improve my site's functionality and design. I didn't cover everything in exhaustive detail, but I talked about making mobile-friendly layouts, and improving its accessibility.

I think the changes make the site easier to read, but what do you think? Do these layouts make it easy to find and read my posts on your browser of choice? I'm happy to hear your thoughts!
