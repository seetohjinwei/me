---
layout: ../../layouts/Blog.astro
title: "Git Notes"
tags: ["git"]
---

## Resources

https://git-scm.com/book/en/v2

## Setup

```shell
## list git config
git config -l
```

```
~/.gitconfig

[filter "lfs"]
	clean = git-lfs clean -- %f
	smudge = git-lfs smudge -- %f
	process = git-lfs filter-process
	required = true
[user]
	name = Jin Wei
	email = mail@gmail.com
[core]
	excludesfile = ~/.gitignore_global
	editor = vim
[color]
	ui = auto
[init]
	defaultBranch = main
```

```
~/.gitignore_global

.DS_Store
.swp
```

## Github

### Create new repo

```shell
echo "# me" >> README.md
git init
git add README.md
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/seetohjinwei/me.git
## -u sets the upstream
git push -u origin main
```

### Pushing Existing Repo

```shell
git remote add origin https://github.com/seetohjinwei/me.git
git branch -M main
git push -u origin main
```

## Branching

```shell
## show all local branches
git branch

## show all remote branches
git branch -r

## show all local AND remote branches
git branch -a

## checkout => "visit" the version at <branch name>
git checkout <branch name>

## create new branch with <new branch name> (does not checkout to it)
git branch <new branch name>

## creates a new branch with <new branch name> and immediately checks out to it
git checkout -b <new branch name>

## branch from non-main branch
git checkout -b <new branch name> <non-main branch>

## merge <branch> into the current branch
git merge <branch>

## no fast forward (creates a new commit that merges the 2 branches)
## fast forward (simply moves the HEAD pointer and does not make a new commit)
https://i.stack.imgur.com/FMD5h.png
git merge --no-ff <branch>

## rename current branch
git branch -m <new branch name>
## rename another branch
git branch -m <old branch name> <new branch name>

## to push the new branch name upstream
git push -u origin <new branch name>
## to delete the old branch upstream
git push origin --delete <old branch name>

## delete <branch name>
## NOTE: cannot delete the branch you are currently checked into
## NOTE: cannot delete if there are unmerged changes, refer to -D flag below
git branch -d <branch name>

## FORCE delete <branch name>
git branch -D <branch name>

## delete <branch name> at <remote name>
git push --delete <remote name> <branch name>

## update local list of remote branches
git remote update origin --prune

## change remote
git remote set-url <remote name> <remote link>
```

## Staging and Commits

Git commit ID is a SHA-1 hash. [more info](https://stackoverflow.com/questions/29106996/what-is-a-git-commit-id)

When executing commands requiring the commit ID, you only need the first few characters as long as it's unique.

```shell
## status on staging area and working tree
git status
gst (a very common alias, and mine)

## diff of what is changed but not staged
git diff

## diff of what is staged but not yet committed
git diff --staged

## add <file> to the staging area
git add <file>
## stage everything
git add .

## stage hunks of files
git add -p

## commit changes (opens your text editor)
## closing text editor with empty text cancels the commit
git commit

## commit changes with the <message>
git commit -m <message>

## remove <file> from the staging area
git reset <file>

## reset staging area to natch most recent commit (leaves working directory unchanged)
git reset

## similar to above but nukes changes in working directory
git reset --hard
## cleans any new files added
## -f stands for force & -d stands for directories
git clean -fd

## replaces last commit with the (new) staged changes and last commit COMBINED
## use with nothing staged to change the commit message
git commit --amend

## creates new commit called <commit> that undoes all the changes done in a particular commit
git revert <commit>

## stashes current changes to a stack (-u to include untracked files)
git stash -u
## similar to above but includes untracked & ignored files
git stash -all
## pops changes off the stash stack
git stash pop

## shows all commits
git log

## git log but with less details
git log --oneline
alias: git lol

## shows all commits with extra modifiers (looks pretty with less details)
git log --graph --oneline --all
```

## Push/Pull

```shell
## "publishes" the branch name in remote location origin
git push -u origin <branch name>

## pushes a particular branch to the remote location origin
git push origin <branch name>

## check if there are any changes in remote location
git fetch

## update remote changes in local repository
## essentially `git fetch` + `git merge FETCH_HEAD`
git pull
```

## Tags

[more info here](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
Git has two types of tags: **lightweight** and **annotated**.

Lightweight tags: only the commit checksum stored in a file (no other information is kept). To create a lightweight tag, don't supply `-a -s -m` flags when tagging.

By default, tags are not transferred to remote servers (on push).

Tags can replace commit hashes in most (all?) operations.

```shell
## shows all tags
git tag

## creates an annotated tag for the previous commit
## -m here is similar to -m while committing
## without -m flag, this command will open a text editor for a message
git tag -a <tag> -m "tagging message"

## show tag data along with the commit
git show <tag>

## creates a lightweight tag for the previous commit
git tag <tag>

## tag a previous commit
git tag -a v1.2 9fceb02

## deleting/removing a tag
git tag -d v1.4

## transfer tag to remote server
git push origin v1.5
## transfer all tags to remote server (that are not already there)
git push origin --tags

## remove tag name from remote server
## both act the same
git push origin :refs/tags/<tagname>
git push origin --delete <tagname>
```

## Forks

**Syncing a Fork with Upstream Repo**
https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork

**Forking Workflow**
Every member has their own fork of the upstream repo and they perform changes by

1. creating a branch in their own fork
2. do changes on that new branch
3. pull request their branch directly to the main upstream repo

\* sync changes from upstream repo to fork (as needed)

## Not Git

```shell
## gets word count of all *.lua files in directory recursively
( find ./ -name '*.lua' -print0 | xargs -0 cat ) | wc
## better version of above (but requires newer shell)
wc **/*.lua
```
