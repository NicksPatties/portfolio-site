---
title: "Sweet Sprint Update 01"
description: "Time for a do-over. I rewrite argument and file handling for typing exercise selection."
startDate: "2024-10-02PDT"
pubDate: "2024-10-02PDT"
published: true
heroImage: "/blog/sweet-sprint-01/cover.png"
project: "sweet"
tags:
  - "go"
---

In case you didn't know, [sweet](https://github.com/NicksPatties/sweet) is the **S**oft**w**are **E**ngineer's **E**xercise for **T**yping I wrote last year. This is a command line application that's designed to help programmers practice typing. I've been thinking about some new features, and wanted to program in Go some more, so I started working on it again! I'm looking forward to getting this in the hands of programmers and getting some feedback.

In the past two weeks, I made some changes to the project to improve my developer experience, but most importantly, I made improvements to selecting different exercises. Allow me to share what I've done!

# An introduction

Since this may be the first time you've heard of `sweet`, I'll share some quick details about how it works.

Running the command opens a random exercise to practice. Type in the exercise, and once done, your stats appear on the screen, and the program ends.

![Default behavior of sweet](@assets/blog/sweet-sprint-01/original-behavior.gif)

# Fixes

## Improve argument handling

Previously, I attempted to roll my own solution for handling sub commands and arguments. Writing help messages for each command, and distinguishing between subcommands and flags quickly got out of hand, resulting in incorrect behavior.

To that end, I decided to hand that responsibility to the [Cobra package](https://github.com/spf13/cobra). This simplified my development by allowing me to focus on subcommands and their individual behaviors instead of argument parsing.

# Updates

With the time I saved, I created some new commands, and improved the touch typing game with some new features!

## New commands: `about` and `version`

These commands are useful for displaying information about the program (In truth, these commands were used as a test to understand how Cobra worked). They share some details about `sweet` and its version number, respectively.

## Better exercise inputs

Previously, `sweet` would grab an exercise from the `$HOME/.sweet/exercises` directory. However, if there was a specific file you'd like to practice that was not included in that directory, then there was no was to select it. Selecting a file via a pathname was not implemented.

I decided to redo how exercises were read into the application, which in turn, made it easier to support different use cases. As of `v0.1.0` of `sweet`, you can do the following things:

### Select a random exercise

This is the same behavior as before, but `sweet` will look for files in `$HOME/.config/sweet/exercises` by default instead of `$HOME/.sweet/exercises`.

![Random exercise](@assets/blog/sweet-sprint-01/new-behavior-default.gif)

### Random exercise from a different directory

If you would like to select a random exercise from a different directory, you can change the `SWEET_EXERCISES_DIR` to a new path!

![Change root directory](@assets/blog/sweet-sprint-01/new-behavior-select-with-env-variable.gif)

### Selecting an exercise from a file

You can now select any file you'd like with `sweet`! Since some files are pretty large, use the `-s` and `-e` flags to select the start and end of a range of lines to practice.

![Select a file from start to end](@assets/blog/sweet-sprint-01/new-behavior-start-and-end-lines.gif)

### Selecting an exercise from STDIN

Pipe the output of one command into `sweet`, and use the `-` filename to perform an exercise with anything you'd like! You can use the `-s` and `-e` flags as well!

![Exercise from stdin](@assets/blog/sweet-sprint-01/new-behavior-select-via-pipe.gif)

# What's next?

In the next sprint, I would like to work on the following things:

## Finish writing tests

I'd like to lock in the current behavior of my commands so I can be extra confident `sweet`'s behavior is working as intended.

## Add more interesting stats

I would be useful to know what kinds of things to practice to improve. Some stats that I would like to record and display at the end of an exercise include:
- Keys with the most mistakes
- Key combinations that take up the most time
- A plot that displays the average and raw words per minute over time

## Saving exercises

I originally thought it would make saving exercises easier to add a sub-command that handles placing the exercise in the right place for you. For instance, you provide a URL to a text file from a code repository, for instance, and you download the text, and save it into the default `SWEET_EXERCISES_DIR` location.
Would this feature be useful? Would it be more convenient to just use other tools that you're used to, like `curl` and `mv`? Some feedback would be helpful to guide this new feature!

And that's it for the update! If you'd like to try out `sweet` for yourself, check out the [releases page](https://github.com/NicksPatties/sweet/releases) to download a copy yourself. If you have any issues, you can either submit them in the [project's issues page](https://github.com/NicksPatties/sweet/issues), or [send me an email](mailto:nickspatties@proton.me?subject=Sweet%20Issue%3A%20%3CYour%20issue%20title%20here%3E&body=Sweet%20version%3A%20%3Csweet%20version%3E%0D%0ADetails%3A%20%3Cadd%20details%20here%3E). See you next time!
