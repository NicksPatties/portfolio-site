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

# What's this site for?

I'd like to use this blog as a platform to share my findings and projects. It's an opportunity for me to demonstrate my abilities, and improve my understanding of my own work. Perhaps we can learn together!

To start, let's talk about my portfolio site, and my process of getting to the point where I am at today. Every idea starts somewhere. Perhaps it's a problem that needs to be solved, or something creative that is yet to be explored.

## What am I trying to solve?

This project in particular came from some friction that I've experienced while searching for employment.

- I'm on phone calls answering the same questions about my experience on a regular basis.
- I only want one place where I need to update my resume and project details (or at the very least, have it be a single source of truth across all recruitment sites)
- It's easier to demonstrate how things work in some cases if you can read about it.
  - My expectation for recruiters to use my technology is low.

So, I want this site to be a place where my content is easy to find, easy to read, and easy for me to show off. With this in mind, I lay out my requirements.

- I need to make it easy for me to write content for my site
- I need to reduce as much friction as possible to read my content

So what can I use to make this happen?

# Hugo

At first, I thought Hugo was a good choice. I was introduced to Hugo's CLI, which offered the ability to create content, or deploy my site with single commands. The development server was also very snappy.

I went to work on my home page, and came up with this:

[Picture of Hugo site]()

This didn't require a lot of knowledge about collections and such just yet. The plan was to add the contents manually first, and then define the collections for projects and work experience later, then use the contents of those items to populate this home page.

Of course, this was the start. I wanted to familiarize myself with templating to write pages for different collections.

Context was confusing. Defining collections was a pain. Finding the right thing to access in my template was a pain. It kinda reminded me of `erb` templates in Ruby on Rails, so I was interested in trying it out. But, trying to find what information I actually wanted to have in my page was confusing.

For instance, `.` represents the current context in your template. But what is the current context? How do I find that information in the documentation to understand how to do things. When I'm looking back and forth between the documentation and my template, it's difficult to know what `.` actually is.

I found myself having to re-learn stuff that I already knew when writing JSX, including how to create multiple collections in a loop, conditionally display things, and so on.

I was starting to get frustrated with my declining output, and after some time away from the project, I started exploring some other options.

Oh, styles with git submodules? That's a pretty cool idea, until you realize it's tough to figure out which submodule is a dependency for the page you're trying to check out. I made a small fix to an Ardour documentation page, and it took me a couple of minutes to figure out why I can't

Passing variables into fragment functions was also strange. It was weird that I had to define variables to pass into functions, and the functions didn't wrap their parameters in parentheses. This was inconsistent with the `go` I was used to when developing Sweet.

## Pros

1. Markdown support

- I was able to write my posts with Markdown, which is easy to use

2. Easy to use CLI

## Cons

1. Unexpected templating conventions

- I should've read more information about the [text/template Go package](https://pkg.go.dev/text/template) before hopping in. This would've given me the basics before trying to get more complicated.

2. Using git submodules for themes

- I don't prefer this way of including themes in my project.

Perhaps it was time to look for something better.

While there are many sites that utilize Hugo effectively, I was not experiencing any joy using it.

# Something better?

I explored some different options and configurations that I could explore.

I knew for certain I wanted to use a static site generator. This offered more flexibility for which server technology wanted to accompany my site by building a directory with just my HTML and CSS, while allowing me to use other templating technologies to simplify writing out my layouts.

## Hexo

It's very clear where the inspiration of this tool comes from. This package acts like a NodeJS version of hugo. Since I was already not fond of hugo, I decided to leave this be.

## NextJS

This seemed like it ticked all the boxes, but it gave me a creepy crawly feeling that it was so intertwined with another product, Vercel.

Also, only supported React templates for components instead of Svelte and Vue components, which I found very interesting.

Also unclear whether JS was included in the client code or not.

## Astro

No client JS by default, which is great!

Support for multiple component platforms. I can make Vue, React, and Svelte components, which is also great!

The onboarding process was nice. The tutorial is interactive and fun to get started.

The themes were a good starting point for this blog. This started from the original blog template, but I added some additional features

This was my final choice!

# Starting from scratch

I started from the blog template and went from there. I did this for a few reasons:

- Accessibility built out of the box
- Already had a blog data type defined
- Already had basic layouts for a blog page

However, there were some things I wanted to add

- Support for a dark mode, and a better color theme in general
- Ensure that there was supp
