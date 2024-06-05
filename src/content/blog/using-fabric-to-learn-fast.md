---
title: "Using Fabric to Learn Fast"
description: "How much time can I save using fabric, a CLI powered by AI, to gather info from YouTube videos?"
startDate: "2024-06-04PDT" # No option for this yet
pubDate: "2024-06-04PDT"
heroImage: "/blog/using-fabric-to-learn-fast/cover.png"
published: false
---

I spend a lot of time diving deep into YouTube when I want to learn something new. These videos can range from 15 to 30 minutes in length, or perhaps even more. Sure, I can watch videos at 1.5 times speed to listen to information faster if time was an issue. However, remembering information is also an issue. Referring to a YouTube video is way more difficult for me than referring to some notes that I wrote.

So, YouTube videos contain helpful information, but it's time-consuming to learn from them, and it's difficult to recall information from them. Is there something I can use to help this issue?

Fortunately, there is! I learned about a tool called [Fabric](https://github.com/danielmiessler/fabric) (through a [YouTube video, of course!](https://www.youtube.com/watch?v=UbDyjIIGaxQ)). It's an open-source command line tool that prompts a language model of your choice though community-driven patterns. Its interface makes it easy to pipe its output into files that I can read and reference at a later time.

Let's see how this tool works, and if I can put it to good use!

# Goal

I would like to take a bunch of YouTube videos about a topic, summarize them, and save that output to files I can reference at a later time. My hypothesis is that this will save me time and make it easier for me to solidify information about that topic.

To do this, we'll use fabric to gather video details, and some Bash scripting to help automate the process for multiple videos. It'll be a great opportunity to learn things that'll be beneficial to other projects!

I'll break down this process into steps:

1. Install `fabric` and familiarize myself with it
2. Familiarize myself with other tools to manipulate some of its output
3. Write the script to tie everything all together

Let's go!

# Step 1: getting familiar with `fabric`

[Fabric's quick-start guide is pretty straightforward](https://github.com/danielmiessler/fabric?tab=readme-ov-file#quickstart), and after following the instructions, `fabric` was ready to go.

## The `yt` command

I noticed in the README above that the `yt` command was used in a few examples, and it also appeared in the video about fabric linked above. Heads up! **This script is included when you install fabric!** It's not another script that's downloaded separately, so if you try to find them in your distribution's package repository, then you will not find it.

## Configuring fabric and yt

Use `fabric --setup` to assign API keys to give fabric permission to connect to AI and YouTube services.

<details class="info">
<summary>Is it possible to use local models?</summary>

Yes it is!

In fact, I prefer to run AI servers on my own hardware, and to do that, I'd use `ollama`. Fabric can connect to a locally running `ollama` server instead of a third party model, which incurs a cost.

However, my poor little laptop is unable to handle the workload. When running `ollama` with the `llama3:8B` model for instance, my server ran at a blazing (as in hot, not fast) two tokens per minute. Waiting for the output is the software development equivalent to watching paint dry.

</details>

I created an API key with Anthropic to access their Claude models with fabric. `fabric --setup` allowed me to input the key, and everything was configured. I double-checked if I could access the models by running `fabric --listmodels` command.

### Getting an Anthropic API key

- Create an Antrhopic account
- Go to the Anthropic console
- Click on "Get API keys"
- Click "Create Key"
- Name the key and click "Create Key"

You now have an API key to give to fabric when you're prompted! Let's take care of the YouTube API key next

```sh
➜ fabric --listmodels

# ...
Claude Models:
claude-3-opus-20240229
claude-3-sonnet-20240229
claude-3-haiku-20240307
claude-2.1
```

To assign a default model to use with fabric, use the `--setDefaultModel` option when running fabric with the name of the model you want to use. I want to use `claude-3-haiku-20240307` by default.

```sh
➜ fabric --setDefaultModel claude-3-haiku-20240307
```

Now I won't have to specify the model each time I use the application!

### Getting a YouTube API key

During the setup process, I was asked for my YouTube API key. This is required for the `yt` command to work correctly

To get an API key, you'll need the following things:

- A Google account
- Go to the Google Developers Console
  - Create a new project
  - Wait for the project to be ready, then navigate to it
  - Solutions > APIs & Services > Enable APIs and Services
  - Find YouTube Data API v3
  - Click enable
  - Click `Create Credentials`
  - _What data will you be accessing?_ Click `public data`
  - Copy your API and record it in a safe place

You now have your API key to use the `yt` script

## Running a pattern

To run a pattern
