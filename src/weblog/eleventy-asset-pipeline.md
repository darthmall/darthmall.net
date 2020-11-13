---
title: Asset Pipelines in Eleventy
date: 2020-11-13
tags:
    - Eleventy
    - Web Dev
description: >-
    This is a clever trick (probably too clever) for setting up Eleventy to
    manage asset pipelines like SCSS and JavaScript transformations, as well
    as using hashes in filenames for cache busting.
---

There's currently an enhancement requested for Eleventy to offer some kind of
[official asset pipeline](https://github.com/11ty/eleventy/issues/272). I was
thinking about this problem at work (where I'm rebuilding the [Science On a
Sphere website](https://sos.noaa.gov/) in Eleventy) and came up with a Clever
Hack&trade; using Eleventy's computed data, pagination, collections, and
filters. Like I said, this is probably too clever.

## Goals for the pipeline

### Minimal dependencies

<aside><p>
    Jim Nelson's <a
    href="https://blog.jim-nielsen.com/2020/cheating-entropy-with-native-web-tech/">Cheating
    Entropy with Native Web Technologies</a> really spoke to me.
</p></aside>

On any project, I like to keep my dependencies as minimal as possible. It's
easier for other people to set up, and it's less likely that something I rely
on will go away or break in the future, forcing me to waste time rewriting
something. So if I can avoid it, I prefer not to have to add a special task
runner or bundler like [Gulp](https://gulpjs.com/) or
[webpack](https://webpack.js.org/) if I can avoid it.

<aside><p>
    I actually really like Gulp, in large part because it doesn't require me
    to install a bunch of extra plugins. It works great with Promises, which
    are pretty common in dev tool APIs now, so I can usually just write some
    JS functions that return the results of calling whatever tool.
</p></aside>

### Minimal NPM scripts

A lot of people like to use NPM scripts to run tasks. So do I. As I said, if
I can get away with adding dependencies, I will. It's not a stretch that
someone working on a Node project already has NPM, so `npm run build` should
just work for them. But I don't like it when you get ridiculously long tasks
all being `&&`ed together. It's especially bad since these have to live in
`package.json`, and you can't wrap the lines in JSON to make it easier to
read.

Plus, half the time you end up installing a bunch of dependencies anyway to
run things concurrently, because `&` doesn't work reliably on Windows the way
`&&` does.

## The Gist

The way this technique works is by exposing an array using [JavaScript data
files](https://www.11ty.dev/docs/data-js/) that contains the contents of, for
example, CSS compiled from SCSS along with some metadata. You then use the
technique for [creating pages from
data](https://www.11ty.dev/docs/pages-from-data/) to output each element of
the array to a file, using the permalink to put it in the right place with
the right file extension (_e.g._ `css/foo.css`). The template that paginates
these assets into individual files also puts them in a collection (_e.g._
"_styles"), which you can then use in your layouts to find the assets' URLs
for your `<link>` or `<script>` tags.

Clear as mud, right?
