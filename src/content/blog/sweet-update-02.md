---
title: "Sweet Update 02"
description: "New features have been added to sweet's results screen, including a words per minute graph!"
startDate: "2024-10-29PDT"
pubDate: "2024-10-29PDT"
published: true
heroImage: "/blog/sweet-update-02/cover.png"
project: "sweet"
tags:
  - "go"
  - "bash"
---

Although I've been slacking in keeping this blog up to date, there have been five releases to `sweet` since [my previous post](/blog/sweet-sprint-01). Let's take a look at some highlights!

# Improvements to the results screen

Let's use this screenshot below to talk about some of the new features to the results screen in `sweet`.

![The results of an exercise, including words per minute, uncorrected errors, mistakes, duration, and a graph](@assets/blog/sweet-update-02/wpm-graph.png)

## Words per minute graph!

Once an exercise is complete, you can visually see your typing ability throughout the course of an exercise! In this example, I started pretty slowly, but then picked up speed after about 10 seconds.

You'll notice two lines laid on top of each other in this graph. The top line is the average words per minute throughout the exercise. The bottom is the raw words per minute (that is, words per minute without a penalty for incorrect characters) recorded at each second. While the top line gives a general trend to typing ability, the bottom line provides more granular detail about typing ability.

`sweet` uses [the Go implementation of the asciigraph package](https://github.com/guptarohit/asciigraph) to create the graph.

## Most missed keys

Notice the `most missed keys` section, between the accuracy and graph sections. This shows the top three missed keys while typing your exercise. Like the raw words per minute graph, this information can also inform what keys need the most practice, if there are keys that need additional effort.

This covers the majority of the new features that have been added. This next section discusses some behind-the-scenes changes I made to make the development experience of `sweet` as painless as possible. If you just like to skip it, then [click here](#whats-next).

# DevEx improvements

## Created a `release` script

I wrote a release script that automates the following things:
- obtains the latest version tag from the repo
- builds the `sweet` executables and their keys for macOS, Windows, and Linux platforms
- creates a release on GitHub
- updates sweet's Go package site

Now releasing new versions of `sweet` is way less painful! Expect more frequent releases going forward! 

## New issue templates, and working with `gh`

I created templates for bugs and feature requests for simple issue creation. I also created some labels to organize the work that needs to be done next.

However, what's really exciting to me is the recent discovery of the GitHub CLI, or `gh` for short. This tool has made it easy to quickly create new issues, development branches, and pull requests. If you're using GitHub as your project's repository, I recommend checking out the [GitHub CLI here](https://github.com/cli/cli).

Once I discover new issues with `sweet`, I can quickly record them to the project so they won't be forgotten.

# What's next?

There are some things I'd like to work on next time. In fact, you can [take a look at these specific issues](https://github.com/NicksPatties/sweet/issues?q=is%3Aopen+is%3Aissue+label%3A%22p1+-+high%22) for details. In short, I would like to:
- create a keymap to show what keys need to be typed

I find it really helpful to see which fingers I should use to press specific keys. Sometimes, I notice I delay my next keypress because I'm unfamiliar with the next key's location, and whether it requires holding the `Shift` key. This visual aide should improve my typing.

- improve `sweet`'s documentation

When I introduced the tool to other programmers, I noticed some blockers they encountered when using the tool. To dispel any confusion, it should be clear what `sweet` can do, and what how it can be done.

# Conclusion

If you'd like to try out `sweet` for yourself, check out these [installation instructions](https://github.com/NicksPatties/sweet?tab=readme-ov-file#installation). If you have any issues, you can either submit them in the [project's issues page](https://github.com/NicksPatties/sweet/issues), or [send me an email](mailto:nickspatties@proton.me?subject=Sweet%20Issue%3A%20%3CYour%20issue%20title%20here%3E&body=Sweet%20version%3A%20%3Csweet%20version%3E%0D%0ADetails%3A%20%3Cadd%20details%20here%3E). See you next time!
