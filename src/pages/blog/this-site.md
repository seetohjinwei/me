---
layout: ../../layouts/Blog.astro
title: "Building this site"
date: "9 November 2022"
tags: ["astro", "blog", "portfolio"]
---

Hey, welcome! Every blog _needs_ a blog post about the blog itself, so here it is. I'm going to be writing mostly about the why and the how on creating this site.

The source code of this site can be found [here](https://github.com/seetohjinwei/me) and in the footer. Snippets are also included in the post itself for explanation-sake.

## About this blog

My plan is to use the blog to write about things I found interesting and about things I've made. Maybe some how-tos and tutorials as well.

The rest of this post will be about the development of the site.

## Tech Stack

The tech stack of the site is fairly simple, just Astro, and TypeScript (of course).

> Pull content from anywhere and serve it fast with Astro's next-gen island architecture.
>
> \- Astro's [website](https://astro.build)

Astro is essentially a way to cleverly bundle different forms of content together into 1 website. I use it to bundle vanilla HTML / JavaScript / CSS + Markdown.

It's great for simpler websites that don't change often, like blogs and personal sites. (like mine!)

### Why Astro?

I was _too_ familiar with React. So when I was considering what to build my site with, I googled around for "React static site" and ended up with Gatsby. It was okay and worked, but it's really really slow. A simple portfolio page shouldn't _feel_ sluggish. It was especially bad when I tried to resize the window on Safari.

This led me to shop around for other solutions, which is where Astro comes into the picture. I realised that I did not _need_ a UI Library. What I needed was just a simple site to serve my portfolio and blog. Having not worked with "raw" HTML and CSS for quite a while, it was comforting to go back to the basics. I forgot how much one could do with just the basic tools.

A big reason why I loved developing in React was the component system and how HTML, CSS, JavaScript for each component was bundled together. Astro does all that too, making it a easy choice over a vanilla website, because it compiles into one!

## Dark mode

### The flicker

Have you experience the dreaded **flicker** before? That's because the page loaded before the mode has been retrieved from the `localStorage` or `matchMedia` query.

To solve this, simply put this script into the `<head />` of your page. Inline scripts block the page from loading until they have been executed. This allows us to ensure that we retrieve the mode _before_ content is shown on the screen.

```astro
<script is:inline>
  /**
   * Inline script ensures that this runs before page load.
   * This script is used to load the theme/mode of the user on each page load.
   */

  // true => light mode, false => dark mode
  function getInitialColorMode() {
    const persistedColorPreference = window.localStorage.getItem("mode");
    const hasPersistedPreference = typeof persistedColorPreference === "string";

    if (hasPersistedPreference) {
      return persistedColorPreference === "light";
    }

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const hasMediaQueryPreference = typeof mql.matches === "boolean";
    if (hasMediaQueryPreference) {
      return !mql.matches;
    }

    // Default to light mode.
    return true;
  }

  if (getInitialColorMode()) {
    document.querySelector("html").classList.add("light-mode");
  }
</script>
```

This was adopted from [Josh Comeau's blog post](https://www.joshwcomeau.com/react/dark-mode/) about this exact problem, but for Gatsby. It's a great read.

### Theming

I opted to use CSS variables on the root element to theme the site. The default values of the variables pertain to the dark theme, but when the `.light-mode` class has been added to the `html` element, the values get swapped over to light theme instead! This was the simplest way I could find, and it can be done with just pure CSS and a couple of lines of JavaScript.

```css
/* dark-mode or defaults */
:root {
  /* Dark mode colours go here. */
}

.light-mode {
  /* Light mode colours go here. */
}
```

### The switcher

On page load, get the initial colour mode, similarly to [above](#the-flicker), and load it into the checkbox's check status.

Setting the theme on page load is not necessary as it is has already been done by the previous script!

On each click of the checkbox, set the theme again.

```astro
<script>
  const checkbox: HTMLInputElement; // using document.querySelector()
  checkbox.checked = getInitialColorMode(); // Same function as above!

  // Sets theme by adding a class to the body element and changing local storage.
  function setTheme() {
    const html = document.querySelector("html");
    if (html === null) {
      // for type checker
      return;
    }

    // checkbox.checked === light mode
    if (checkbox.checked) {
      html.classList.add(lightMode);
      window.localStorage.setItem(localStorageKey, light);
    } else {
      html.classList.remove(lightMode);
      window.localStorage.setItem(localStorageKey, dark);
    }
  }

  checkbox.addEventListener("click", function () {
    setTheme();
  });
</script>
```

The CSS for the switch can be found [here](https://alvarotrigo.com/blog/toggle-switch-css/).

## Markdown

Markdown is directly integrated into Astro, so posts, just like this one, are written entirely in it.

I also use remark plugins like `remark-gfm` for GitHub-Flavoured Markdown, `remark-math` for LaTeX and `remark-sectionize` to assist with producing the magical [table of contents](#table-of-contents).

## Table of contents

You might have noticed that there is a table of contents on the right (or top for smaller screens).

The table of contents is also scrollable for pages with _a lot_ of headings... but I hid the scrollbar for aesthetics.

### Generating headings

Data for the headings are available from the props.

Some extra filtering is done to ensure that if the number of headings goes past 15, only `h1` and `h2` headings will be included in the table of contents.

```astro
---
const { headings } = Astro.props;
const shouldShowH3 =
  headings.filter((h) => [1, 2, 3].includes(h.depth)).length <= 15;
const headingsToShow = !shouldShowH3 ? [1, 2] : [1, 2, 3];
---
```

After which, it is just a matter of mapping out the headings into a list.

Indentation is also added for subheadings to make things look a bit prettier.

```astro
<div class="toc">
  <div class="anchor-top">
    <a href="#">Back to top</a>
  </div>
  {
    headings
      .filter((h) => {
        return headingsToShow.includes(h.depth);
      })
      .map((h) => {
        const shouldIndent: boolean = h.depth === 3;
        const indent: string = shouldIndent ? " indent" : "";
        const css: string = indent;

        return (
          <div class={css}>
            <a href={`#${h.slug}`}>{h.text}</a>
          </div>
        );
      })
  }
</div>
```

### Auto-magical highlighting

When you scroll through the post, the sections currently visible are highlighted in the table of contents too! This is done through an `IntersectionObserver`. When the page is initially loaded, a `document.querySelectorAll` is ran on the entire page to add each section into the observer.

Headings under a section are queried and then `heading.closest("section)` is used to obtain the parent element, which is the section.

```typescript
// place this in the event listener below!
document.querySelectorAll("section > h2[id]").forEach((heading) => {
  const section = heading.closest("section");
  if (section === null) {
    // for type checking
    return;
  }
  observer.observe(section);
});

// similar query for "section > h3[id]"
```

As for the observer itself, you need the anchor div to be able to add or remove the class as required. To obtain the anchor div, I first retrieved the `id` associated to the entry and then queried for the anchor element with it and obtained the parent element that way. I'm sure there are a million other ways to do so, but ultimately, it depends on how the table of contents is structured.

```typescript
window.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.children[0].getAttribute("id");
      // Ensure that links outside ToC are not queried!
      const link: HTMLAnchorElement; // Query for the link in table of contents.
      const anchorDiv = link.parentElement;

      // Then, simply add or remove the "active" class as required.
      if (entry.intersectionRatio > 0) {
        anchorDiv.classList.add("active");
      } else {
        anchorDiv.classList.remove("active");
      }
    });
  });
});
```

However, you might have noticed that the default Markdown generated does not contain any `<section>` elements. That's where `remark-sectionize` comes into play. It wraps each section under a heading with a `<section>` element. This allows us to easily find that region with JavaScript!

... and that's the gist of how the auto-magical highlighting is done.

This solution was adopted from a [blog post](https://www.bram.us/2020/01/10/smooth-scrolling-sticky-scrollspy-navigation/) by Bramus.

### Mobile-friendly

On a smaller screen, horizontal real estate is much more precious, so I opted to move the table of contents to the top instead. A simple trick using media queries was employed to let this happen. In essence, let the container be a flex box and change the flex direction as necessary with a media query. I actually use this same trick a couple of times in the [main page](/) too!

```css
.container {
  display: flex;
  flex-direction: column-reverse;
}

@media (min-width: 1000px) {
  .container {
    flex-direction: row;
  }
}
```

But of course there is much more CSS that goes into this to ensure that it looks nice on both desktop and mobile. Some of the minor stuff include hiding the "Back to top" link and section highlighting on mobile, as they really don't make much sense when the ToC is stuck at the top.

## Design

Frankly, I don't see myself as much of a designer, but I really didn't want to just copy some template online. Even if they are much nicer than what I could ever make, it just doesn't feel personal enough. So, I decided to keep things simple. A simpler design also allows me to be able to put more effort into ensuring that everything flows well together.

### CSS and responsive web design

I used to not put that much focus into the design aspects of my projects. I thought that as long as something worked really well, the looks don't really matter.

... but, I was wrong. First impressions **do** matter. I realised that a big part of why I didn't want to care about design was that I did not like styling CSS. My "hatred" of CSS stemmed from my lack of understanding about it. I always thought that CSS was simple and that I did not need to learn it. Any time I needed to do something in CSS, I either "brute-forced" my way to get things in place or searched up google for a solution.

Before making this site, I forced myself to spend a couple of days reading up tutorials, guides, watching video explanations about CSS. It really made a difference. Even with just a few days of proper learning, it changed the way I felt about it. It's no longer something scary and magical. At its core, CSS _is_ easy to use, but it is also difficult to use _well_.

I decided to put in more effort into not only making the site look good, but also making sure that it does so on most platforms. After all, multi-device support is a big part of what makes websites so special compared to desktop or mobile applications. I do think that I have succeeded in this goal.

### Colours

On my portfolio page, I went with a different background colour for each section, with a simple wave transition between them. I generated the dividers from [this website](https://www.shapedivider.app). The colours were chosen to be soft on the eyes and not distract from the main content.

As for the blog, it uses a basic light and (very) dark grey background for light and dark theme respectively. I'm pretty proud of how it turned out! The pink and purple accent colours contrast well without stealing _too much_ from the other content.

## Conclusion

I guess there's really not much to conclude but thank you for making it all the way through! I hope it was a good read.
