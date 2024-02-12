---
layout: ../../layouts/Blog.astro
title: "Markdown Everything"
date: "20 June 2023"
tags: ["markdown", "notes", "latex"]
---

<!-- TODO: images / PDFs of sample notes & slides -->

## What is Markdown?

In case you haven't heard of Markdown before, it's a markup language for text. Everything is stored as raw plain text, even the document's formatting. In a typical text editor (think Microsoft Word), to **bold** some text, you would select it and then click on the "bold" button, or hit CMD + B. But, for Markdown, you would surround the text with 2 asterisks on either side: `**text to be bolded**`.

This leads to several advantages:

- portability of the document
	- you wouldn't need to use a propriety tool
- mouse-free writing
- easier to control the formatting of text

Learn more: https://www.markdownguide.org/

## What to use Markdown for?

Documents, presentation slides, websites, notes... basically anything that is written with text can be generated with Markdown. There are so many tools out there for all these use-cases.

Unfortunately, because Markdown is fairly simple, it does not support more complicated formatting. *But*, the easy solution is to use Latex within Markdown! Just note that this is non-standard, so not all editors support this.

To set some expectations, this blog post does not aim to teach you Markdown *syntax*, but instead, it showcases the use-cases I personally use Markdown for, including the tools I use to enhance the effectiveness.

## Blog

This blog ***itself*** is written in Markdown!

<!-- TODO: write this section -->

## Presentation Slides

I used to use [Obsidian Advanced Slides](https://github.com/MSzturc/obsidian-advanced-slides) which is a wrapper around [reveal.js](https://revealjs.com/) to create my slides. But, after making the switch to my new editor, I would be using reveal.js directly.

This is the frontmatter that I was using:

```markdown
---
height: 1080
width: 1920
margin: 0.1
transition: none

# light theme
# downloaded (& adapted) from https://revealjs-themes.dzello.com/css/theme/sunblind.css
theme: css/robot-lung.css
# downloaded (& adapted) from https://github.com/nwinkler/reveal-highlight-themes/blob/master/styles/github.css
highlightTheme: css/github.css

maxScale: 1.0
slideNumber: true
pdfSeparateFragments: false
---
```

These are the CSS files I used: [robot-lung.css](https://jinwei.dev/blog/markdown-everything/robot-lung.css), and [github.css](https://jinwei.dev/blog/markdown-everything/github.css). Note: I do not own these, I only modified them. All credit goes to their original owners.

## Cheatsheets (multi-column documents)

For generating cheatsheets, I found that Latex was pretty much required to be able to have finer control over the formatting of the document. But, a large majority of the content is still written in Markdown! I only had to "drop down" to Latex for specific scenarios. These include the document's overall formatting, and tables (only an issue for multi-column documents).

```markdown
---
output: pdf_document
documentclass: article
classoption:
geometry: "paperwidth=210mm, paperheight=297mm, margin=0.5cm"
header-includes:
    - \usepackage{multicol}
    - \usepackage{tgtermes}
    - \usepackage{scrextend}
    - \changefontsizes{8pt} # font size
    - \usepackage[shortlabels]{enumitem}
    - \newcommand{\hideFromPandoc}[1]{#1}
    - \hideFromPandoc{
        \let\Begin\begin
        \let\End\end
      }
    - \pagenumbering{gobble} # removes page number
    - \setlist[itemize]{nosep,leftmargin=*,labelindent=0pt}
    - \setlist[enumerate]{nosep,leftmargin=*,labelindent=0pt} # reduce list indentation
---

<!-- define number of columns -->
\Begin{multicols}{2}

## Content

Markdown / Latex content goes here!

\End{multicols}
```

### Makefile

```make
# NAME = name of markdown source file (without `.md`).
NAME = finals
MD = $(NAME).md
PDF = $(NAME).pdf

PANDOC = pandoc
PANDOC_FLAGS = -f markdown -t pdf --pdf-engine=pdflatex

all: $(PDF)
.PHONY: all

$(PDF): $(MD)
	$(PANDOC) $(PANDOC_FLAGS) $(MD) -o $(PDF)

# Clean up the generated files.
clean:
	rm -f $(PDF)
```

### Tables

As mentioned previously, I was unable to generate tables with Markdown syntax as they were generated into `longtable`, which is incompatible with `multicols` document layout :/ The workaround I found was to write Latex instead.

If there's a way to force Pandoc to generate `tabular` instead of `longtable`, it would be perfect!

```latex
\begin{tabular}{|lp{3.2cm}p{3.2cm}|}
 \hline
Header 1 & Header 2 & Header 3 \\
 \hline\hline
A & B & C \\
 \hline
\end{tabular}
```

## Text Editor

I used to use [Obsidian](https://obsidian.md/) heavily but recently switched to [Neovim](https://neovim.io/).

Obsidian is great out of the box with many cool features like WYSIWYG (what you see is what you get). It even has Vim keybindings! So, you can immediately see the formatting of your text as you are writing it. Furthermore, it is a GUI (Graphical User Interface) application, so it is naturally better at rendering elements like images, and nested PDFs. It is also being actively developed by the team, and there are **many** community plugins for it.

However, even with all that, I found the lack of customisation *annoying*. Being a tinkerer, I *could* try to write Obsidian plugins to do what I want, but ultimately, I decided to try developing a note-taking setup in Neovim instead. With Neovim being Neovim, I was able to customise basically every aspect of the application.

With all that said, Neovim is definitely not for everyone! You would have to spend **a lot** of time developing and learning keybindings, installing and debugging plugins and configs, etc...

### Neovim Setup

I've found the following plugins really useful for Markdown editing:

- `vim-markdown`
- `vim-pandoc-syntax`
- `vim-json`

With these, I basically have WYSIWYG for a majority of Markdown's formatting options.

I also use [tmux](https://github.com/tmux/tmux/wiki) (a terminal multiplexer), enabling the ability to spawn multiple terminals and control them with just the keyboard.
