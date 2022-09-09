---
title: Astro on the Brain
date: 2022-09-09
tags:
  - Eleventy
  - Astro
  - Web Dev
description: A little blog-therapy. Talking through the aspects of Astro that are appealing to me and drawing me toward wasting time rewriting my website with Astro.
---

My interest in [Astro](https://astro.build/) has been growing slowly, and it’s causing an absurd reaction in my brain: the more interested in Astro I become, the more guilt I begin to feel because it feels disloyal to [Eleventy](https://11ty.dev/). It is, of course, absurd to feel disloyal to a piece of software. One might as well feel disloyal to a hammer, but here we are.

This is not a post where I compare two static site generators and declare one better than the the other. Nor is it a post where I attempt to identify contexts in which one is stronger than the other. I’m simply trying to articulate what it is about Astro that appeals to me when I look through the docs and what is engendering in me a desire to rewrite this website. In doing so, I suspect that I will find a lot of Astro’s appeal to me is its newness, and while I might choose it for a new project, it’s not worth sinking time into rewriting something that is already working great.

## Templates

Astro’s template language looks pretty nice. It feels a bit like a mixture of Svelte (great!) and JSX (less great). Allowing arbitrary JavaScript as a kind of frontmatter inside a fence (`---`) is pretty nice compared to Eleventy where you’d have to create a separate <samp>.11tydata.js</samp> with the same filename as your template that defines a class with a `data()` method. Come to think of it, I’m not even sure directory data files work with _layout_ templates, so maybe this is something that Eleventy can’t really even do?

It’s also really nice that Astro ships some [components for creating responsive images](https://docs.astro.build/en/guides/images/#picture--) that are similar to [Eleventy’s Image plugin](https://www.11ty.dev/docs/plugins/image/). The syntax in Astro — at least initially — seems much nicer.

<figure>

```jsx
<Picture src={...} widths={[200, 400, 800]} sizes="..." formats={["avif", "webp", "jpeg"]} />
```

<figcaption>Example use of Astro’s <code>Picture</code> component for generating responsive images</figcaption>

</figure>

It looks more like HTML and, at least to me, is more pleasant to look at than the `{{ "{% %}" }}` syntax of shortcodes in Nunjucks. But in practice, there’s really no difference between using Astro’s component and Eleventy’s shortcodes other than the characters surrounding the invocation.

<aside>

**Note:** A couple of hours after I started this draft, [Zach announced](https://twitter.com/zachleat/status/1568270015094464512) a new project: [WebC for single file web components](https://github.com/11ty/webc).

One thing that a person could do with this is implement a web component — `<11ty-image />`, for example — that uses the Eleventy Image plugin to transform and scale images. Running it through the WebC compiler would replace that custom element with the `<picture>` element. And now we have more HTML-like syntax à la Astro.

You could even use this compiler to replace `<img />` tags, instead of defining a custom element by creating a <samp>img.webc</samp>; although I have to say, I don’t know that I’m on board with this approach, as I think it masks what’s going on. It’s too magical to have a valid HTML tag transformed into a different HTML tag for my taste.

</aside>

Astro’s template language also supports named slots, which is great. [With Nunjucks macros](/weblog/2021/includes-and-macros/), you can effectively get one slot, and everything else has to be passed in as an argument. Up until this morning, you only got named slots in any Eleventy template via web components, which only worked once JavaScript upgraded your custom elements in the client. But this whole WebC thing looks like it’ll change that.

The thing I really dislike about Astro’s templates is the inline JavaScript. On the one hand, it’s powerful, and I’ve certainly been frustrated when using Nunjucks by the fact that only _some_ JavaScript is allowed in your tags while some JavaScript syntax causes errors. But I also think that the way Nunjucks or Svelte encourage you to get your data model right so that your templates remain simple is a more maintainable way to work. Allowing arbitrary JavaScript in the template itself makes it really easy to stuff your data transformations into your presentation layer, making your templates messy and hard to maintain.

## Template Reuse

Coming from Eleventy/Nunjucks it took me a minute to figure out how you were expected to reuse templates in Astro. There’s no [template inheritance](https://mozilla.github.io/nunjucks/templating.html#template-inheritance) or [layout chaining](https://www.11ty.dev/docs/layout-chaining/). You define a component for your base HTML — `<head>`, `<body>`, <i>etc.</i> — with a slot, and then [wrap subsequent templates](https://docs.astro.build/en/core-concepts/layouts/#sample-layout) with that base component to ensure your HTML boilerplate is in place. This feels more like a component framework like Svelte than a template language to me, but it’s a perfectly cromulent way to define reusable containers.

I don’t know that I think this is necessarily any better than Nunjucks’s inheritance. I do, however, think the _lack_ of layout chaining is great. I think layout chaining in Eleventy was a mistake. It’s confusing to offer an alternate mechanism to each template language’s built-in reuse mechanism. It’s difficult to explain to new people in the Eleventy Discord the difference between layout chaining and template inheritance. And I don’t think the ability to mix and match template language is all that useful, so mostly this just seems to be a source of confusion for new people.

<figure>

> There should be one– and preferably only one –obvious way to do it.

<figcaption><a href="https://en.wikipedia.org/wiki/Zen_of_Python#cite_note-8">The Zen of Python</a></figcaption>

</figure>

## Data Cascade

[The data cascade](https://www.11ty.dev/docs/data-cascade/) may be one of the best things about Eleventy, and Astro really doesn’t seem to have anything like it. Which means that there isn’t a good mechanism to do something like apply the same layout to all Markdown files in a directory. In Eleventy, I can just add a directory data file that defines the `layout` property and every Markdown file below that directory inherits that layout unless it gets overridden in the frontmatter. In Astro, you have to copy and paste the `layout` property to each page (or you can do a kind of hack using [frontmatter injection](https://docs.astro.build/en/guides/markdown-content/#injecting-frontmatter), but I have to imagine that could get kind of cumbersome).

## Including HTML Snippets

This is more of a function of the template languages that Eleventy supports than Eleventy itself, but I do think a built-in mechanism for just dumping some HTML into a page is handy. As far as I can tell, there is no equivalent of `{{ "{% include %}" }}` in Astro’s template language, so you’d probably have to build your own `<Include src="..." />` Astro component.

Why might you want this? Well, you could package up a web component with a `<template>` and `<script>` tag in an <samp>.html</samp> file and include it whenever you need it. For small, self-contained web components, this seems like a pretty great way to distribute them in a statically generated site. In Astro, you _could_ put the web component in an <samp>.astro</samp> component, but since it really is just an HTML snippet, it feels better to me to have it in an <samp>.html</samp> file and just dump that text verbatim into your template.

## Partial Hydration

One of Astro’s big selling points is that partial hydration is built right in. When Astro was first getting started, Eleventy didn’t have a story around partial hydration / islands architecture at all. But now there’s [is-land](https://github.com/11ty/is-land) which is a web component that you can use to partially hydrate Svelte, Vue, React, <i>etc.</i> components (it will even handle web components).

This is a case where my feelings on the two frameworks aren’t consistent. On the one hand, I appreciate that Astro offers partial hydration out-of-the-box; it makes it so easy to use. On the other hand, something I love about Eleventy is that it does the bare minimum of what you need and lets you add on more by really leaning into the web platform. This feels a little like the different philosophies of [Django](https://www.djangoproject.com/) and [Flask](https://flask.palletsprojects.com/en/2.2.x/). Django is very “batteries included” and Flask is not. These days I tend to prefer the Flask ecosystem when I’m writing Python web applications, but I got my start with Django, and it was much easier to learn web development through Django.

So I don’t know which I like better: having partial hydration there and ready for me if I need it, or being able to add it to the projects that need it using native web technologies…

---

There’s more to talk about here, like the different approaches to pagination or serverless routes, but most of what was drawing me to Astro was the template language; the syntax that looks mostly like HTML and the named slots. So I think we’ll just leave it here.

At least for now, I think I’ve convinced myself that there’s not enough that Astro has to offer to make it worth spending time rewriting anything. If I were starting a project from scratch today, though, who knows? Astro looks great and would definitely be worth a shot, but I think part of me will always be extremely partial to the way Zach really tries to embrace the web platform with tools like `<is-land>` and WebC.
