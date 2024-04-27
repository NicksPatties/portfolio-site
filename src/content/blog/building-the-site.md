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
  # - "accessibility"
  # - "web design"
  # - "typescript"
  # - "css"
---

Hello again! This is a continuation of my previous article about picking the technology to power my site. [If you'd like to catch up, read it here.](/blog/welcome-to-the-new-site)

# A quick review

To review, the goals I had on my website were **to share my knowledge**, and **to share my projects**. To do so, I need to make sure my site is **easy to write**, **easy to read**, and **easy to share**.

[I found that Astro was a good tool for the building my site](https://astro.build/), so today, I'll share some technical and design consideration I picked it to help me build my site and manage my content.

# Building a template

There's no need to re-do work that has already been done, so to speed up development, I started this project by starting from a template. The Astro command line setup wizard made this easy.

## The Astro CLI

Using this tool, I was able to configure a project with little trouble. [I followed the instructions here.](https://docs.astro.build/en/install/auto/)

Since I'm using pnpm as my package manager, I used the following command in my terminal to start the setup.

```sh
pnpm create astro@latest
```

Following the prompts, I selected these options for building my project:

- _How would you like to start your new project?_
  - I selected the "Use blog template" option. This worked great for me since, well, I was creating a blog!
  - [Here's the repository for Astro's starter blog template.](https://github.com/withastro/astro/tree/main/examples/blog)
- _Do you plan to write TypeScript?_
  - I selected "Yes." I enjoy having type hints in my code editor to verify the objects I'm working with are exactly as I expect.
- _How strict should TypeScript be?_
  - I chose the recommended "strict" option. While having the most strict option keeps me from going off the rails, I don't really need to enforce those rules yet. If I change my mind, I can always add them back into my TypeScript configuration file later.
  - [In Astro's documentation, they link to the TypeScript configuration they use when building a new project.](https://docs.astro.build/en/guides/typescript/#setup)

The next steps asked if I wanted to install my project's dependencies and initialize git. I said "Yes" to both prompts. I was going to do those steps myself anyway, so it's nice for the Astro CLI to take care of that for me.

After some waiting, everything was built and ready to go. I even got a fun message from Houston, Astro's mascot, wishing me luck in my development!

![Astro's mascot, Houston, wishing me luck on my project](/src/assets/blog/building-the-site/houston.png)

## The initial site

I navigated to my new project directory and started the development server to see what Astro generated for me:

```sh
cd my-astro-blog
pnpm run dev
```

And what I got was this:

![The initial blog template's home page](/src/assets/blog/building-the-site/initial-blog-template.png)

For a starting template, this is pretty good! It contains a home page, some sample blog posts, and some images. It was a good collection of files that you likely find in a website.

Although I haven't written any content yet, this is enough to get started on the next step: building and deploying the website.

# Automating deployments

I wanted to automatically build and deploy my site whenever I make changes to the codebase. Configuring this as soon as possible saves me time, making it **easy to share** my updates. To make this very simple, I'm deploying my website to GitHub Pages.

[Again, Astro's documentation made this process very straightforward.](https://docs.astro.build/en/guides/deploy/github/) In the `deploy.yml` file, you can see the process is split into two jobs: building the project, and deploying the code to GitHub Pages. These steps run whenever I push a change to my `main` branch.

## Gotcha: colliding deployments

I decided to re-name this file at one point, but accidentally forgot to remove a previous version of the file. Because I did this, I accidentally triggered multiple deployments whenever I pushed code to the main branch. This is wasteful, and also leads to confusing build output.

[Consider this commit I made here.](https://github.com/NicksPatties/portfolio-site/commit/acb2c5ac21d1e026b6383e234ffd52ea82ad8338) If you click on the build status icon next to the commit message, you'll see that there were more build steps that were executed than expected. They're highlighted in red in the image below.

![Accidental duplicate deployment steps highlighted in red](/src/assets/blog/building-the-site/confusing-deployments.png)

Which jobs are the ones I actually care about? It's difficult to say, but removing the duplicate files made things easier to manage.

Now that my deployments were taken care of, I began building off the blog template.

# Things to change

Although, as you can see in the image above, the original blog template is not bad. However, there were some things I wanted to add to improve it.

## More accessibility

The Google Lighthouse rating for the base blog is 100. However, there are things Lighthouse cannot detect. There are still a few accessibility improvements I wanted to make with the site.

### Keyboard navigation

For one, I want to allow me to **navigate with my keyboard**. This will make it easier for those with limited vision, and anyone who doesn't want to use a mouse (including me) to navigate through the website easier.

I added some buttons in the nav bar to navigate the user to the content. You see these "Skip to content" buttons on different sites, like GitHub, or other blog sites.

### Better screen reader support

Also, I just want to verify that **screen readers work effectively**. While working on the application, I double-checked my pages by using a screen reader to navigate through the pages.

Primarily, I needed to make sure my links had the appropriate `aira-label`s, so screen readers would pronounce them correctly.

The biggest catch was my navigation link to the Resume page. Here it is highlighted below:

![Picture of my navigation link to the resume page](/src/assets/blog/building-the-site/resume-nav-link.png)

Although "Resume" is a valid spelling of the word, screen readers would pronounce the link "resume," as in "begin" or "start again."

### Dark mode support

There's also no **dark mode support** in the old theme, so I should add that into my site! Even though I don't have any JavaScript enabled to trigger a change in the theme through a button:

This was handled primarily with the CSS. I assigned variables to the colors that were present on the page. Once that was finished, I could modify the colors of the site quickly and easily.

The `prefers light-color-scheme` media query helped with this. I just assigned new values to the variables inside this block. If a user preferred a light theme, then the site would show the colors. If not, then a darker theme would show.

[Image for dark mode]()

It also includes a light mode, which I also like.

[Image for light mode]()

I have two great color themes right now, but in its current state, my site cannot show both of them. To enable this,

#### Code sample colors

Code samples on the default site were, for some reason, the inverse of what I expect. Take a look.

[Image of the old version of the code sample]()

When I'm reading a page with a light theme, I don't want the code samples to disappear in the background. Likewise, if I change themes to dark, I don't want to be flash-banged by a code block.

I swapped to using the Prism plugin for this, so I have more control of what kind of text I'm rendering.

Because I assigned my colors to variables that change based on the theme, assigning the variables was really easy. I copied a Prism css file and assigned the variables to the ones I defined earlier.

Assigning my colors to variables made it very easy to make changes that were reflected on the site. Also, adding new components can use these colors to theme these pieces really easy. Doing so also paved the way for new features, such as different color themes.

New tasks become less daunting for me when I make things easy for me.

With these changes, I aimed to make the reading experience as comfortable and easy as possible for readers with different needs. There was more to improve, though.

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
