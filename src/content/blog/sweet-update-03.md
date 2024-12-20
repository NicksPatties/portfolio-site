---
title: "Sweet Update 03"
description: "View your performance over time with `sweet stats`!"
startDate: "2024-12-19PDT"
pubDate: "2024-12-19PDT"
published: true
heroImage: "/blog/sweet-update-03/cover.png"
project: "sweet"
tags:
  - "go"
  - "cli"
---

[Version 0.1.9 of `sweet` just released today](https://github.com/NicksPatties/sweet/releases/tag/v0.1.9), and with it comes the introduction of a new command: `sweet stats`!

![The sweet stats screen](@assets/blog/sweet-update-03/sweet-stats-command.png)

This post will go over the different UI components, and how to use the `stats` subcommand. Let's take a look!

# About `sweet stats`

As you continue to use `sweet`, your repetitions will be stored in a database. `sweet stats` is the command to query and view the changes in different metrics over time.

## The metrics table

```txt
stats from two days ago:

      AVG     MIN     MAX     FIRST   LAST    DELTA   
wpm   53      29      66      29      36      7       
raw   54      29      66      29      39      10      
acc   94.51%  88.96%  97.48%  97.48%  91.28%  -6.20%  
errs  1       0       4       0       3       3       
miss  14      6       26      8       17      9       
```

This table displays interesting stats about your reps. Check the `DELTA` column to see how your metrics have changed over time!

## The stats graph

![A line graph of various metrics](@assets/blog/sweet-update-03/stats-graph.png)

Here's a visual way to compare your metrics. Do a high number of mistakes correspond to lower words per minute? Are you keeping your accuracy consistent? The line graph can help answer these questions!

## The reps table

![A table of the repetitions recorded](@assets/blog/sweet-update-03/reps-table.png)

This is the raw data used to calculate the stats above, provided for your convenience to peruse. You can see what exercises you've worked on the most,  which exercises cause the most errors, and more! 

## Querying the data with flags

Below are a collection of flags to fine-tune your stats query.

```txt
Flags:
  -s, --start string   find stats starting from this date
      --since string   alias for "start" flag
  -n, --end string     find stats ending at this date
      --name string    filter by exercise name
  -l, --lang string    filter by language
  -w, --wpm            show words per minute (wpm)
  -r, --raw            show raw words per minute
  -a, --acc            show accuracy (acc)
  -m, --miss           show mistakes
  -e, --errs           show uncorrected errors
  -d, --dur            show duration
  -h, --help           help for stats
```

Here are some examples of how you'd likely use the command.

### Seeing today's stats

```sh
sweet stats
```

By default, the `stats` command will return today's stats. It's a good way to see where you're currently at, or encourage you to get some practice in if you don't have any stats recorded for today.

### From the past week?

Since today is December 19th, 2024, let's start our query from December 12th.

```sh
sweet stats --since=2024-12-12
```

Additionally, the date flags accepts a shorthand that looks like this:

```sh
sweet stats --since=1w
```

Other supported shorthand date values include
- `h` for hours
- `d` for ways
- `w` for weeks
- `m` for months
- `y` for years

Some flags also have a shorthand, too!

```sh
sweet stats -s 1w
```

If you don't remember a flag's shorthand version, check out the help menu with `sweet stats -h`.

### Showing specific columns

There are boolean flags for each of the metrics, so if you'd like to only see some columns to reduce the noise, you can do so like this:

```sh
sweet stats --wpm --miss
```

This will only show the words per minute and mistakes metrics columns in your output.

![Tables and charts that only contain words per minute and mistakes](@assets/blog/sweet-update-03/filtered-columns.png)

Note that the start and name columns will still be visible in the reps table to help distinguish reps from each other.

### By exercise name?

I'm particularly bad at writing shell scripts. I cannot for the life of me break above 50 words per minute when working on my `diary.sh` exercise. Let's take a look here by combining some flags we've seen with the `--name` flag:
 
```sh
sweet stats --name=diary.sh -s 1w  --wpm
# stats for diary.sh from one week ago:
# 
#      AVG  MIN  MAX  FIRST  LAST  DELTA
# wpm  38   36   41   36     36    0
```

On the other hand, I'm getting pretty good at writing HTML tags consistently fast.

```sh
sweet stats --name=resume-section.html -s 1w --wpm
# stats for resume-section.html from one week ago:
# 
#      AVG  MIN  MAX  FIRST  LAST  DELTA
# wpm  57   29   64   62     62    1
```
_Nevermind that minimum of 29 wpm. I was testing something, I swear._

<details class="info">
<summary>How do I find exercise names?</summary>

If you're unsure what name to put in here, you can find exercise names in the following places:
- output from the `sweet stats` command
- your `$HOME/.config/sweet/exercises` directory
</details>

### By language?

How about looking at Go files? Use the `--lang` flag for that, and provide the extension of the language you'd like to see.

```sh
sweet stats --lang=go -s 1w
# stats for go from one week ago:
# 
#      AVG  MIN  MAX  FIRST  LAST  DELTA
# wpm  59   52   66   59     56    -3
# 
#  66 ┤    ╭╮  ╭─╮
#  60 ┼╮ ╭─╯╰╮╭╯ │╭╮
#  53 ┤╰─╯   ╰╯  ╰╯╰
#  46 ┤
#  40 ┤
#  33 ┤
#  27 ┤
#  20 ┤
#  13 ┤
#   7 ┤
#   0 ┤
# 
#          ■ wpm 
```

My enjoyment in using Go is proportional to my typing ability. Maybe it's the same for you and your favorite programming languages, too!

## What will you find?

So far, implementing the `stats` command has gotten me excited about continuously using `sweet`. The speed in which I can start and complete exercises feeds into the analysis of my typing ability, and my drive to improve.

If you're looking to improve your software development ability, then `sweet` can help! After all, you can't make great software without typing (even if you use AI! 😉)

[Download the latest release of `sweet` today on GitHub](https://github.com/NicksPatties/sweet/releases/tag/v0.1.9), and let me know what you think! Until then, happy coding, and I'll see you all next time.
