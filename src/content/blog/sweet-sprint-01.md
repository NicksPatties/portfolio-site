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

## Why `sweet`?

Why make this application anyway? Aside from wanting to learn a new language and writing applications for the command line, I wanted to start a touch typing exercise *as quickly as possible* once I got into my terminal. I didn't want to open a web browser to get my reps in.

If you're interested in practicing your typing, I hope you give `sweet` a try, and that it helps you improve!

# Fixes

## Improve argument handling

Previously, I attempted to roll my own solution for handling sub commands and arguments. Writing help messages for each command, and distinguishing between subcommands and flags quickly got out of hand, resulting in incorrect behavior.

To that end, I decided to hand that responsibility to the [Cobra package](https://github.com/spf13/cobra). This simplified my development by allowing me to focus on subcommands and their individual behaviors instead of argument parsing.

# Updates

To that end, I created some new commands, and improved the touch typing game with some new features!

## New commands: `about` and `version`

These commands are useful for displaying information about the program (In truth, these commands were used as a test to understand how Cobra worked). They share some details about `sweet` and its version number, respectively.

## Better exercise inputs

Previously, `sweet` would read files from an exercise folder in a configuration directory, located in `$HOME/.sweet/exercises`. If the file was not located in that directory, then that exercise would not be added in the rotation. Selecting an individual file to practice was also very cumbersome.

I decided to redo how exercises were read into the application, which in turn, made it easier to support different use cases. As of `v0.1.0` of `sweet`, you can do the following things:

### Select a random exercise

This is the same behavior as before, but `sweet` will look for files in `$HOME/.config/sweet/exercises` by default instead of `$HOME/.sweet/exercises`.

![Random exercise](@assets/blog/sweet-sprint-01/new-behavior-default.gif)

### Random exercise from a different directory

If you would like to select a random exercise from a different directory, you can change the `SWEET_EXERCISES_DIR` to a new path!

![Change root directory](@assets/blog/sweet-sprint-01/new-behavior-select-with-env-variable.gif)

### Selecting an exercise from a file

You can now practice any file you'd like with `sweet`! Since some files are pretty large, use the `-s` and `-e` flags to select a start and an end number to practice!

![Select a file from start to end](@assets/blog/sweet-sprint-01/new-behavior-start-and-end-lines.gif)

### Selecting an exercise from STDIN

Pipe output to `sweet` and use the `-` filename to perform an exercise from anywhere you'd like! You can use the `-s` and `-e` flags as well!

![Exercise from stdin](@assets/blog/sweet-sprint-01/new-behavior-select-via-pipe.gif)

# What's next?

In the next sprint, I would like to work on the following things:
- Writing tests and locking in exercise behavior
- Displaying stats plot at the end of an exercise
- Saving exercises (but would like feedback)

And that's it for the update! If you'd like to try out `sweet` for yourself, check out the [releases page](https://github.com/NicksPatties/sweet/releases) to download a copy yourself. If you have any issues, you can either submit them in the [project's issues page](https://github.com/NicksPatties/sweet/issues), or [send me an email](mailto:nickspatties@proton.me?subject=Sweet%20Issue%3A%20%3CYour%20issue%20title%20here%3E&body=Sweet%20version%3A%20%3Csweet%20version%3E%0D%0ADetails%3A%20%3Cadd%20details%20here%3E).
