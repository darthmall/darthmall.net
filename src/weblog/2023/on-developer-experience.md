---
title: "On Developer Experience"
date: 2023-02-03
description: >-
  The other day, Andy Bell published a great post about how developer experience is a poor excuse for building shitty websites and it got me thinking, “What even is ‘developer experience’? Is it necessarily at odds with user experience?”
---

The other day, [Andy Bell](https://bell.bz/@andy) published a great post about how [developer experience is a poor excuse for building shitty websites](https://andy-bell.co.uk/speed-for-who/) and it got me thinking, “What even is ‘developer experience’? Is it necessarily at odds with user experience?”
In truth, I think it may have gotten a bit of a bad wrap because it has been so thoughtlessly trotted out as an excuse to make shitty websites.
Which is not to say I disagree with Andy’s assessment; he is spot on.
I’m just beginning to think that&thinsp;—&thinsp;on the whole&thinsp;—&thinsp;developer experience is neither here nor there when it comes to user experience.

And just to be crystal clear: I’m not playing devil’s advocate; I’m not trying to move the goal posts by making a pedantic argument about the definition of “developer experience”; and I am certainly _not_ defending the argument that “a good developer experience is good for user experience.”
Like Andy, I think we need to put user’s needs above our own.

## A Definition of DX

For whatever reason, the question that popped into my head after reading Andy’s post was, “what does it even mean to ‘make developer experience better’”?
The conclusion I came to is that it just means making hard things easier.
That might mean providing utilities or even a framework for solving difficult problems, or it might just mean eliminating some tedious boilerplate.
Either way, when people say that something has a better developer experience&thinsp;—&thinsp;or “DX”&thinsp;—&thinsp;I think they often mean that it makes programming a little easier.

<aside>

I think another facet of “better DX” is how much a person enjoys working with a tool.
That’s somewhat related to it making work easier, but it’s also a bit of personal preference.
React, Vue, and Svelte all make a certain class of problem easier to solve, but I just can’t get on board with JSX and its JavaScript-first approach to building on the web.
I’d prefer to work with Vue or Svelte if I’m trying to solve a problem for which they’re well-suited.
But that’s personal preference.

</aside>

## The Logical Fallacy in the Good DX Argument

The problem with the “good DX” argument is that it’s usually framed as “making developers more productive leads to developers creating better user experiences”.[^1]
But that would only be true if the hard things that are now easy improve UX, or if developers choose to take the time they would’ve spent doing these hard things and spend it solving problems that actually do improve UX.

Neither of those things are given.
Developers could choose to translate their new-found productivity into cranking out more features rather than improving the quality of the thing they just made.
Or maybe the “better DX” is for solving a class of problems that make very little difference to UX, as is often the case with these client-side JavaScript frameworks.

Better UX is a _possible_ outcome of better DX, but it is not guaranteed.
There is no causal relationship between more productive programmers and better UX.
Sometimes more productive programmers just leads to more software.

## When DX Can Improve UX

<figure>
	<blockquote>
		I’ve always found the focus on developer experience as a framework feature uncomfortable. The focus is all in the wrong place: spoiled developers vs people trying to use your website/app.
	</blockquote>
	<figcaption>&horbar;&#8239;Andy Bell, <a href="https://andy-bell.co.uk/speed-for-who/">Speed for Who?</a></figcaption>
</figure>

This, I think, is the real crux: from what point are you starting when you try to improve developer experience?
If we take it for granted that our job as web developers is to create fast, reliable, responsive, accessible websites for people, _then_ we can ask the question: what makes living up to those responsibilities hard?
If we can find ways to make it easier to build fast, reliable, responsive, accessible websites, then perhaps we can actually improve UX by improving DX.

For example, [Islands Architecture](https://www.patterns.dev/posts/islands-architecture/) is a pattern that can meaningfully improve UX for a lot of websites.
You use JavaScript only for small pockets of interactivity, so one JavaScript error won’t tank the whole site.
JavaScript is only loaded when it’s needed, so you can save bandwidth and render the site faster.
Of course setting it up is a little more work because you can’t just drop a script tag to your whole JavaScript bundle in the `<head>` of your website.

Enter [Zach Leatherman](https://fediverse.zachleat.com/@zachleat)’s [&lt;is-land>](https://github.com/11ty/is-land) web component.
You can wrap some fallback HTML with this component, tell it what JavaScript to load and under what conditions, and it will handle fetching the JavaScript and hydrating your fallback content for you.
This is pretty good DX, although it’s never framed that way.
Still, `<is-land>` is an example of making a hard programming problem easier to solve, and it’s a programming problem that, when solved, creates a better user experience.

## Context Matters

Good user experience is contextual.
What makes for a good experience on the [Science On a Sphere](https://sos.noaa.gov/) website is not the same thing that makes for a good experience on Zoom.[^2]
Part of what I think went wrong with the mass adoption of these client-side JavaScript frameworks is that the problems they’re meant to solve aren’t problems that needed solving on many of the websites that adopted them.[^3]
In fact, the solutions they provided were actually often problems in the contexts in which they were used.

Perhaps developer experience, like user experience, is not universal.
When a tool claims it has good developer experience, maybe we should get in the habit of asking, “which experiences?”
If a tool helps you solve problems you don’t even have, is it really a better experience?

Figure out what it takes to provide good experiences for your users[^4] and only then can you know how to improve your developer experience to benefit your users.

[^1]: It’s kind of like trickle down economics for software developers.
[^2]: Don’t make this about websites <i>vs.</i> webapps. It doesn’t matter if you think you think you’re buiding an app or not, what matters is you understand your users’ needs and recognize that not all websites have the same problems to solve.
[^3]: It has been said many times that React was developed to solve Facebook’s problems. Very, very few websites have Facebook’s problems.
[^4]: I mean actually figure it out. Do some user research. Do some testing. Don’t just assume that using JavaScript to load JSON is going to be a better experience than letting the browser fetch and render a new HTML document.
