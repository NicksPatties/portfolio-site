---
title: "Welcome to the new site!"
description: "An introduciton to my new portfolio, and the technology that powers it."
# watch out date is in standard time shows up wrong fix it
pubDate: "2024-04-18PST"
# optional, assumes image is in the `public` folder
heroImage: "/welcome-to-the-new-site-cover-pexels-pixabay.jpg"
published: true
project: "portfolio-site"
tags:
  - "astro"
---

Hello, and thanks for visiting! This marks this site's first, official blog post.

I'd like to use this blog as a platform to share my software development process. It's an opportunity for me to show my abilities, and solidify my understanding of my own work. Perhaps, over time, we can learn together!

To start, let's talk about this website. I'll share my purpose for making this blog, and the technology I chose to make it.

# Goals

Many times, I found solutions to uncommon problems on technical blogs, I want mine to serve a similar function. Here's why I want to make this site:

## To share my knowledge

I see this as my first step to [learning in public](https://www.swyx.io/learn-in-public). If I find solutions to tricky problems, I want to share them with people. After all, someone else may share a better solution, or I could help someone else solve their own programming problems.

Plus, although this is not my goal, learning publicly can open unseen opportunities for me in my software career. [If someone can turn their experience into a New York Times bestselling book and a movie adaptation by learning in public](https://www.washingtonpost.com/food/2022/11/02/julie-powell-julia-child-food-writing/), then I should at least give it a try, too.

Another reason why I'd like to do this is...

## To share my projects

It's one thing to view a project on a code repository host like GitHub or GitLab. While this may provide interest for experienced programmers, it's more challenging for everyone else to read or use.

Sharing my projects on this site in addition to my repositories can help! Rather than reading pages of code, or requiring people to compile or install software, I can use pictures and prose to demonstrate what my software does, and what it's supposed to do.

With these goals in mind, I lay out my requirements.

## Requirements

My site should be...

### Easy to write

I'm not the fastest writer, so something that makes it really easy for me to write articles with as little friction as possible is a great help.

Things that I need to configure, modify, and move each time I create a new article distracts me from the goal of writing articles. The more streamlined the process, the better.

I'll know I've done a good job if **writing an article takes about two days to complete at most**. Note this is not two whole days, but if I spend an hour or two for a couple of days, then I should be ready to publish something.

Also, I want to respect a user's choice to **disable JavaScript**. JavaScript can make web applications interactive and fun, but can also annoy visitors if abused. Additionally, if I don't need JavaScript files, then readers do not need to load them when they open a blog post. Fewer files means faster page loads!

Which in turn makes my site...

### Easy to read

There's no point in having a lot of content to share if it's difficult to read.

Using my site needs to be a pleasant experience. It needs to be **fast to load**, and **support all screen sizes**. It also needs to be accessible: **screen reader support** and **keyboard navigation** should work on my site.

I want this site to respect a reader's choice to **disable JavaScript**. JavaScript

### Easy to share

Sharing a link to this site (or any site, really) is straightforward: copy the link and send it. This comes with the web.

But, if I post a link from this site elsewhere, such as a social media site or messaging app, I want to **show rich content** to the recipient, to show off what this site is all about!

# How?

With these requirements laid out, is there a tool out there that can make it really easy for me to build my own site and handle all of my content? Enter...

## Static Site Generators

Static Site Generators (SSGs) are programs that take a text files and some templates as input, and smash them together to create a collection of web pages. Once these web pages are built, they can be uploaded to a web server, and thus, a website for all to see.

Typically, SSGs support [Markdown](https://en.wikipedia.org/wiki/Markdown) text files, which are easy to read and write. I can write my files in any text editor I want, and I don't have to write complex HTML tags to format text. Since I've been using Markdown to write my notes lately, this helps a lot!

Once the web pages were built, the quickest way to get them on a web server was to deploy them to something like [GitHub Pages](https://pages.github.com/). This meant I didn't have to configure my own domain to host and share my site as quickly as possible.

[Jamstack.org's site generator list](https://jamstack.org/generators/) was a great resource for finding SSGs to try. After exploring some options, including Hugo, Hexo, and NextJS, I found something that caught my eye.

## Enter _Astro_

As far as SSGs go, I had the most pleasant experience working with this one! There was support for features that I wanted now, and perhaps in the future as the site starts to grow.

### Pros

Here's why I liked Astro:

- Astro does not generate JavaScript by default!
- It has interactive tutorials and friendly documentation ease the on-boarding process.

When learning a new tool, I like to create a smaller, sample application to get a feel for how it works. [Astro's "Build your first Astro Blog" tutorial](https://docs.astro.build/en/tutorial/0-introduction/) guides users through creating an Astro app, and tests them to see if the information has stuck. I used this to learn about the guts of an Astro application.

- I can create layouts with HTML, React, Vue, and Svelte components!

Although I won't use this immediately, this means that my portfolio site can be a test bed for different JavaScript UI frameworks! I can compare and contrast how different features work, and can display these components directly in this blog!

Note that readers do not need to enable JavaScript in their browser to see this, but if the article would benefit significantly from it, I'll notify the readers in the article.

There were some hiccups with Astro, though.

### Cons

- There's no command line interface for creating new content automatically.

This was something I missed when I was trying out Hugo. If I wanted to create a new article or post with Hugo, [I could use a command to generate all of my required files and start writing](https://gohugo.io/commands/hugo_new/). If I wanted the same functionality with Astro, I'd have to write my own commands.

- Auto-formatting is provided by Prettier by default, which is very slow.

Compared to other formatting software, such as Biome, Prettier is very sluggish, and forces me to slow down when I save. Although it's only about a half-second, I find I lose momentum when writing something and I have to save.

Despite those shortcomings, Astro was very appealing to me. I committed to my choice, and got to work.

# Next time

In the spirit of brevity, I'll wrap this up for now. Hopefully this gives you an idea of how I think about problems and how I find solutions. Considering what I enjoy about technical blogs, I created some goals, and broke down those goals into requirements.

Next time, I'll share some ways that I satisfy those requirements. I'll break them down even further into tasks, and share my process with code excerpts and screenshots. After reading, you'll have a better idea of how I built the site you're reading today.

That's all for now. Thanks for reading, and I'll see you then!
