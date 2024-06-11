---
title: "Using Fabric to Learn Fast"
description: "How much time can I save using fabric, a CLI powered by AI, to gather info from YouTube videos?"
startDate: "2024-06-04PDT" # No option for this yet
pubDate: "2024-06-04PDT"
heroImage: "/blog/using-fabric-to-learn-fast/guillaume-meurice-cover.png"
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

# Getting familiar with `fabric`

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

### `fabric --setup`

Now that we have the keys ready, we can call `fabric --setup` connect the application to Anthropic and YouTube's APIs. `fabric` will ask you for your API keys, so paste them in and press `Enter` when asked to do so.

```sh
➜ fabric --setup

# ...

Please enter your claude API key. If you do not have one, or if you have already entered it, press enter.

```

Everything should be configured now, so let's give both scripts a test drive and see how they do.

Here's the `yt` command extracting metadata from a [vine boom sound effect video](https://www.youtube.com/watch?v=Oc7Cin_87H4).

```sh
➜ yt --metadata https://www.youtube.com/watch?v=Oc7Cin_87H4
{
  "id": "Oc7Cin_87H4",
  "title": "Vine boom sound effect",
  "channel": "Business Goose",
  "published_at": "2021-09-11T19:00:07Z"
}
```

Here's a small test for `fabric`. Our input needs to be piped into the `fabric` command. The `tweet` pattern will provide small output.

```sh
➜ echo "I had deep dish pizza today." | fabric -p tweet
🍕 Indulged in some delicious deep dish pizza today! 🤤 #FoodieLife #ChicagoStyle
```

Great! The commands are working! We now have the building blocks ready to speed up our learning process.

## Extracting wisdom

We can combine the `yt` and `fabric` commands together to extract digestible information from YouTube. Let's see how this works.

Suppose I would like to watch [this video about 11 LinkedIn Profile tips](https://www.youtube.com/watch?v=8SdbTpOcwd8). This video is **23 minutes and 33 seconds long**. I'll call these tools successful if I can gather what these 11 tips are in this video.

To compare the tool's effectiveness, I'll gather the details that I can about the video first. I'll give myself some advangates, including playing the video at 1.5 times speed and writing notes down. How fast can I gather the 11 tips from the above video?

<details class="info">
<summary>Shane Hummus's 11 BEST LinkedIn Tips</summary>

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

That's pretty good, but let's see how well fabric performs in comparison. We'll put the video link from above into our command:

```sh
➜ time yt --transcript https://www.youtube.com/watch?v=8SdbTpOcwd8 | fabric -p extract_wisdom -o shane-hummus-11-best-linkedin-profile-tips.md

# fabric output ...

real    0m11.632s
user    0m2.905s
sys     0m0.209s

```

Did you see that? These video notes were generated in **_11.6 seconds!!_** That's **less than one hunderedth of the time** it took to write notes myself. This sounds extremely impressive, but is the output even usable? Let's verify the generated notes are accurate to what I wrote down above.

To do this, I'll use `grep` to search for terms within my notes and see if they appear in `fabric`'s generated output. Here's the breakdown of the 11 tips from the video above.

<details>
<summary>Tip 1: Start adding connections</summary>

Let's try searching for "connections."

```sh
➜ grep "connections" my-notes.md fabrics-notes.md
my-notes.md:1. Start now, start adding people, 500 connections asap, like a blue checkmark
fabrics-notes.md:- Get to 500+ connections ASAP to unlock profile views and messaging
fabrics-notes.md:- Use LinkedIn open networkers ("Lions") to quickly build connections
fabrics-notes.md:- Consistently build LinkedIn connections, aiming for 500+
fabrics-notes.md:- Start building your LinkedIn network immediately, aiming for 500+ connections
```

</details>

<details>
<summary>Tip 2: Determine demand</summary>

Let's try searching for "demand" this time.

```sh
grep "demand" my-notes.md fabrics-notes.md
my-notes.md:2. Determine demand, especially in the entry level. Is your career a good choice? Use the search feature for this.
fabrics-notes.md:- Use LinkedIn to determine demand for different career paths
```

Although it mentioned demand in the notes, it's not clear _how_ to actually do so in the generated notes.

</details>

<details>
<summary>Tip 3: Use networking tools to find connections</summary>

You can use LinkedIn's people search feature to find potential connections that have things in common. Let's search for "network." I've removed some repeat output from the previous steps.

```sh
grep -i "network" my-notes.md fabrics-notes.md
my-notes.md:- Use LinkedIn Open Networks (LiONs), connection multiplier
my-notes.md:3. Networking - Use people search filters to find people that you connect with that have something in common. It's like a cheat code to find a job
# ...
fabrics-notes.md:- Leverage LinkedIn for powerful networking opportunities
fabrics-notes.md:- Networking and connecting with industry professionals is key to landing opportunities
fabrics-notes.md:- Proactively network with industry professionals and recruiters
fabrics-notes.md:Leveraging strategic LinkedIn optimization, networking, and personal branding can dramatically improve your chances of landing your dream job.
# ...
fabrics-notes.md:- Leverage LinkedIn's powerful networking capabilities to uncover new opportunities
```

Again, the _how_ of this step is missing from `fabric`'s generated notes.

</details>

Overall, I'm pretty happy with the notes that were generated. Although the generated notes don't always go into specifics, there's no reason why I can't add them later. To me, the time savings massively outweigh the loss in detail.
There's a concern that referring back to the video will take just as long as if I just went through the video myself. Let's see if that's true.

I spent **9 minutes 47 seconds** skimming through the video until I felt comfortable with the details. Combined with the time it took to run `fabric` and get the notes (11.6 seconds), I spent **9 minutes and 59 seconds** getting comprehensive notes from a video that is 23 minutes and 33 seconds long. In other words, **it was 57.6% faster for me to use `fabric` and skim through the video than it was to just watch it**.

## API Costs

### Anthropic

Using Anthropic's AI models through the API comes at a cost, so I'll share my findings.

During testing today, for one video 7537 input tokens, 937 output tokens. The cost for the model I was using

- Input $0.25/million tokens
  - 7537 tokens = 0.007537 millions of tokens \* $0.25 = $0.00188425
- Output $1.25/million tokens
  - tokens = 0.000937 millions of tokens \* $1.25 = $0.00117125
- Total cost for gathering wisdom for this video = $0.0030555

It cost me less than a cent to use this.

### YouTube API

Default quota limit of 10,000 "points" per day.

- List captions: 50 points
- List anything else: 1 point

It's clear that dowloading one video will not have me reach my quota. The cost to me is $0.00.

## Savings

As the old adage goes, "Time is money." The amount of time spent doing a task has a cost associated with it. Using a previous job as a reference, I'll pick a wage of $60 per hour. If I was working for a company, this would be the amount of money they'd have to pay me to learn from our sample video.

| Activity                           | Time spent (hrs) | Cost ($USD) |
| ---------------------------------- | ---------------- | ----------- |
| Watching the video                 | 0.39             | $23.40      |
| Watching at 1.5x and writing notes | 0.36             | $21.60      |
| `fabric` with skimming             | 0.10             | $6.00       |
| `fabric` by itself                 | 0.003            | $0.18       |

In other words, by using `fabric` to generate my notes instead of watching the video, **I saved $23.22 worth of time**. Skimming through the video to get cleaner notes **cost me an additional $5.82**.

# Conclusion

In this example alone, `fabric` has already proven to be an excellent tool. I've used this tool to **speed up note taking from YouTube videos by 130 times!** That sounds wildly impressive because it is! With this tool, it's trivial to gather important insight from a series of videos about a given topic.

Currently, I'm using the Claude 3 Haiku model, which seems to do well enough. However, if I were to use more powerful models, could I save time by reducing the time needed to watch videos. It's clear from the table above that watching video and writing notes is an expensive operation compared to using `fabric`.

## Next steps

Why stop at one video, when I can create a script that will convert a series of YouTube videos into notes for me?! This only increases the impressiveness of the savings. I can gather information from a variety of sources, and then review the information to figure out some main points.

As I try to include larger and larger videos, the tokens per second becomes a bottleneck. Perhaps there are other services (such as Groq) that can help increase the speed of analysis.

This is very exciting, so I'll follow up with another post about a script with helps automate this process given a series of YouTube videos.
