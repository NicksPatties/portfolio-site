---
title: "Using Fabric to Learn Fast"
description: "How much time can I save using fabric, a CLI powered by AI, to gather info from YouTube videos?"
startDate: "2024-06-04PST" # No option for this yet
pubDate: "2024-06-14PST"
heroImage: "/blog/using-fabric-to-learn-fast/guillaume-meurice-cover.png"
published: true
tags:
  - "ai"
  - "cli"
---

I spend a lot of time diving deep into YouTube when I want to learn something new. The videos I watch can range from 15 to 30 minutes in length, or perhaps even more. If time was an issue, then I can listen to videos like a podcast while doing other tasks. But remembering information is also an issue. Scrubbing through to a YouTube video is more difficult than referring to written notes.

So, YouTube videos contain helpful information, but it's time-consuming to learn and recall information from them. Is there something I can use to solve this problem?

Fortunately, there is! I discovered a tool called [`fabric`](https://github.com/danielmiessler/fabric) (through a [YouTube video, of course!](https://www.youtube.com/watch?v=UbDyjIIGaxQ)). It's an open-source command line tool that queries a large language model of your choice with community-written prompts called patterns.

Let's see how `fabric` works, and if I can put it to good use!

# Goal

I would like to take a bunch of YouTube videos about a topic, summarize them, and save that output to files I can reference at a later time. My hypothesis is that this will save me time and make it easier for me to solidify information about that topic.

Before getting ahead of ourselves, **we'll explore `fabric`'s potential with one video first**. This will let us really dig into its benefits. We'll also use some command line applications to assess `fabric`'s performance.

Let's get started!

# Getting familiar with `fabric`

[Fabric's quick-start guide is pretty straightforward](https://github.com/danielmiessler/fabric?tab=readme-ov-file#quickstart), and after following the instructions, I installed `fabric` and was ready to go. Most of the steps in this list are cross-platform, so if you want to follow along, the steps from the link above should have you covered.

`fabric` is not the only tool that's included in the installation! `yt` is a script that gathers YouTube video metadata, including a video's transcript. The transcript is essential to unlocking `fabric`'s potential; it will be the input that is sent to `fabric` for processing.

## Configuring `fabric` and `yt`

There are some prerequisites to using `fabric` and `yt` together that will not be covered in this post. I'll provide some links in case you want to follow along:

- You need a way to connect to an LLM. In this case, [I'll use an API key from Anthropic to connect to Claude AI models](https://docs.anthropic.com/en/docs/getting-access-to-claude).
  - `fabric` can also connect to ChatGPT and Google Gemini out of the box, so if you'd like to use those models, find their corresponding API keys instead.
- You also need access to YouTube's Data API v3. [Follow steps 1 through 3 in the "Before you start section" of these docs](https://developers.google.com/youtube/v3/getting-started), and you'll have your YouTube API key ready to go.

<details class="info">
<summary>Is it possible to use local models?</summary>

Yes it is!

In fact, I prefer to run AI servers on my own hardware, and to do that, I'd use `ollama`. Fabric can connect to a locally running `ollama` server instead of a third party model, which incurs a cost.

However, my poor little laptop is unable to handle the workload. When running `ollama` with the `llama3:8B` model for instance, my server ran at a blazing (as in hot, not fast) **two tokens per minute**. Waiting for the output is the software development equivalent to watching paint dry.

</details>

### `fabric --setup`

Now that we have our API keys ready, we can call `fabric --setup` connect the `fabric` and `yt` to our LLMs and YouTube's APIs respectively. `fabric` will prompt you for your API keys, so paste them in and press `Enter` when asked to do so.

```sh
➜ fabric --setup

# ...

Please enter your claude API key. If you do not have one, or if you have already entered it, press enter.

```

Once the setup is complete, we can verify if `fabric` is connected by listing the available models to use.

```sh
➜ fabric --listmodels

# ...
Claude Models:
claude-3-opus-20240229
claude-3-sonnet-20240229
claude-3-haiku-20240307
claude-2.1
```

Here we can see that Anthropic's Claude models are available. Great!

### Default models

We can now run `fabric` with a specific model with the `-m` command.

```sh
➜ fabric -m claude-3-haiku-20240307 # ...
```

However, specifying which model to use with each command gets annoying pretty quickly. Let's assign a default model that `fabric` will use.

To assign a default model, use the `--setDefaultModel` option with the name of the model you want to use. I want to use `claude-3-haiku-20240307` by default.

```sh
➜ fabric --setDefaultModel claude-3-haiku-20240307
```

Now we won't have to specify the model each time we use the application!

## Verifying the configuration

Everything should be configured now, so let's give both commands a test drive and see how they do. Here's the `yt` command extracting metadata from a [vine boom sound effect video](https://www.youtube.com/watch?v=Oc7Cin_87H4).

```sh
➜ yt --metadata https://www.youtube.com/watch?v=Oc7Cin_87H4
{
  "id": "Oc7Cin_87H4",
  "title": "Vine boom sound effect",
  "channel": "Business Goose",
  "published_at": "2021-09-11T19:00:07Z"
}
```

Here's a small test for `fabric`. Our input needs to be piped into the `fabric` command. The `tweet` pattern will provide some brief output.

```sh
➜ echo "I had deep dish pizza today." | fabric -p tweet
🍕 Indulged in some delicious deep dish pizza today! 🤤 #FoodieLife #ChicagoStyle
```

The commands are working! We're now ready to speed up our learning process.

# Extracting wisdom

We can combine the `yt` and `fabric` commands together to extract digestible information from YouTube. Let's see how this works.

Suppose I would like to watch [this video about 11 LinkedIn Profile tips](https://www.youtube.com/watch?v=8SdbTpOcwd8). This video is **23 minutes and 33 seconds long**. I'll call these tools successful if I can gather what these 11 tips are in this video.

To compare the tool's effectiveness, I'll gather the details that I can about the video first. I'll give myself some advantages, including playing the video at 1.5 times speed and writing notes down. How fast can I gather the 11 tips from the above video?

<details class="info">
<summary>My notes for Shane Hummus's 11 BEST LinkedIn Tips</summary>

1. Start now, start adding people, 500 connections asap, like a blue checkmark

- Import mail list
- Use LinkedIn Open Networks (LiONs), connection multiplier
- Add people related to your industry, recruiters, hiring managers, VPs, and so on, also search in the city you're trying to get a job in

2. Determine demand, especially in the entry level. Is your career a good choice? Use the search feature for this.
3. Networking - Use people search filters to find people that you connect with that have something in common. It's like a cheat code to find a job
4. Your profile is an asset to the company. It's beneficial to the company for you to have a good profile for b2b. Recruiters spend more time looking at a linkedin profile than a portfolio
5. Get a professional headshot done for your profile. If you don't wanna pay, there are tools for that (remove.bg, canva). Smile in your photo, wear a nice shirt.
6. Good title and headline. Tell a story, tell them exactly what you're looking for. Don't come accross as too needy. "Open to opportunities"
7. About section, tailor your profile specifically for a postition. Use lingo that your industry uses. You're excited about that position
8. Experience and education. You can make things sound better than they are. Be specific about the accomplishments you made. **Track metrics!**
9. Leverage certifications and certificates. A cheat code right now! Which certificates are the ones that hiring managers will be most interested in? Leverage those.
10. Don't be controversial. No politics, religion, job is not the place to spread your political beliefs
11. Nail the basics, check your grammar, elaborate achievements, use keywords, upload resume, make a portfolio (if relevant). Find the skills that hiring managers are looking for, show of those skills, make those skills accessible in an easy way. Have them find out in about 30 seconds. Make posts about my field. Post on other people's content in the same field.
</details>

Gathering these details took me **21 minutes and 21 seconds**. That's about **9.3% faster** than just watching the video. Plus, now that I've written my notes down, I have them to reference at a later time.

| Task                          | Time spent (mm:ss) |
| ----------------------------- | ------------------ |
| Watching the video            | 23:33              |
| 1.5 times speed, taking notes | 21:21              |

That's pretty good, but let's see how well fabric performs in comparison. We'll put the video link from above into our command:

```sh
➜ time yt --transcript https://www.youtube.com/watch?v=8SdbTpOcwd8 | fabric -p extract_wisdom -o fabrics-notes.md

# fabric output ...

real    0m11.632s
user    0m2.905s
sys     0m0.209s

```

Did you see that? These video notes were generated in **_11.6 seconds!!_** That's **less than one hundredth of the time** it took to write notes myself. This is summarized in the table below:

| Task                          | Time spent (mm:ss) |
| ----------------------------- | ------------------ |
| Watching the video            | 23:33              |
| 1.5 times speed, taking notes | 21:21              |
| `fabric`                      | **00:12**          |

## Verifying the output

This looks extremely impressive, but is the output even usable? Let's verify the generated notes are accurate to what I wrote down above.

To do this, I'll use `grep` to search for terms within my notes and see if they appear in `fabric`'s generated output. Here's the breakdown of some of the tips from the video above.

<details>
<summary>Tip 1: Start adding connections</summary>

Let's try searching for "connections."

```sh
➜ grep "connections" my-notes.md fabrics-notes.md
```

My notes look like this:

- Start now, start adding people, 500 _connections_ asap, like a blue checkmark

`fabric`'s notes look like this

- Get to 500+ **connections** ASAP to unlock profile views and messaging
- Use LinkedIn open networkers ("Lions") to quickly build **connections**
- Consistently build LinkedIn **connections**, aiming for 500+
- Start building your LinkedIn network immediately, aiming for 500+ **connections**

Looks pretty similar to my notes, but adds additional information about LIONs, which I missed.

</details>

<details>
<summary>Tip 2: Determine demand</summary>

Let's try searching for "demand" this time.

```sh
➜ grep "demand" my-notes.md fabrics-notes.md
```

My notes:

- Determine **demand**, especially in the entry level. Is your career a good choice? Use the search feature for this.

And `fabric`'s notes:

- Use LinkedIn to determine **demand** for different career paths

Although it mentioned demand in the notes, it's not clear _how_ to actually do so in the generated notes.

</details>

<details>
<summary>Tip 3: Use networking tools to find connections</summary>

Let's search for "network." I've removed some repeat output from the previous steps.

```sh
➜ grep -i "network" my-notes.md fabrics-notes.md
```

My notes:

- 3. **Networking** - Use people search filters to find people that you connect with that have something in common. It's like a cheat code to find a job

And `fabric`'s

- Leverage LinkedIn for powerful **network**ing opportunities
- **Network**ing and connecting with industry professionals is key to landing opportunities
- Proactively **network** with industry professionals and recruiters
- Leveraging strategic LinkedIn optimization, **network**ing, and personal branding can dramatically improve your chances of landing your dream job.
- Leverage LinkedIn's powerful **network**ing capabilities to uncover new opportunities

Again, the _how_ of this step is missing from `fabric`'s generated notes.

We'll stop the comparison there for now, since I can tell how `fabric` is behaving.

</details>

Overall, I'm pretty happy with the notes that were generated. Although the generated notes don't always go into specifics, there's no reason why I can't add them later. To me, the time savings massively outweigh the loss in detail. But, how long will it take to find those specifics if I need them?

It depends on a number of factors, but for this video, I spent **9 minutes 47 seconds** skimming through it until I felt comfortable with the details. Combined with the time it took to run `fabric` and get the notes (11.6 seconds), I spent **9 minutes and 59 seconds** getting comprehensive notes from a video that is 23 minutes and 33 seconds long. In other words, **it was 57.6% faster for me to use `fabric` and skim through the video than it was to just watch it**.

Once again, this is summarized below.

| Task                          | Time spent (mm:ss) |
| ----------------------------- | ------------------ |
| Watching the video            | 23:33              |
| 1.5 times speed, taking notes | 21:21              |
| `fabric` alone                | 00:12              |
| `fabric` with manual review   | **09:59**          |

# API Costs

## Anthropic

Using Anthropic's AI models through the API comes at a cost, so I'll share my findings.

For the video above, I processed 7537 input tokens, and 937 output tokens.

| Service       | Millions of tokens | Price (per million tokens) | Cost (USD)  |
| ------------- | ------------------ | -------------------------- | ----------- |
| Input tokens  | 0.007537           | $0.25                      | $0.00188425 |
| Output tokens | 0.000937           | $1.25                      | $0.00117125 |

This leads to a total cost of **$0.0030555**. Put another way, **it cost me less than a third of a cent** to extract the wisdom from this video.

## YouTube API

[The default quota limit for YouTube's Data API is 10,000 "points" per day.](https://developers.google.com/youtube/v3/guides/quota_and_compliance_audits) Below are [estimated costs](https://developers.google.com/youtube/v3/determine_quota_cost) for listing video captions and metadata.

- `captions` resource, `list` method: 50 points
- `list` method for all other resources: 1 point

It's clear that downloading one video's will not have me reach my quota. The cost to me is $0.00.

<details class="info">
<summary>Checking quota limits for YouTube Data API</summary>

If you plan on using this a lot, then you may want to know **how much of your remaining data quota is left**. Here's a quick way to do this:

- Log into your Google Cloud account
- Change the project to your Google Cloud project you used to obtain your YouTube Data API key
- Go to the "Quotas & System Limits" page in the "IAM & Admin" section
- In the filter search bar below, search for "YouTube Data API v3", and click the options labelled **SERVICE**.
- Find the "Queries per day" row

You can look at your "Current usage percentage" if you're working on this today, or click the "Show usage chart" icon at the end of the row to view historical data. For example, for the past couple weeks I've been trying `fabric`, I spent **31 quota points**, which is well below the 10,000 point quota limit.

</details>

# Time savings

As the old adage goes, "Time is money." The amount of time spent doing a task has a cost associated with it. Using a previous job as a reference, I'll pick a wage of $60 per hour. If I was working for a company, this would be the amount of money they'd have to pay me to learn from our sample video.

| Activity                           | Time spent (hrs) | Cost (USD) |
| ---------------------------------- | ---------------- | ---------- |
| Watching the video                 | 0.39             | $23.40     |
| Watching at 1.5x and writing notes | 0.36             | $21.60     |
| `fabric` with skimming             | 0.10             | $6.00      |
| `fabric` by itself                 | 0.003            | $0.18      |

In other words, by using `fabric` to generate my notes instead of watching the video, **I saved $23.22 worth of time**. Skimming through the video to get cleaner notes **cost me an additional $5.82**.

# Conclusion

In this example alone, `fabric` has already proven to be an excellent tool. I've used this tool to **speed up note-taking from YouTube videos by 130 times!** That sounds wildly impressive because it is! With this tool, it's trivial to gather important insight from a series of videos about a given topic.

Currently, I'm using the Claude 3 Haiku model, which seems to do well enough. However, if I were to use more powerful models, could I save money by reducing the time needed to double-check the generated notes. My guess is "yes," because watching video and writing notes is an expensive operation compared to using `fabric` alone.

## Next steps

Why stop at one video, when I can create a script that will convert a series of YouTube videos into notes for me?! This only increases the impressiveness of the savings. I can gather information from a variety of sources, and then review the information to figure out some main points. Perhaps I'll share my process of creating a bash script, a topic which I'm only moderately familiar.

As I try to process larger and larger videos, running `fabric` with Claude becomes a bottleneck. Perhaps there are other services that offer faster performance ([such as Groq](https://wow.groq.com/why-groq/)) that can help increase the speed of analysis.

We'll see what happens next! This is very exciting, so stay tuned for more updates!
