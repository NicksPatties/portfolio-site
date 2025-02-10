---
title: "Minimal C# Setup on Ubuntu"
description: "I find the easiest way to set up .NET for writing C# code in Helix on Ubuntu"
pubDate: "2024-06-03PST"
heroImage: "/blog/setting-up-c-sharp-on-ubuntu/cover.png"
published: true
tags:
  - "cs"
  - "hx"
---

I wanted to keep up with my coding interview practice, so I've been doing mock interviews with one of my friends from college. Our first session went well enough, but his inexperience with JavaScript moved the focus from algorithms to JS itself. His language of choice is C#.

It's been a long time since I used C#. In fact, there have been [seven major version releases since I used it last in 2014!](https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-version-history#c-version-60) A lot of things have changed, so I'm going to treat this as the very first time I use C# on my system.

Let's see what I need to do to create some technical interview questions in C#!

# Goal

I would like to create a C# project that has a starter function and runs unit tests. The tests will verify that the question has been solved.

Additionally, I do not want to use VSCode for C# development, but rather [the Helix modal text editor](https://helix-editor.com/). To use IntelliSense in Helix, I need to download a language server, and then configure my editor to use it.

<div class="info">
<details>
<summary>What is a language server?</summary>

A **language server** is software that implements the [Language Server Protocol](https://microsoft.github.io/language-server-protocol/). The server tells the text editor details about the file that's currently being edited. This enables the editor to perform features like syntax highlighting, code completion, navigating to function definitions, and more!

</details>
</div>

Let's break down the steps to create a basic C# project:

1. Download dependencies to run a C# project
2. Find and download the language server to support Helix's editor features
3. Create a test project that can run unit tests

## Downloading `dotnet` for C# development

To start developing applications with C#, I'll need to download .NET, Microsoft's open-source, cross-platform development kit. With it, I can build and run C# applications. [The instructions to download .NET for Linux are here](https://learn.microsoft.com/en-us/dotnet/core/install/linux?WT.mc_id=dotnet-35129-website), but in short, all I needed to do was install them through my package manager and Ubuntu's repositories.

```sh
sudo nala install dotnet8
```

<div class="info">
<details>
<summary>What is nala? Why not apt?</summary>

Typically, software package management is done by `apt` on Ubuntu. However, I find its output to be nearly impossible to read.

Nala, on the other hand, is an alternative front-end to `apt`, which is much easier for me to read. It also contains features that `apt` does not support. I personally enjoy [Nala's history feature.](https://gitlab.com/volian/nala#history)

If you're using `apt` for package management, but wished it was a little better, [I recommend giving Nala a try](https://gitlab.com/volian/nala#nala)!

</details>
</div>

Once Nala was finished, I verified `dotnet` was installed like so:

```sh
dotnet --version
# 8.0.10
```

Great! That part was easy. At this point, I can now create a new C# project using the `dotnet` command.

## Creating a C# test project with unit tests

There are a few different packages that can handle unit testing in a C# project, including MSTest and NUnit. The primary one I started using is called xUnit.

[Microsoft has documented some instructions on how to set this up](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-dotnet-test), but if your setup and needs are similar to mine, **I do not recommend following these instructions**. Here's why:

- You create way more files than you actually need.
  - For instance, you don't need to create a Visual Studio solution (.sln) file, or the separate directories for source and test files and their corresponding `.csproj` files.
- The commands listed in the article assume you're using Windows, which may not be the case.
  - The `ren` (rename) command may not be in you system.
  - You may not be using PowerShell, which uses `\` instead of `/` for path separators.

Fortunately, the `dotnet` command provides what I need to build a new project with xUnit bundled together. Suppose I wante to create a project called `InterviewQuestion`. To do so, I'll use the following command.

```sh
dotnet new xunit -n InterviewQuestion
```

- `new xunit` runs the `new` command with the `xunit` short name, which creates a new xUnit project.
- `-n InterviewQuestion` creates a new directory, and places the new project inside.

Once done, we'll navigate into our new directory, and run the tests.

```sh
cd InterviewQuestion
dotnet test
```

The following output of the above command looks like this.

```sh
# ...
Starting test execution, please wait...
A total of 1 test files matched the specified pattern.

Passed!  - Failed:     0, Passed:     1, Skipped:     0, Total:     1, Duration: < 1 ms - InterviewQuestion.dll (net8.0)
```

Great! We now have a running test file! However, nothing is actually being tested, and we don't even have a source file.

On top of that, we don't have the language features we want while editing our C# files. Let's fix this by setting up our language server.

## Installing a C# Language Server

Helix can integrate with language servers out of the box, as long as the language server's executable is available in the system's `$PATH`. But which language server should I pick?

We can find the default server of choice for Helix by using the `hx --health` command, which shows whether the editor can find the language server.

```sh
hx --health c-sharp

# output
Configured language servers:
  ✘ OmniSharp: 'OmniSharp' not found in $PATH
  # ...
```

Alternatively, we can find the default language servers [in this configuration file in the project's repository](https://github.com/helix-editor/helix/blob/master/languages.toml). As we can see in the file, `OmniSharp` is used as the default language server. Here's an excerpt from the language configuration file below.

```toml
[language-server]
# ...
omnisharp = { command = "OmniSharp", args = [ "--languageserver" ] }

[[language]]
name = "c-sharp"
# ...
file-types = ["cs", "csx", "cake"]
# ...
language-servers = ["omnisharp"] # points to the definition defined above
```

So it's clear, we need to have `OmniSharp` downloaded on our system . Let's go find it!

### Finding `OmniSharp`

I'll save you a couple hours of searching and point you to the [omnisharp-roslyn GitHub repository](https://github.com/OmniSharp/omnisharp-roslyn). This is where you'll find instructions to download OmniSharp on your operating system.

<div class='info'>
  <details>
  <summary>But what is Roslyn, anyway?</summary>

[Roslyn is a complier for .NET code that includes an API](https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/). It creates a bridge between the code compiler, and any software that's designed to analyze and fix code for you, including language servers.

In other words, omnisharp-roslyn is the language server that brings the usefulness of Roslyn's C# analysis to your editor of choice!

  </details>
</div>

### Downloading and installing OmniSharp

[In the releases page for the omnisharp-roslyn repository](https://github.com/OmniSharp/omnisharp-roslyn/releases), there's a collection of archive files sorted by the type of language server, operating system, and architecture. At first, I selected the `omnisharp-linux-x64.tar.gz` archive, unpacked it, and found that there was no `OmniSharp` executable inside... odd.

In fact, the only executables in the `omnisharp` extracted folder were these:

```sh
find ./omnisharp -type f -perm /u=x -name "OmniSharp*"

# output
./omnisharp/OmniSharp.Extensions.JsonRpc.dll
./omnisharp/OmniSharp.Extensions.LanguageServer.dll
./omnisharp/OmniSharp.Extensions.LanguageServer.Shared.dll
./omnisharp/OmniSharp.Extensions.LanguageProtocol.dl
```

No sign of the `OmniSharp` executable I was looking for. Perhaps this is a bug, but I'll follow up later.

Fortunately, there's a workaround in [Helix language server configuration wiki](https://github.com/helix-editor/helix/wiki/Language-Server-Configurations#macos-1). Although the guide is for macOS users, we can use the same process, since we already downloaded the `dotnet` CLI in the previous step.

We can break workaround down into steps:

1. Download the correct archive.

Mine's `omnisharp-linux-x64-net6.0.tar.gz`, but yours may be different. Note the `net6.0` at the end. That's the one we want.

2. Unzip the archive to a location of our choosing
3. Get the path of the `OmniSharp.dll` file within the archive

At this point, we should have everything we need to update our Helix language configuration. Let's add the following into our `languages.toml` file.

```toml
[language-server.omnisharp]
command = "dotnet"
args = [ "the/path/to/our/OmniSharp/OmniSharp.dll", "--languageserver" ]
```

This tells Helix to use the `dotnet` command to run the `OmniSharp.dll` file with the `--languageserver` argument. We'll check whether this works when we write our source file.

Our language server has now been configured. Let's see if it can help up write our source file. We'll test our language server connection by adding a new file to our project.

## Adding the source file to test

Let's create a new file called `InterviewQuestion.cs` in our project's directory and open it with Helix. Then, start typing `namespace` in your editor, and see what happens.

![A popup appeared while editing a C sharp file](src/assets/blog/setting-up-c-sharp-on-ubuntu/intellisense-works.png)

Did this popup appear in the editor? If that's the case, then congrats! OmniSharp has been integrated correctly into Helix! We can now enjoy the benefits of the language server when we write our new class.

<details class="warning">
<summary>Nothing popped up while I was typing...</summary>

Try waiting for a few seconds before typing anything else to see if any code hints appear. OmniSharp may need a few moments to start running.

If they don't, double check your `languages.toml` file to see if any configuration is incorrect. You can also use the `:log-open` command in Helix and scroll to the bottom of the logs for more clues on what's going on.

</details>

Here's the completed `InterviewQuestion.cs` file that I used.

```cs
namespace interviewQuestion;

public class Hello
{
	static public string sayHello()
  {
		return "Hello";
	}
}
```

The `UnitTest1.cs` file that was generated by `dotnet` needs to change, too. Navigate to the file with Helix's file picker menu.

<details class='warning'>
<summary>My file picker in Helix is filled with a bunch of junk!</summary>

While I was working with my new C# project, I noticed something very annoying when I was looking in the file picker: it's filled to the brim with stuff I don't care about!

![Helix file selector with a lot of irrelevant files](src/assets/blog/setting-up-c-sharp-on-ubuntu/helix-busy-files.png)

[By default, Helix's file picker ignores files that are included in a `.gitignore` file](https://docs.helix-editor.com/configuration.html#editorfile-picker-section). This works nicely for me, since I want the template to include basic git configuration as well. I don't want any irrelevant C# related files to be accidentally checked into any derived repository, and according to the .NET community, [there are a lot of them](https://github.com/github/gitignore/blob/main/VisualStudio.gitignore).

Fortunately my `.gitignore` is very simple as of now.

```gitignore
bin/
obj/
```

At this point, Helix's file picker is now usable. In the future, I'll refer to the `.gitignore` file linked above, for instance if I start adding NuGet packages.

</details>

We'll change the test name, and assert the function we wrote in `InterviewQuestion.cs` returns what we expect.

```cs
namespace interviewQuestion;

public class UnitTest1
{
    [Fact]
    public void sayHello_saysHello()
    {
        Assert.Equal("Hello", Hello.sayHello());
    }
}
```

Finally, lets double check the changes work as expected by running `dotnet test` in the root of our InterviewQuestion project.

Did the tests pass? Then congratulations! We finished setting up our C# development environment and created a project with a source file and corresponding unit test!

## Renaming a project

If I continue to practice coding interview quetsions with my college friend, then my projecs will need to have different names. As it turns out, renaming a .NET project can be a complicated process. So much so, that there are [entire tools dedicated to doing this for you](https://github.com/ModernRonin/ProjectRenamer).

Fortunately, since our project is so small, things don't have to be so complicated. We can do the following to rename our project:

- Change the names of the source, test, and `.csproj` file to names of our choosing.
  - Suppose for a [knapsack test problem](https://en.wikipedia.org/wiki/Knapsack_problem), `Kanpsack.cs`, `KnapsackTest.cs`, and `Knapsack.csproj` are good examples
- Change the namespaces in your source and test files to match the current project name.
- Change the name of the directory containing your project.

Double check if the tests work as expected. They may take a little longer than usual since `dotnet` will restore your workspace automatically for you.

```sh
dotnet test
```

If the tests run, then we're good to go!

# What's next?

We have a little starter C# project that tests a source file with unit tests! We went from no C# on our system to having language support in the Helix text editor.

Now that I have a template to create asimple C# project with unit tests, I can easily create new interview prep problems for my friend. Perhaps I'll write a script to make this even easier!

I may also try some other language servers and see what I think about their maintenance and installation. [This list of language servers](https://langserver.org/) is a cool resource to find other options! OmniSharp seems to work well, but there's a noticeable delay from the time I start Helix to the time the language server starts working. Perhaps there's something that works just as well for me, but requires less configuration to handle.

Did this help you set up C# on your Linux system at all? Hopefully this streamlined your process. Thanks for reading, and I'll see you next time!
