---
Title: Sweet
---

# Sweet
### startDate to endDate
### Platform: PC, macOS, Linux (Command line interface)
### Technologies: JavaScript, Python, Go

Sweet is a **S**oft**w**are **E**ngineer **E**xercise for **T**yping. In other words, it's a touch typing exercise designed specifically for programmers! Instantly begin a typing game to warm yourself up

## Motivation

For a while I have been using touch typing applications to improve my typing, especially for programming. I have used a couple of web based tools which helped for a time. However, the time it took to start a new exercise was too long for my liking (yes, 1.6 seconds was not fast enough for me!). Some touch typing games incorrectly showed too many errors, while others were prohibitively covered in advertisements! In short, I wanted to create a touch typing tool of my own that ran on the command line and didn't need an Internet connection to use. Additionally, I wanted to see which technology I would like to use to create command line applications: JavaScript, Python, or Go.

## Actions

First, I defined which features I wanted to implement based on my needs. For instance, competing with others was a lower priority, while listing some statistics at the end of the game was a requirement. I then created some prototypes in JavaScript, Python, and Go, noting the performance benefits, different architecture styles, and overall developer experience in each implementation. In the end, I decided to use Go, thanks to its built-in cross platform support for handling file paths and reading files.

I then created the UI for running exercises. I used the BubbleTea package for listening to user input and reacting accordingly. The ELM architecture made it very straightforward to know what keys (or *kinds* of keys) were pressed, and reminded me of writing an update loop within a game engine. I also used the Lipgloss package, which made declaring different styles of text in the application straightforward, reminding me of declaring CSS classes.



## Results

First, I built a working knowledge of the Go programming language! I found it fun to use, and its default formatting and project structure was sensible for my needs. Second, I learned that working with ANSI color escape sequences in a terminal was a real pain! Tools such as Lipgloss made styling text very simple and fun.

