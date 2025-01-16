import path from 'node:path';
import fs from 'node:fs';

const args = process.argv.slice(2)

const printHelp = () => {
  console.log(`Usage:
  pnpm new:blog [-h|--help] "Title of your new post" 

    -h, --help      Shows this help menu
`)
}

if (args.length != 1) {
  console.warn("Incorrect number of args. Did you forget a title?")
  printHelp()
  process.exit(1)
}

const arg: string = args[0]

if (arg === '-h' || arg === '--help') {
  printHelp()
  process.exit(0)
}

const kebabbedTitle = arg.toLowerCase().replaceAll(/\W+/g, '-')
const getStartDate = () => {
  const d = new Date()
  const tzOffsetMillis = d.getTimezoneOffset() * 60000
  // new Date() always returns a date in UTC timezone,
  // so subtracting the tz offset from it will get me the correct date
  const todayISO = new Date(d.getTime() - tzOffsetMillis)
    .toISOString()
    .slice(0, "YYYY-MM-DD".length)
  return todayISO + "PST" 
}
const startDate = getStartDate()
const coverFilename = 'cover.png'
const helloFilename = 'hello.png'
const postContent = `---
title: "${arg}"
description: "A description of the article"
startDate: "${startDate}" # YYYY-MM-DDPST Not actually used, but helps me know how long it takes me to write blog posts
pubDate: "${startDate}" # YYYY-MM-DDPST Don't forget to set this to today's date!
published: false # Set to true when you're ready
heroImage: "/blog/${kebabbedTitle}/${coverFilename}"
# project: "portfolio-site"
# tags:
#   - "tags"
#   - "go"
#   - "here"
---

![Hello image](@assets/blog/${kebabbedTitle}/${helloFilename})

This is your new article! Happy writing!
`
const blogPath = path.join('src', 'content', 'blog', kebabbedTitle + '.md')
const coverSrc = path.join('bin', coverFilename)
const publicPath = path.join('public', 'blog', kebabbedTitle)
const coverDstPath = path.join(publicPath, coverFilename)
const sampleImageSrc = path.join('bin', helloFilename)
const assetsPath = path.join('src', 'assets', 'blog', kebabbedTitle)
const sampleImageDst = path.join(assetsPath, helloFilename)

try {
  fs.writeFileSync(blogPath, postContent)
  fs.mkdirSync(publicPath)
  fs.copyFileSync(coverSrc, coverDstPath)
  fs.mkdirSync(assetsPath)
  fs.copyFileSync(sampleImageSrc, sampleImageDst)
} catch (e: any) {
  console.log("Whoops! Something went wrong.")
  console.log(e.message)
  process.exit(1)
}

console.log(`All done!
  blog file:             ${blogPath}
  blog image location:   ${assetsPath}
    hint: ![Image description](@assets/blog/${kebabbedTitle}/image.png)
  cover image location:  ${coverDstPath}
`)
