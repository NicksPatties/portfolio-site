---
title: Sweet
summary: "A touch typing command line application for programmers"
startDate: 2020-01
endDate: 2020-11
tags:
- Command line applications
- Go (Golang)
---

# Sweet
### startDate to endDate
### Platform: PC, macOS, Linux (Command line interface)
### Technologies: JavaScript, Python, Go

Sweet is a **S**oft**w**are **E**ngineer **E**xercise for **T**yping. In other words, it's a touch typing exercise designed specifically for programmers! Instantly begin a typing game to warm yourself up for your day of programming. 

## Motivation

For a while I have been using touch typing applications to improve my typing, especially for programming. I have used a couple of web based tools which helped for a time. However, the time it took to start a new exercise was too long for my liking (yes, 1.6 seconds was not fast enough for me!). Some touch typing games incorrectly showed too many errors, while others were prohibitively covered in advertisements! In short, I wanted to create a touch typing tool of my own that ran on the command line and didn't need an Internet connection to use. Additionally, I wanted to see which technology I would like to use to create command line applications: JavaScript, Python, or Go.

## Actions

First, I defined which features I wanted to implement based on my needs. For instance, competing with others was a lower priority, while listing some statistics at the end of the game was a requirement. I then created some prototypes in JavaScript, Python, and Go, noting the performance benefits, different architecture styles, and overall developer experience in each implementation. In the end, I decided to use Go, thanks to its built-in cross platform support for handling file paths and reading files.

I then created the UI for running exercises. I used the BubbleTea package for listening to user input and reacting accordingly. The ELM architecture made it very straightforward to know what keys (or *kinds* of keys) were pressed, and reminded me of writing an update loop within a game engine. I also used the Lipgloss package, which made declaring different styles of text in the application straightforward, reminding me of declaring CSS classes. In the exercise screen, untyped text, the cursor, and typed text were represented in different colors. Sweet automatically handles newline indenting, to simulate the experience of writing code in an IDE. When the last character is correctly typed, the game ends, the results are shown on screen, and the application closes.

Next, I created some features to make the exercises as configurable as possible. Sweet creates a configuration directory that contains each of the exercise files. When running the `sweet` command, the application takes a random file from that directory, and uses that as the exercise to practice. A user can add any number of files in any format, and it will be included in the pool of exercises to choose. Users can specify which exercise to practice by passing the name of the file as an argument. For instance, `sweet moves.js` runs a game using the `moves.js` file specifically. New files can be added to the directory using Sweet with the `sweet add` command. Passing a filepath into the `add` command will automatically write a copy of that file to the exercises directory.

## Results

First, I built a working knowledge of the Go programming language! I found it fun to use, and its default formatting and project structure was sensible for my needs. Second, I learned that working with ANSI color escape sequences in a terminal was a real pain! Tools such as Lipgloss made styling text very simple and fun.

