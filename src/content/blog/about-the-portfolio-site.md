---
title: "Welcome to the new site!"
description: "An introduciton to my new portfolio, and the technology that powers it."
pubDate: "2024-04-11"
# optional, assumes image is in the `public` folder
heroImage: ""
published: true
---

Hello, and thanks for visiting! This marks this site's first, official blog post.

I'd like to use this blog as a platform to share my software development process. It's an opportunity for me to show my abilities, and solidify my understanding of my own work. Perhaps, over time, we can learn together!

To start, let's talk about this website, my purpose for making it, and what it's made of.

# Goals

I've thought about some things that make a good technical blog. This site should make it easy for me to do the following things.

## To share my knowledge

- Make it easy for me to write and update things

I want to just write the article, but not have to worry about anything else.

- Make it easy to read the content

This is primarily accomplished with easy design and accessibility

- Make it easy to deploy my changes to the wider internet

I just like automation. I don't want to have to keep doing the same thing over and over again. Doing so will make me hate the process of writing, which I want to avoid.

## To share my projects

- Demonstrate to others my abilities

I want people to understand I know what I'm talking about, but that I'm willing to learn more. (This is the part that separates me from the others)

- Share my intent for these projects

I can ask other people to check out my site, go to events in person and have them look. At any point, my projects may be in a state that is not easy to use.

- Show off the things I like to create

I want to share what I've made, but also share my intent for projects that I'm currently making

So, I want this site to be a place where my content is easy to find, easy to read, and easy for me to show off. With this in mind, I lay out my requirements.

## Requirements

### Easy to write

I'm not the fastest writer, so something that makes it really easy for me to write articles with as little friction as possible is a great help.

Things that I need to configure, modify, and move each time I create a new article distracts me from the goal of writing articles. The more streamlined the process, the better.

I'll know I've done a good job if **writing an article takes about two days to complete at most**. Note this is not two whole days, but if I spend an hour or two for a couple of days, then I should be ready to publish something.

### Easy to read

There's no point in having a lot of content to share if it's difficult to read.

Using my site needs to be a pleasant experience. It needs to be **fast to load**, and **support all screen sizes**. It also needs to be accessible: **screen reader support** and **keyboard navigation** should work on my site.

### Easy to share

Sharing a link to this site (or any site, really) is straightforward: copy the link and send it. This comes with the web.

But, if I post a link from this site elsewhere, such as a social media site or messaging app, I want to **show rich content** to the recipient, to show off what this site is all about!

# How?

With these requirements laid out, is there a tool out there that can make it really easy for me to build my own site and handle all of my content? Enter...

## Static Site Generators

Static Site Generators (SSGs) make this very easy! These programs take a text files and some templates as input, and smash them together to create a collection of web pages. Once these web pages are built, they can be uploaded to a server, and thus, a website for all to see.

Typically, SSGs support [Markdown](https://en.wikipedia.org/wiki/Markdown) text files, which are easy to read and write. I can write my files in any text editor I want, and I don't have to write complex HTML tags to format text.

- Easy for me to write content (done!)

Once these web pages are built, they can then be deployed to a web server for everyone to see. The quickest approach, I concluded, was to use an SSG to create my site, then deploy those assets to something like [GitHub Pages](https://pages.github.com/).

[Jamstack.org's site generator list](https://jamstack.org/generators/) was a great resource for finding SSGs to try. After some perusing, I found my first option.

## Enter Astro

This SSG seemed to check all the boxes.

- Astro does not generate JS by default!
- Nice onboarding process, including interactive tutorials and friendly documentation
- Can create components with HTML, React, Vue, and Svelte components
- Integrations with many Content Management Systems, in case I needed to decouple my content from my portfolio in the future.

There were a couple hiccups, though.

- Auto-formatting is provided by `prettier` by default, which is very slow.

Overall, Astro was a great choice for me!

# Building the site

I started from the blog template and went from there. I did this for a few reasons:

- Accessibility built out of the box
- Already had a blog data type defined
- Already had basic layouts for a blog page

_Talk about how I built the site with the blog template. Include commands._

However, there were some things I wanted to add

## Adding new features

Here are some things I added to make the site my own.

### Changing the theme

[Image of before the color change]()

I wanted this site to closely match the color scheme of my development environment. I figured that would be a fun way to show others how I work.

Here's what I did

- Create css variables for all the colors in the site
- Assigned the color variables to different values based on whether the user prefers light mode

[Image of after the color change]()

Currently, I'm using the [Gruvbox color theme](https://github.com/morhetz/gruvbox?tab=readme-ov-file). The dark theme does not produce a lot of light-bleed in the characters when in a dark room, and the light mode does not burn my eyes out.

[Image of after the color change light mode]()

I added a light mode, too, if that's what users prefer. I enjoy light themes with a sepia tone in the background, which does a great job of reducing strain on my eyes.

### Code syntax highlighting

Code syntax highlighting was also a thought. In the default theme, the code blocks were dark, but I did not want that to be the case. If the user wants to look at a light screen, they should get what they want. Likewise, if the user wants a dark screen, then the code blocks should not blast their eyes with light.

I took care of this by using the built-in "prism" syntax highlighting option. This allowed me to style my code with CSS in an easier way.

### Mobile navigation

These improvements not only apply to mobile devices, but also support screen zoom of up to 500%.

The default blog theme did not support a good mobile view in the navigation bar very well.

[Image of mobile navigation on original Astro blog template]()

I made some modification to support this.

- Only have the blog and resume links in the nav bar
- Remove any links from the center of the nav
- Change the content of the title on the left side of the page

Now, instead of the nav wrapping terribly, the nav is much better to look at.

[Image of current navigation]()

Plus, if the screen is skinnier, I just shorten the title of the site

[Image of current navigation but skinnier]()

### Improved blog cards

When displaying blog content, I preferred a more horizontal layout rather than a vertical layout. Also, I don't want to force myself to have a hero image in each article if I didn't want to.

### Updated meta tags

Meta tags are read by other sites to create cards that make it easy to display what you're doing on other sites. By posting them on their page.

Most of these tags were provided for me, but I also wanted to check

## Next steps

- Internationalization would be a great way to expand the audience of this site. The knowledge that is presented should not be restricted by language.
- Monitoring access metrics
  - This will prevent me from needing to look at information from social media sites to get a sense for how many people are reading my articles.
- Automatically sharing posts on different platforms
  - I would love to post these articles on my accounts for social media, and I'm sure I can figure out how to do that

# Conclusion

With this, I've satisfied my requirements.

- I can write articles really easily with Markdown
- I made my content easy to read with the improvements I made to the base blog theme
- I made it easy to share my site with the content

This concludes the quick overview of my personal site! If you'd like to follow along with its development, or explore the code, you may find it here in [the GitHub repository]().
