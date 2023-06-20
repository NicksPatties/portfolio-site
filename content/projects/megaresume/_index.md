---
Title: MegaResume
---

# fart
### startDate to endDate
### Platform: Web (Desktop and Mobile)
### Technologies: JavaScript, TypeScript, SvelteKit 

MegaResume is a resume building application. However, unlike other resume builders, MegaResume is designed to store all of a user's experience into one location. Tags are used to show and hide relevant experience based on the job they're applying for. The user verifies their resume fits within a one page limit with the resume view in the center of the application.

## Motivation

Although websites such as LinkedIn and Indeed are designed to contain all of the work experience of a user, not all job application platforms integrate smoothly with those services, requiring the user to provide a pdf copy of a resume themselves. Before using MegaResume, I used to have all my work experience written on a word document, and would delete irrelevant details to create a resume. This process was very time consuming and error prone; each new resume took about half an hour to finish. This became even more cumbersome to do when the breadth of my technological experience increased. I needed a way to build resumes quicker, and use my experience to apply for a larger breadth of jobs.

## Actions

I built a single page web app using SvelteKit. The application is separated into two sections: the menu, and the resume view. The menu is the interface where users add their specific resume details, such as contact information and work experience. The resume view allows the user to view the rendered contents of the resume.

*picture of the window with resume and menu opening up*

Within the menu, users add their basic information and work experience, which automatically populates the resume view component, giving users an instant look at how their resume will appear.

*picture of user adding new work experience and menu*

Users can also add individual highlights to each work entry, where specific accomplishments are catalogued. The user assigns tags to each highlight, describing the topics that are most relevant to that highlight. Tags that have been added to previous highlights will appear in a tooltip while typing, making it easier to assign the same tags to different fields.

*picture of user adding highlights to work experience and tags*

Within the tags menu, users can hide and show whatever tags are relevant for a given resume. Users can search for specific tags to manipulate, and toggle their visibility using thier corresponding checkbox. Want to start from scratch? Hide all of the tags, then select your tags, and watch your resume build before your eyes!

*picture of user adding tags*

To take a load off my mind when developing MegaResume, I created unit tests and end-to-end tests to verify the tools functionality. I also used Github Actions to create a CI/CD pipeline to automatically run the tests on pull requests, and deploy the changes on a successful merge to the main branch.

## Results

Overall, I'm pleased with the production boost this added to my resume building tasks. After moving my information to MegaResume, given a new job application, I can create a targeted resume in about three minutes. That's ten times faster than adjusting a master resume document by hand!

Additionally, this was the first time I used SvelteKit in a project, and overall, I had a pleasant experience! I enjoyed how similar Svelte components behaved like basic HTML, CSS, and JavaScript. Managing state in Svelte's store components was very straightforward, removing the need for any higher order components like I used to use in React components before hooks were introduced.

