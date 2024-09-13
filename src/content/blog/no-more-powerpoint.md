---
title: "No More PowerPoint: Presentations in the terminal?!"
description: "Presentation software is clunky to me, so can I improve my process by using the terminal?"
startDate: "2024-09-12PDT"
pubDate: "2024-09-12PDT" # YYYY-MM-DDPDT
published: false # Set to true when you're ready
heroImage: "/blog/no-more-powerpoint/cover.png"
tags:
  - "presenting"
  - "tmux"
  - "hx"
---

TLDR: **Yes, it's possible!** I used this technique to present my Limp Bizkit data analysis project at SeattleJS this week! If you'd like to dig into the details, keep reading!

I wanted to create presentations quickly and easily, but I didn't want to work with presentation software. I've always found it clunky and annoying. I enjoy a little branding here or there, but doing so in presentation software is a challenge. I've seen enough black-text-on-white-background presentations to know how software engineers avoid adding life to their slides.

There's other software that gives presenters more control and pretty animations. [Spectacle](https://commerce.nearform.com/open-source/spectacle/) and [RevealJS](https://revealjs.com/) come to mind, but I wanted a process that was even more braindead and lean. _Could I give a presentation using just the terminal?_

# Requirements

For my presentations, I would like to do the following things.
- [ ] Move from one slide to the next
- [ ] Display text in a hierarchy
- [ ] **Syntax highlighting**
  - I write code, so I would like syntax to be easy to see
- [ ] Play audio and video
- [ ] Make creating slides *as quickly as possible*

Here are some things I'd like to avoid:
- Cloud based, SaaS solutions
  - These typically require creating an account on some third party source. I don't want to do this.

There are some features in typical presentation software that I like, but I don't need.
- Speaker notes
- Animations and transitions

So let's talk about how I get things set up. If you're in a similar position and struggle to get your ideas out into the world, then this may help you too, so let's go! This is the software I use to create quick and easy presentations

# Alacritty: The terminal emulator

This acts as the canvas of my presentation. Here are some reasons why I find this useful.

## Rendering colors and characters

Alacritty supports 256 colors. It also supports 

## Zoom controls

Pressing `Ctrl+` and `Ctrl-` increases and decreases the font size, respectively. Doing so allows me to display my text large enough for an audience to clearly see what's happening.

If needed, I can also change the font during my presentation. This is useful if I ever need to zoom out to show things like code snippets or application output.

## Borderless window configuration

Alacritty can be configured to hide the top window bar. This lets me save valuable screen real-estate, keeping attention to the content of the slides. Here's what the configuration looks like.

```toml
# $HOME/.config/alacritty/alacritty.toml
[window]
decorations = "none"
```

# Helix: The text editor

[I have mentioned Helix in previous articles before](/tags/hx), and I like it a lot! I've become pretty comfortable using it, so the more time I can spend in Helix, the happier I am.

Let's see if Helix can satisfy my needs when it comes to presenting slides.

## Next slide?

Given a list of files within a directory named `01.md`, `02.md`, and so on, it's possible to open all of them with this command.

```sh
hx *.md
```

Doing so opens all of my slides in order, starting with `01.md`. To move to the next slide, I can use the `gn` key combination in normal mode.
- `g` opens the `Goto` menu
- `n` moves to the next buffer, while the Goto menu is open

This takes care of one of my requirements! Here's what it looks like in action.

[Chaging from file 01 to file 02 in Helix]()

Let's check that of the list of requirements and keep going.

- [x] Move from one slide to the next

## Display text in a hierarchy?

If you've ever watched a presentation, you're sure to have seen a slide with bullet points. Can I replicate the same behavior in just text?

```md
- I don't know, can I?
  - It appears like markdown works fine!
  - In fact, I can do this with just a .txt file!
```

Easy peasy! We'll cross this off the list, too.

- [x] Display text in a hierarchy

## Syntax highlighting?

Presentations about code require showing code in a way that's easy to read. Because of this, syntax highlighting is an absolute requirement. Alacritty in part satisfies this need by supporting color output, but does Helix help out?

Having used it for coding, it's clear that Helix does, in fact, support syntax highlighting. This is not surprising, but are there any caveats? My slides are in Markdown format. Will this be a problem?

[Image of a markdown file with a code snippet in Helix]()

No problem here! This checks off a big requirement for me.

- [x] **Syntax highlighting**

So far we've satisfied three of five requirements.

## Bonus: optional themes!

After taking about half an hour to create a master slide, which contains the font and background styles in a presentation template, I further appreciated Helix's `:theme` command. If I wanted to change the colors of my presentation, wether for branding or lighting conditions, I could easily do so!

[Changing from a dark theme to a light theme in Helix]()

Although not a requirement, I wanted to share that discovery which, if you wanted to follow along, could save you some time in the end.

## Some gotchas

Although Helix checks off some of my boxes for presentation software, there are some issues I have:
- The `Goto` menu from earlier quickly flashes on the screen when I move to another slide. This can cause discomfort for some viewers.
- I use macros to quickly select text in between parentheses to use them with scripts. If I quit and re-open Helix, I need to record them again.

In spite of that, I find Helix to be an effective tool for creating presentation slides.

# Shell scripts: the multimedia playback

In my experience, when people attempt to use video or audio during a presentation, it usually goes wrong. This is especially true with PowerPoint.

To simplify my presentations as much as possible, I wanted to create short scripts to run commands within Helix. For instance, I can play a video in Helix with the following command:

```
:sh v my-video.mp4
```
- `:sh` tells Helix to run a shell command. In this case, it's `v my-video.mp4`

And here's the definition of the `v` command:

```bash
#!/bin/bash
cvlc --play-and-exit "$@"
```
- Uses the command line version of [VLC](https://www.videolan.org/vlc/), AKA `cvlc`
- `"$@"` passes all other parameters to the script. This let's me pass the path of the video, and any other options I may need.

The results are surprisingly effective! Here's a sample:

[A video appearing in the center of the screen after running a command]()

I defined similar commands for showing images (`i`), gifs (`g`), and playing audio (`a`). This covers my multimedia requirement!

- [x] Play audio and video

The following software is not necessarily required for running presentations, but I find them incredibly useful if I want to supplement presentations with live demonstrations.

# tmux: More windows, more fun!

The terminal multiplexer, or `tmux`, is an excellent tool that allows users to create new terminal sessions within a single terminal. I can swap to a codebase, or run a command in a shell and view it's output, and then quickly return to the slides, all without leaving the terminal.

Here's an example of what I can do with `tmux`!

[Switching from a presentation to a code project with tmux]()

`tmux` is useful, but it's usefulness is multipled thanks to this next tool.

# Tmuxifier: Automating everything

This is a companion application to `tmux`. With Tmuxifier, I can configure a collection of windows and panes to open with a single command. Each of these windows can run commands themselves, opening the required software to run the presentation and demonstrate any required code! It's like a super-powered "Start Presentation" button!

To start a given presentation, I just have to call this:

```sh
tmuxifier s my-talk
```
- `s` stands for "session." Tmuxifier will run the session configuration named `my-talk`.

This completes my coverage of the software I use to run my presentations. So, how did I do?

# Results?

Let's review my requirements for creating good presentations again:

- [x] Move from one slide to the next
- [x] Display text in a hierarchy
- [x] **Syntax highlighting**
- [x] Play audio and video
- [ ] Make creating slides *as quickly as possible*

Most of these requirements were satisfied thanks to Alacritty and Helix, since they are in charge of displaying and creating my slides. Speaking of creating slides, has it been easier to do so since I started this experiment?

Although anecdotal, my experience creating a similar slide deck with actual presentation software was a struggle. I'm ashamed to admit that I took about an hour and a half creating a master slide, and some data slides based off that template. I didn't even attempt to add video and audio before I quit, wondering if there was a better way.

Later, I started a stopwatch and created a slide deck to present a talk on this very topic in the aforementioned method. According to my watch, I created a first draft of my presentation, 14 slides of data, in _just under half an hour_. This improvement was significant enough to check this last box off my list of requirements.

- [x] Make creating slides *as quickly as possible*

# Conclusion

Overall, I'm glad I decided to explore new options for presenting. Figuring this out opens new avenues to sharing my ideas. By making presentations really simple to create and present. I can go from idea to talk in a fraction of the time and resources compared to using dedicated presentation software. Although I may not have beautiful graphics in my slides, my scripts allow me to engage audiences with images, video, and audio in an easy and fault-tolerant way. From now on, I'll pick this method over using PowerPoint any day of the week.

And as I mentioned above, I already gave a talk using the terminal, and it worked excellently! I got some good feedback about text placement (people in the back had to crane their heads to read content on the bottom of my slides), but overall, the slides were easy to read! During the presentation, I did notice it was more difficult typing commands while my adrenaline was pumping. Perhaps it's time to make my commands _even easier_ to type...

That'll do it for now. If you're interested in looking at some sample configuration files if you'd like to do something similar, you can find the on [this GitHub repository](). Thanks for reading, and I'll see you again soon!

