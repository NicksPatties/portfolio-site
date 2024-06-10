---
title: "Limp Bizkit Scraper"
description: "Can I figure out which songs I should practice to be the most prepared for a concert?"
startDate: "2024-06-06PDT"
pubDate: "2024-06-06PDT" # Don't forget the timezone code at the end!
published: false
tags:
  - "typescript"
  - "playwright"
  - "nodejs"
  - "cli"
---

Limp Bizkit has invited fans on stage in the past to perform with them. It's a once-in-a-lifetime opportunity that sounds fucking cool. Fans have rapped, played guitar, and even formed entire bands.

What is the likelihood that Limp Bizkit will invite us on stage to play a song? Which songs should we play that will give us the greatest chance of being picked? These are questions that can be answered when we have access to data.

Fortunately, there's a resource that is a kind of wikipedia for live music called Setlist.fm. This will have the data we need to figure this out. Plus, due to Limp Bizkit's popularity, performances can be corroborated with video evidence from YouTube, Instagram, or other platforms.

To obtain this data automatically, we can use playwright to automatically browse and select those elements. We'll then save the output to a file, and then use some command line applications to organize and understand the data.

You can see the repository [here](https://github.com/NicksPatties/lb-scraper)

# The data source

This is the [Limp Bizkit page](https://www.setlist.fm/setlists/limp-bizkit-33d69c2d.html) that we will take our data from.

To access this data, we use playwright to connect to our page.

# Obtaining data

We first need to create the files we want to write to,

Then once we get to the correct location

# Undertstanding the data

I can use `sort` to verify that there are no duplicate rows. `sort -u data.tsv` This removes duplicate rows.

# Some problems

## Encores?

Encores are not covered because they would accidentally get filtered by `sort -u`.

# Improvements

Here are some ways I want to improve this code.

## Caching

I don't want to scrape things that I've already scraped.

- I don't want to scrape data that I've already scraped. I have a few ways that I can handle this.
  - Create a start page variable that starts the scraping from a given location
  - Check the page title to see if it matches stuff that's already been written
- Is there an even faster way to get the data? Do I even need to use Playwright to get what I want?
  - If I can find the details I'm looking for by reading strings and some clever regex, then perhaps I can speed up the scraping of my application
  - It also took up a **lot** of my resources!
  - Perhaps try and use `curl` and see what that's like?
    - Perhaps another tool like [html-xml-utils](https://www.w3.org/Tools/HTML-XML-utils/README)
    - Perhaps a tool like [pup](https://github.com/ericchiang/pup) can help parse my HTML too
  - As of now, the scraper takes a looooooong time to accomplish.
- Maybe I should save this stuff in a database?
  - Perhaps I can query things much easier if I use a database
  - There are a lot of duplicate entries in my `tsv` that correspond to the show that LB performed in. Is this the case where I can have some foreign key relationship going on?
- I need to create some cool graphs for this data.
  - d3 can help me out here 👍
- I should've tracked how long this scraping takes...
  - I can do this in the script. It doesn't have to be super accurate since the process takes way longer than a few minutes.
  - I stopped it partway through, since it took _that_ long.
