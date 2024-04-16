---
title: "Welcome to the new site!"
description: "An introduciton to my new portfolio, and my path to pick the right technologies for me."
pubDate: "2024-04-11"
# optional, assumes image is in the `public` folder
heroImage: ""
# optional, set this to true if you want it on the site
published: true
---

Hello, and thanks for visiting! This marks this site's first, official blog post.

I'd like to use this blog as a platform to share my software development process. It's an opportunity for me to show my abilities, and solidify my understanding of my own work. Perhaps, over time, we can learn together!

Let's first talk about this website, and how it grew to what it is today.

# What's the goal?

This project is a response to some friction that I've experienced while searching for employment:

- I'm on phone calls answering the same questions about my experience on a regular basis. Having a place where I can showcase my work is a way to do this.
- I don't want to spread my updates about projects on multiple sites inadvertently.
- I want to show what my projects do in an accessible way. Just having `README`s in code repositories may be enough for software developers, but not to people outside of tech.

So, I want this site to be a place where my content is easy to find, easy to read, and easy for me to show off. With this in mind, I lay out my requirements.

## Requirements

- [ ] I need to make it **easy for me to write content** for my site
- [ ] I need to make it **easy to read my content**
- [ ] I need to make it **easy for me share my site** to others

Is there a tool out there that can make it really easy for me to build my own site and handle all of my content?

# Static Site Generators

Static Site Generators (SSGs) make this very easy! These programs take a text files and some templates as input, and smash them together to create a collection of web pages. Once these web pages are built, they can be uploaded to a server, and thus, a website for all to see.

Typically, SSGs support [Markdown](https://en.wikipedia.org/wiki/Markdown) text files, which are easy to read and write. I can write my files in any text editor I want, and I don't have to write complex HTML tags to format text.

- [x] Easy for me to write content (done!)

Once these web pages are built, they can then be deployed to a web server for everyone to see. The quickest approach, I concluded, was to use an SSG to create my site, then deploy those assets to something like [GitHub Pages](https://pages.github.com/).

[Jamstack.org's site generator list](https://jamstack.org/generators/) was a great resource for finding SSGs to try. After some perusing, I found my first option.

# Hugo

As someone who usually writes JavaScript on a daily basis, it may seem like an odd choice to pick [Hugo](https://gohugo.io/), an SSG powered by Go, instead. I had my reasons:

- I just finished creating CLI with Go, and was having fun with the language. Naturally, I wanted to see if I could use this in a web based project.
- According to [Hugo's showcase](https://gohugo.io/showcase/), it can handle mountains worth of content and build a site in milliseconds.

After a while, I created this:

<img alt="Picture of the original site" src="/welcome-to-my-site/nickspatties-site-hugo-before.png"/>

- I wrote some content for my projects and iterated through my contents
- I created the home page layout
- I wrote the CSS for the site
- I wrote some partials to act as "components" to make life a little easier
- I didn't use a theme

Once I got to this point, I had some thoughts.

## My impression of Hugo

Although my experience probably would've improved by adding a theme to my project, I wanted closer proximity to the CSS I was editing than having it only be modified in a configuration file, or writing other CSS files to override the ones from the theme. I wanted to manage one git repository, not two.

Context was confusing. Defining collections was a pain. Finding the right thing to access in my template was a pain. It kinda reminded me of `erb` templates in Ruby on Rails, so I was interested in trying it out. But, trying to find what information I actually wanted to have in my page was confusing.

For instance, `.` represents the current context in your template. But what is the current context? How do I find that information in the documentation to understand how to do things. When I'm looking back and forth between the documentation and my template, it's difficult to know what `.` actually is.

Passing variables into fragment functions was also strange. It was weird that I had to define variables to pass into functions, and the functions didn't wrap their parameters in parentheses. This was inconsistent with the `go` I was used to when developing Sweet.

I found myself having to re-learn stuff that I already knew when writing JSX, including how to create multiple collections in a loop, conditionally display things, and so on.

I was starting to get frustrated with my declining output.

## Pros

1. Markdown support

- I was able to write my posts with Markdown, which is easy to use

2. Easy to use CLI

## Cons

1. Unexpected templating conventions

- I should've read more information about the [text/template Go package](https://pkg.go.dev/text/template) before hopping in. This would've given me the basics before trying to get more complicated.
- Passing variables into fragment functions did not behave like Go functions at all, which was what I expected.

2. Using git submodules for themes

- Application breaks if you haven't added the submodule in your repository yet. I learned this while making edits to a [documentation site for a digital audio workstation I was using]().
- Difficult to find and edit my CSS if I import my own theme.
- I know CSS better than Hugo's theme components.
- [It's a pain to work with](https://www.nickgracilla.com/posts/master-hugo-modules-managing-themes-as-modules/#working-with-hugo-themes-as-git-submodules-is-a-pain), as others have found.

3. Working with the context (`.`) variable was a hassle

- The context variable `.` represents the context of a given template or document. This may save on typing, but I found myself wondering where to go in the documentation

These hiccups were slowing me down too much. Perhaps it was time to look for something better. Although there are many sites that utilize Hugo effectively, I was not experiencing any joy using it.

# Something better?

After some time away from the project, I explored different SSGs that could improve my productivity.

I knew for certain I wanted to use a static site generator. This offered more flexibility for which server technology wanted to accompany my site by building a directory with just my HTML and CSS, while allowing me to use other templating technologies to simplify writing out my layouts.

After exploring some options, such as Hexo and NextJS, I found something that was pretty appealing.

## Enter Astro

This SSG seemed to check all the boxes.

- Astro does not generate JS by default!
- Nice onboarding process, including interactive tutorials and friendly documentation
- Can create components with HTML, React, Vue, and Svelte components
- Integrations with many Content Management Systems, in case I needed to decouple my content from my portfolio in the future.

There were a couple hiccups, though.

- Auto-formatting is provided by `prettier` by default, which is very slow.

Overall, Astro was a great choice for me!

# Starting from scratch with Astro

I started from the blog template and went from there. I did this for a few reasons:

- Accessibility built out of the box
- Already had a blog data type defined
- Already had basic layouts for a blog page

However, there were some things I wanted to add

- Support for a dark mode, and a better color theme in general
- Ensure the navigation UI worked better for mobile view
- Improved blog card links

## Dark mode support

I wanted this site to closely match the color scheme of my development environment. I figured that would be a fun way to show others how I work.

Currently, I'm using the [Gruvbox color theme](https://github.com/morhetz/gruvbox?tab=readme-ov-file). The dark theme does not produce a lot of light-bleed in the characters when in a dark room, and the light mode does not burn my eyes out.

## Mobile navigation

The default blog theme did not support a good mobile view in the navigation bar very well.

I made some modification to support this.

- Only have the blog and resume links in the nav bar
- Remove any links from the center of the nav
- Change the content of the title on the left side of the page

Now, instead of the nav wrapping terribly, the nav is much better to look at.

## Improved blog cards

When displaying blog content, I preferred a more horizontal layout rather than a vertical layout. Also, I don't want to force myself to have a hero image in each article if I didn't want to.

This concludes the quick overview of my personal site!
