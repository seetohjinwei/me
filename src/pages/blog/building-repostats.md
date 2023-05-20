---
layout: ../../layouts/Blog.astro
title: "Building RepoStats: Statistics on your Repositories"
date: "30 December 2022"
tags: ["repostats", "github", "go", "svelte", "postgresql"]
---

## Tech Stack

Let's talk tech stack first. This is a tech blog after all.

- Go + Gin
- TypeScript + Svelte
- SASS
- PostgreSQL

I'll elaborate on the components further down.

### Go + Gin

I find Go to have a really good mix of writing speed and performance.

Even though some stuff is a little verbose in Go (read: the error system, or lack thereof), it is still fairly pleasant to write in.

Performance really isn't that critical for this application, but since I'm hosting it myself, I do want to minimise the strain on my server to a reasonable degree.

... and Gin is picked just because it worked for me in [the past](https://organius.jinwei.dev/). Not much reason for me to try out something new here, so I stuck with it.

### Svelte

Now, Svelte is something I have not used before this. I have always been a little curious after all these "alternative" web frameworks, so I decided to give it a try, and I really like it.

After building [this blog](https://jinwei.dev/blog/) with Astro, Svelte felt very familiar in terms of _syntax_.

> Big disclaimer: Svelte and Astro are for **very** different purposes.

One great thing I've heard about Svelte is that it does not ship a Virtual DOM (like React), so, not only will the final product be much smaller, it should be more performant on mobile devices too!

### SASS

SASS is great, and makes CSS less verbose.

I used it before in the past, but I was still very new to web development and was struggling enough with CSS as it is. Coming back to it now with a bit more experience, it really is a time-saver and works well with DRY (don't repeat yourself) principle.

### PostgreSQL

Used for the database :) Reasons for why a database is needed is explained [down here](#repository-data).

## Web App

### Usage

https://repostats.jinwei.dev/

<br>
<img src="https://jinwei.dev/blog/repostats/repostats.png" style="width: 700px; max-width: 100%; border: 1px solid var(--color-accent);" alt="repostats website">

The web app features a minimal and mobile-friendly interface which shows the breakdown of your repositories in a visual form.

To use it, simply enter the `username` and `repository` of a public GitHub repository and you'll be brought over. For example, using `seetohjinwei` and `repostats` will bring you to this page!

<br>
<img src="https://jinwei.dev/blog/repostats/repo-page.png" style="width: 700px; max-width: 100%; border: 1px solid var(--color-accent);" alt="repostats page">

The website is built with Svelte and is a server-side rendered application.

## Backend

Even though [most of the project](https://repostats.jinwei.dev/seetohjinwei/repostats/) is written in Go, there isn't _that_ much to talk about. In essence, it is the **glue** between the web app, the database and the GitHub API.

Fancy SQL stuff is written using PostgreSQL functions, because it is just easier that way. I then use `pgx` library to call my SQL stuff.

## Repository Data

Since data _has_ to be obtained from GitHub in some way, using their API made the most sense. I was not going to write a web scraper and let it break on me in 2 months time.

However, their API is rate-limited to 60 an hour without authentication! That's really low as I initially had plans to implement user's statistics. After searching around and reading the docs for a bit, I realised that one needed to make authenticated requests to have a higher limit! (who reads docs before doing things anyways) Thankfully, the rate-limit is raised to 5000 per hour, which is much more generous, and should be enough for my usage if nobody is overly enthusiastic about it. However, I did not want to implement end-user login because nobody would want to log in just to view some fancy pie chart. So, I decided to use my own Personal Access Token for the authentication, but this means I have to re-new it once a year :/

Even with the raised rates, I decided to put a bit of what I had learnt recently about PostgreSQL to use; and implement a database which caches the result. As of writing, requests for the same repository within an hour is fetched from my database. I do plan on adding a button for force refreshing the data though!

## Repository Banner

<img src="https://repostats.jinwei.dev/api/repo_image?username=seetohjinwei&repo=me" style="width: 500px; max-width: 100%; border: 1px solid var(--color-accent);" alt="me banner">

The above is an example banner using this page's repository!

### SVGs...

Generating this SVG took quite a bit more work than I expected. Initially, I tried to find a package that would just generate one for me. I wanted a package that can generate text and a pie chart all into a single SVG. However, all I could find was a hacky way that involved the use of _two_ separate packages.

So, I wrote my own, with [ajstarks/svgo](https://github.com/ajstarks/svgo) as a SVG abstraction.

I stumbled upon this [link](https://medium.com/hackernoon/a-simple-pie-chart-in-svg-dbdd653b6936) that helped out a bunch (beware that it has a _very_ strikingly bright background).

A pie chart consists of slices of the pie, and each slice can be generated with just a single `svg path`. Unfortunately, the proposed in the above link does not handle cases where a slice takes up >50% of the page. The SVG path simply takes a shortcut and the slice no longer exists! Thankfully, it can be fixed by adding a mid point between the start and end points.

```go
/*
M x y
A rx ry x-axis-rotation large-arc-flag sweep-flag x y  (mid)
A rx ry x-axis-rotation large-arc-flag sweep-flag x y  (end)
L x y
*/
var pathDFormat = `M %.2f %.2f A %.2f %.2f 0 0 1 %.2f %.2f A %.2f %.2f 0 0 1 %.2f %.2f L %.2f %.2f`

// NewSlice creates a slice with start, end in percentages.
func (c *Circle) NewSlice(start, end float64) string {
	// mid point is required because larger slices will take a "shortcut" instead
	mid := start + (end-start)/2
	startPoint := c.circumferencePoint(start * fullRadian)
	midPoint := c.circumferencePoint(mid * fullRadian)
	endPoint := c.circumferencePoint(end * fullRadian)

	origin := c.point

	return fmt.Sprintf(pathDFormat,
		startPoint.x, startPoint.y,
		c.radius, c.radius, midPoint.x, midPoint.y,
		c.radius, c.radius, endPoint.x, endPoint.y,
		origin.x, origin.y)
}
```

Each slice can be created with just 4 commands: a `move`, 2 `arc`, and a `line`, denoted by `M`, `A`, `L` respectively (uppercase for absolute values). Some of the values are hardcoded in, because those are for tweaking ellipses.

Meanwhile, the text on the left of the banner is just done through careful positioning of the coordinates and some `<text>`.

At the moment, the package I wrote for this has all the values hardcoded in as constants at the top of the file, but if I do need this elsewhere, it would be fairly easy to extract them out :)

## Hosting RepoStats

If you are interested in hosting it yourself, here are some steps that might be helpful!

For reference, my versions are:

- Node v19.2.0
- go version go1.19.4 linux/amd64
- psql (PostgreSQL) 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

If you don't have a valid PostgreSQL account, the Go backend will query the GitHub API with every request! It should be fairly obvious because it will take a split second longer than a cached query.

### Web App

To build and run the Go backend.

```sh
go build -o bin/repostats .
bin/repostats --mode web

# alternatively
go run . --mode cli
```

To build and run the Svelte frontend (it is a Node app).

```
cd frontend
npm run build

# build refers to the `build` directory
node build
# add "PORT=XXXX" in front to specify the port, if required (Node defaults to 3000)
PORT=8084 node build
```

### CLI

CLI is used for navigating local directories.

To build and run it.

```sh
go build -o bin/repostats .
bin/repostats --mode cli

# alternatively
go run . --mode cli
```

### Environment Variable

Replace `USER` with your PostgreSQL username, `PASSWORD` with your PostgreSQL password (if any), `DATABASE_NAME` with your database name.

PS: If your password contains `$`, make sure to escape them like this `\$`. Otherwise, it will be referencing the environment variable instead...

For the GitHub token, generate a Personal Access Token as explained [here in the GitHub docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-fine-grained-personal-access-token). Then, simply chuck it into the `.env` file.

`.env` file is already ignored in the `.gitignore` in this project. Do not check it into Git!

```
DATABASE_URL=postgres://USER:PASSWORD@127.0.0.1/DATABASE_NAME
GITHUB_TOKEN=TOKEN
```
