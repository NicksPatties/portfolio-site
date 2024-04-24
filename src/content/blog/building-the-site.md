---
title: "Building the site"
description: "I share how I enhanced my site from a template to the site you see now!"
# watch out date is in standard time shows up wrong fix it
pubDate: "2024-04-26PDT"
# optional, assumes image is in the `public` folder
heroImage: ""
published: true
tags:
  - "astro"
  # TODO add more tags as relevant
---

Hello again! This is a continuation of my previous article about picking the technology to power my site. If you'd like to catch up, [read it here.](/blog/welcome-to-the-new-site)

# A quick review

To review, the goals I had on my website were:

- To share my knowledge
- To share my projects

And to do so, I need to make sure my site is:

- Easy to write
- Easy to read
- Easy to share

I found that Astro was a good choice for my project, so I picked that tool to help me build my site and manage my content.

Today, I'll share the technical details about using Astro.

# Getting the template

I started with the blog template from Astro. Building it was easy.

## Using the astro CLI

The Astro command line tool is nice and easy. I was able to configure a project with little trouble.
[Gif of running the astro command]()

I selected the following options for my template

- typescript
  - I wanted typescript support to make sure my collections and properties were correct.
  - I like having hints in my editor tell me what I'm working with. It helps a lot!
- theme
  - This theme is right here [The source code for the theme is here.]()

_Fill out the rest of this section_

Once finished, I ran the astro command to build the repo, and I was good to go. Here's a link to the [blog template I used](https://github.com/withastro/astro/tree/main/examples/blog).

# Automating deployments

Now that I had a page that was ready to view, I wanted to work on automatically deploying my site. I like to do this step as soon as possible, so I don't have to worry about it later. I find it easier to manage deployments like this when your resources are small, so if there are any issues, then there's less to work with and try to fix.

You can see a copy of the deployment template here, but in short, it does the following things:

- thing 1
- thing 2
- thing 3

This makes things very easy to update and share new content. I search for ways to get my product in the hands of customers as soon as possible, even if it's not done. Automating deployments like this makes this process super easy.

## Gotcha: multiple deployments

I decided to re-name my file at one point, but accidentally forgot to remove a previous version of the file.

If you accidentally do the same thing, you may trigger multiple deployments when you commit your changes to your repository. This can make build output confusing to follow.

[Image to a deployment to see what that looks like]()

# Things to change

At the start, it looked pretty good. The fonts and the layout are nice. Here's what the basic theme look like.

[Image of the site before any changes]()

However, there were some things I wanted to fix. Here are some things I did to plus-one the initial theme.

## Improve accessibility controls

The Google Lighthouse rating for the base blog is 100. However, there are things Lighthouse cannot detect. There are still a few accessibility improvements I wanted to make with the site.

### Keyboard navigation

For one, I want to allow me to **navigate with my keyboard**. This will make it easier for those with limited vision, and anyone who doesn't want to use a mouse (including me) to navigate through the website easier.

I added some buttons in the nav bar to navigate the user to the content. You see these "Skip to content" buttons on different sites, like GitHub, or other blog sites.

### Screen reader improvements

Also, I just want to verify that **screen readers work effectively**. While working on the application, I double-checked my pages by using a screen reader to navigate through the pages.

Primarily, I needed to make sure my links had the appropriate `aira-label`s, so screen readers would pronounce them correctly.

The biggest catch was my navigation link to the Resume page. Although "resume" is a valid spelling of the word, screen readers would pronounce the link "resume," as in "begin" or "start again."

## Improved colors and theming

### Gruvbox: My theme of choice

The base theme is ok, but it doesn't convey my personality enough. I'd like something that **shows off my personality.**

The color theme was easy to set up. I created a file that contained all the color variables for the project, and included it into the BaseHead component. The color theme I decided to pick was Gruvbox; I've been using it in my development environment for a while, and it was complimentary to the burger motif I was going to bring in the home page.

[Image for dark mode]()

It also includes a light mode, which I also like.

[Image for light mode]()

I have two great color themes right now, but in its current state, my site cannot show both of them. To enable this,

### Dark mode support

There's also no **dark mode support** in the old theme, so I should add that into my site! Even though I don't have any JavaScript enabled to trigger a change in the theme through a button:

This was handled primarily with the CSS. I assigned variables to

The `prefers light-color-scheme` media query helped with this. I just assigned new values to the variables inside this block.

#### Code samples

Code samples on the default site were, for some reason, the inverse of what I expect. When I'm reading a page with a light theme, I don't want the code samples to disappear in the background. Likewise, if I change themes to dark, I don't want to be flash-banged by a code block.

I swapped to using the Prism plugin for this, so I have more control of what kind of text I'm rendering.

Because I assigned my colors to variables that change based on the theme, assigning the variables was really easy. I copied a Prism css file and assigned the variables to the ones I defined earlier.

Assigning my colors to variables made it very easy to make changes that were reflected on the site. Also, adding new components can use these colors to theme these pieces really easy. Doing so also paved the way for new features, such as different color themes.

New tasks become less daunting for me when I make things easy for me.

## Improved components

Some of the components that were present in the site didn't work for me. Also, sometimes they just didn't work in general.

### The `Hero` component

Here's what the original blog page looks like.

[Image of original blog theme]()

The first thing you see is this? Nah, let's make this more fun.

This is the first thing a visitor sees when they open my website. I wanted to decorate it with a fun image, and some memorable font.

Additionally, I wanted this component to work on smaller screens as well. The design is a little different for smaller screens; I wanted the text to be centered rather than the dramatic offset alignment. On smaller screens, the offset looks unintentional and unsettling rather than dynamic and fun.

To enable this, I used CSS media queries to modify the layout of the background image and text.

The burger image is absolutely positioned, which means I'm in charge of where it should go relative to the parent container defined with `position: relative`. This creates a new stacking context, which means the css properties `top`, `bottom`, `left`, and `right` are relative to the element rather than the entire document. So, `top: 0` and `right:0` means "move this element's top and right sides to the upper right corner of this parent container."

I did this instead of creating a background in the hero component, because it was easier for me to position and rotate the burger exactly where I wanted.

### The `Card` component

_This can be a section where I talk about design rules, and designs that work on both desktop and mobile devices, and handling focus styles._

These card components were designed to show off some cool stuff in a blog post. However, if I don't supply an image, then the Card breaks.

[Image of card with image and without image]()

To make writing blogs easier for me, I don't want to require myself to have an image in my blog post. Also, I want the title of the blog, and some of its content to draw more attention. To satisfy these requirements, a horizontal layout works better for me.

Here's what I did...

_Show some code examples_

# That's it for now!

Although the default theme was a good starting point, I made some modifications to improve my site's functionality and design. I didn't cover everything in exhaustive detail, but I talked about making mobile-friendly layouts, and improving its accessibility.

I think the changes make the site easier to read, but what do you think? Do these layouts make it easy to find and read my posts on your browser of choice? I'm happy to hear your thoughts!
