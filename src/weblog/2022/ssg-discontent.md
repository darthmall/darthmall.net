---
title: Discontent
date: 2022-09-09
---

My interest in [Astro](https://astro.build/) has been growing slowly, and it’s causing an absurd reaction in my brain: the more interested in Astro I become, the more guilt I begin to feel because it feels disloyal to [Eleventy](https://11ty.dev/). It is, of course, absurd to feel disloyal to a piece of software. One might as well feel disloyal to a hammer, but here we are.

Things I think Astro really gets right:

## Templates

Astro’s template language looks pretty nice. It feels a bit like a mixture of Svelte (great!) and JSX (less great). Allowing arbitrary JavaScript as a kind of frontmatter inside a fence (`---`) is pretty nice compared to Eleventy where you’d have to create a separate <samp>.11tydata.js</samp> with the same filename as your template that defines a class with a `data()` method.

I don’t love the JavaScript in the templates, though. On the one hand, it’s powerful, and I’ve certainly been frustrated in Nunjucks by the fact that only _some_ JavaScript is allowed in your tags, but some JavaScript syntax causes errors. But I also think that the way Nunjucks or Svelte encourage you get your data model right so that your templates remain simple is a more maintainable way to work. Too much logic directly in your template makes it hard to read and maintain.

I actually really like the model for template reuse in Astro, but coming from Eleventy/Nunjucks it took me a minute to figure out how you were expected to do it. There’s no template inheritance or layout chaining. You define a component for your base HTML — `<head>`, `<body>`, <i>etc.</i> — with a slot, and then wrap subsequent templates with that base component to ensure your HTML boilerplate is in place. I don’t know that I think this is necessarily any better than Nunjucks inheritance, I think the lack of layout chaining is great. I think layout chaining in Eleventy was a mistake. It’s confusing to offer an alternate mechanism to each template language’s built-in reuse mechanism. It’s difficult in the Eleventy Discord trying to explain to new people the difference betwee layout chaining and template inheritance. And I don’t think the ability to mix and match template language is all that useful.

Things I think Eleventy really gets right:

## Data Cascade

Astro really doesn’t seem to have anything like this. Which means that there isn’t a good mechanism to do something like apply the same layout to all Markdown files in a directory. In Eleventy, I can just add a directory data file that defines the `layout` property and every Markdown file below that directory inherits that layout unless it gets overridden in the frontmatter. In Astro, you have to copy and paste the `layout` property to each page (or you can do a kind of hack using [frontmatter injection](https://docs.astro.build/en/guides/markdown-content/#injecting-frontmatter), but I have to imagine that could get kind of cumbersome).

## Including HTML Snippets

This is more of a function of the template languages that Eleventy supports than Eleventy itself, but I do think a built-in mechanism for just dumping some HTML into a page is handy. As far as I can tell, there is no equivalent of `{% include %}` in Astro’s template language, so you’d probably have to build your own `<Include src="..." />` Astro component. Why might you want this? You could package up a web component with a `<template>` and `<script>` tag in an <samp>.html</samp> file and include it whenever you need it. In Astro, you _could_ do this as an <samp>.astro</samp> component, but since it really is just an HTML snippet, it feels better to me to have it in an HTML snippet.
