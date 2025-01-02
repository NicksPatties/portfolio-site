---
title: "2024: Reviewing the year with Bash"
description: "A high level view of my software development highlights, made easier with command substitutions."
startDate: "2024-12-30"
pubDate: "2025-01-02PST"
published: true
heroImage: "/blog/2024-recap/cover.jpg"
tags:
  - "bash"
  - "cli"
---

2024 has come to a close. Because of that, it's now a good time to reflect on my accompilshments during the past year. 

The questions I want to answer are:
- _What were some major themes of the past year?_
- _How have I improved as a software developer?_

Fortunately, I take notes on a regular basis, so I can leverage them to answer these questions. From within my daily logs directory, I can use the following to skim through my notes:

```sh
bat $(ls 2024-*)
```

The `$( ... )` is a [command substitution](https://www.gnu.org/software/bash/manual/html_node/Command-Substitution.html). In the above snippet, `$(ls 2024-*)` will be replaced with the output of `ls 2024-*`. By doing this, we send the files starting with `2024-` into `bat`. It's the same as doing the following without typing all of the files yourself:

```sh
bat 2024-01-01.md 2024-01-02.md ... 2024-12-30.md
```

Skimming through my daily log notes takes a while, though. Perhaps we can use `grep` to narrow down our search by topics. How did I feel about `"jobs"` throughout the year? We can get an idea by using command substitution again. From the same daily logs directory:

```sh
grep "jobs" -ni $(ls 2024-*)
```
- `-i` means the query is case insensitive
- `-n` means list line numbers

Reading the results, I noticed that **I would fluctuate between applying and not applying for jobs**. It was difficult to balance searching for work, learning new skills, and building software that is fun and helpful.

Speaking of building software, what projects have I been working on in the past year?

Suppose I have a directory called `~/Documents/dev` that contains directories. Each one is a software project I've been working on. I can see what I've been working on in the past year by doing the following:

```sh
ls -ltr --time=birth --time-style=long-iso ~/Documents/dev | \
grep "2024-*"
```

This demonstrates some fun facts about `ls` you may not have known!
- The `-t` flag sorts files by time, starting from the newest to the oldest. To get a better timeline, you can reverse the list by using the `-r` flag.
- The `--time` flag allows you to specify which file time to show. The options are access time (`--time=atime` or `-u`), change time (the default), and birth time (`--time=birth`).
- `--time-style` changes how the time of the file is displayed. Instead of the human readable default format, I use `--time-style=long-iso` to show YYYY-MM-DD HH:mm time. This makes searching through the files with `grep` much easier.

With this command, I found a directory that reminded me **I participated in my first hackathon this year!** At the hackathon, I learned some things like:
- How to make sure your development environment is easily replicatable on _all_ platforms (that means Window, macOS, _and_ Linux)
- How to move fast, break stuff, and have a fun time doing it, even if you're using a tool for the very first time. Moving fearlessly helped get things done.
- How to crash and burn during a presentation, and not worry about it afterwards!

The `ls` command above may be enough for you to reflect, but I have a problem. I recently upgraded my operating system, a process that was more destructive than I had hoped. Therefore, **the earliest files in my hard drive are from September of the past year**, not nearly enough clarity on what happened.

Still, thanks to version control, I have a history of what I've done regardless of what my local directories say! For each git repository, I can skim through my changes by using this command:

```sh
git log --since=2024-01-01 --oneline --reverse
```

Additionally, if you manage your repositories on GitHub, you can use the `gh` CLI to view issues that you've completed in the past year.

```sh
gh issue list --limit 100 --state closed --search "sort:created-asc created:>2024-01-01"
```
- By default, this command only returns 30 issues that match the query. The `--limit 100` flag works around this, but it's optional.
- `--state closed` returns issues that have been closed. I see these as accomplished tasks, but if you wanna see all issues, then you can use `--state all` instead.
- `--search` matches search queries in GitHub. The most important one here is the `created:>=2024-01-01`.

Some highlights that I gathered from these two commands include major updates to my projects, including:
- MegaResume
  - I started winding down development of MegaResume in January, but then added an additional feature in May. **The frequency of updates coincided with my drive to search for jobs.**
- My portfolio site
  - **I migrated from Hugo to Asto**, and redesigned my whole site to make reading, writing, and deploying articles as smooth as possible.
- My Limp Bizkit Data Scraper
  - Leveraged my language of choice to perform data analysis, and **became familiar with SQLite as a result**. Also, had a great time **presenting my findings to fellow peers!**
- Sweet
  - I re-did the application starting in October, diving back into Go and having a fun time! I added some major features, including **handling piped exercise input, and a stats view!**

So I have a few ways to review what my 2024 was like. Now to answer our previous questions. _What were some major themes of the past year?_

There's a word to describe it, it would be **waves**. During the past year, my confidence as a programmer moved like a tide, ebbing while I was searching for jobs, and rising when I was working on software projects.

Now, _how have I improved as a software developer?_ Taking a look at the new files I created in my notes, I can see I researched a lot of interesting new tools.

Living in the terminal as long as possible has helped me stay focused, and I owe that to `tmux`. Managing code issues with the `gh` CLI helped me stay focused on a single task at a time. I find myself browsing the Internet with the terminal too. I used `w3m` more, thanks in great part to [rwxrob's simple duck script](https://github.com/rwxrob/dot/blob/main/scripts/duck). The more time I spend in the terminal, the more I can stay focused on solving problems, rather than fighting my software.

Upon reviewing all the stuff I've done, I can feel my confidence returning as a programmer. To continue this wave of momentum going into the new year, I'd like to find another job, and keep myself above water. If I can build cool stuff for myself, then I'm sure I can do so for others.

Being stubborn, however, I would still like to work on my projects. I have a backlog of things I want to make and refresh. Now that I'm on the hunt for a job, my attention has turned to [MegaResume](/projects/megaresume) once again for another refresh.

Here's to a fun and fruitful 2025! Are you excited about the new year? Did you learn something new about familiar command line tools? Feel free to let me know!

Thanks for reading, and I'll see you next time.
