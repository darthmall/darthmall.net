---
title: "On Developer Experience"
date: 2023-02-01
---

The other day, [Andy Bell](https://bell.bz/@andy) published a great post about how [developer experience is a poor excuse for building shitty websites](https://andy-bell.co.uk/speed-for-who/), and it got me thinking, “What even is ‘developer experience’?” In truth, I think it may have gotten a bit of a bad wrap because it has been so thoughtlessly trotted out as an excuse to make shitty websites. Which is not to say I disagree with Andy’s assessment; he is spot on. I’m just beginning to think that&thinsp;—&thinsp;on the whole&thinsp;—&thinsp;developer experience is neither here nor there when it comes to user experience.
<!-- excerpt -->

So just to be crystal clear: I’m not playing devil’s advocate; I’m not trying to move the goal posts by making a pedantic argument about the definition of “developer experience”; and I am certainly _not_ defending the argument that “a good developer experience is good for user experience.” Like Andy, I put user’s needs above my own.

## A Definition of DX

For whatever reason, the question that popped into my head after reading Andy’s post was, “what does it even mean to ‘make developer experience better’”? The conclusion I came to is that it just means making hard things easier. That might mean providing utilities or even a framework for solving difficult problems, or it might just mean eliminating some tedious boilerplate. Either way, when people say that something has a better developer experience&thinsp;—&thinsp;or “DX”&thinsp;—&thinsp;I think they often mean that it makes programming a little easier.

<aside>

I think another facet of “better DX” is how much a person enjoys working with a tool. That’s somewhat related to it making work easier, but it’s also a bit of personal preference. React, Vue, and Svelte all make a certain class of problem&thinsp;—&thinsp;a certain type of website&thinsp;—&thinsp;easier to build, but I just can’t get on board with JSX and its JavaScript-first approach to building on the web. I’d prefer to work with Vue or Svelte, if I’m trying to solve a problem for which they’re well-suited.

</aside>

## The Logical Fallacy in the Good DX Argument

The problem with the “good DX” argument is that it’s usually framed as “making developers more productive leads to developers creating better user experiences”. But that would only be true if the hard things that are now easy improve UX, or if developers choose to take the time they would’ve spent doing these hard things and spend it solving problems that actually do improve UX.

Neither of those things are given. Developers could choose to translate their new-found productivity into cranking out more features, or more applications, rather than improving the quality of the thing they just made. Or maybe the “better DX” is for solving a class of problems that make very little difference to UX, as is often the case with these client-side JavaScript frameworks.

Better UX is a _possible_ outcome of better DX, but it is not guaranteed. There is no causal relationship between more productive programmers and a better UX. Sometimes more productive programmers just leads to more software.

## When DX Can Improve UX

<figure>
	<blockquote>
		I’ve always found the focus on developer experience as a framework feature uncomfortable. The focus is all in the wrong place: spoiled developers vs people trying to use your website/app.
	</blockquote>
	<figcaption>&horbar;&#8239;Andy Bell, <a href="https://andy-bell.co.uk/speed-for-who/">Speed for Who?</a></figcaption>
</figure>

This, I think, is the real crux. From what point are you starting when you try to improve developer experience? If we take it for granted&thinsp;—&thinsp;as I do&thinsp;—&thinsp;that our job as web developers is to create fast, reliable, responsive, accessible websites for people, then we can ask the question: what makes living up to those responsibilities hard. If we can find ways to make it easier to build fast, reliable, responsive, accessible websites, then we can actually improve UX by improving DX.

I think [Zach Leatherman](https://fediverse.zachleat.com/@zachleat)’s [&lt;is-land>](https://github.com/11ty/is-land) project is a good example of this. I want to use as little JavaScript as possible; it’s only for things that I can’t do any other way, or for enhancements to the experience that are optional. Ideally, I don’t want to load this JavaScript until it’s needed, if it’s needed at all, so that fetching and parsing the JavaScript doesn’t interfere with the essential parts of the site.

Managing the process of fetching the JavaScript when it’s needed&thinsp;—&thinsp;possibly in response to some element on the page scrolling into view, or near enough&thinsp;—&thinsp;and then hydrating some existing elements that are there in case the JavaScript fails, is kind of a difficult problem. And it’s probably a little bit different depending on how you write your JavaScript, if you’re using, say, Vue or native Web Components.

This so-called “islands architecture” is increasingly popular because it is an approach to web development that for many websites creates a better user experience. It is not completely reliant on JavaScript, so it is fast and resilient, but you don’t have to forego JavaScript altogether. It can even cut down on bandwidth usage and speed up the initial rendering because it defers loading the JavaScript until it’s actually needed. If the JavaScript is for a component halfway down the page that a visitor never sees, the JavaScript isn’t even loaded.

Since `<is-land>` is a native Web Component, you can drop it into pretty much any project and it will handle all of this for you. Zach identified some tasks that we as developers need to do to create a better user experience, and then improved the developer experience for those tasks.

## Taking DX on the Chin

Andy says that perhaps we need to “[take] a bit of DX on the chin”, which is something I think about often. I find [stackless development](https://tutorials.yax.com/articles/build-websites-the-yax-way/quicktakes/what-is-the-yax-way.html) really appealing. I dislike configuring build tools, and I really dislike coming back to an old project and finding the build broken and having to figure out how to use a build system that no one uses anymore.

_But_ sometimes a bundler might actually result in a slightly better user experience. If you’re relying on some libraries in your JavaScript, loading all of the code into the browser could be kinda slow if you rely just on ECMAScrpt modules. The browser has to lead each module before it can find out what its dependencies are, and then it has to load them to find out if they have any dependencies. Additionally, if you’re only using a small part of the library, you may be loading the entire thing even if you don’t need it. A bundler that can tree-shake out only the bits you need, and reduce your HTTP requests to a single file can speed things up quite a bit and save some data. So as much as I dislike having to use a bundler, sometimes I do.

## Context Matters

Good user experience is contextual. What makes for a good experience on the [Science On a Sphere](https://sos.noaa.gov/) website is not the same thing that makes for a good experience on Google Sheets. Part of what I think went wrong with the mass adoption of these client-side JavaScript frameworks is that the problems they’re meant to solve aren’t problems that needed solving on many of the websites that adopted them. In fact, the solutions they provided were actually often problems in the contexts in which they were used. The reliance on JavaScript meant that pages loaded more slowly and were more brittle.

Perhaps developer experience, like user experience, is not universal.
