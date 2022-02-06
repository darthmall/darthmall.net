---
title: "Webmentions: Joining the IndieWeb"
date: 2021-01-18
description: >-
    Webmentions are now live on the site, powered by webmention.io! I've been
    meaning to do this for ages. I'm very excited to finally getting around to
    joining the IndieWeb.
tags: ["Eleventy", "IndieWeb", "Web Dev"]
---

Finally! I'm very excited to have webmentions up and running (I hope). I've been
planning to support webmentions on here since before I launched this site and I
think I have it working. It's a little bit hard to test before you launch the
thing, so I guess we'll see.

## What's a Webmention?

Basically a [webmention](https://indieweb.org/Webmention) is just a way for you
to respond or react to something on someone else's site. On Mastodon (or
Twitter) you might reply to the toot (tweet), or boost (retweet) it. On a
WordPress blog you might leave a comment. A webmention is a kind of generic way
of doing all of those things across platforms.

I like to think of webmentions as the modern equivalent of how mathematicians
and scientists used to publish essays in response to one another's work. I write
up my [thoughts about privacy](/weblog/2019/anonymity-vs-privacy/). You read it and
have your own take, which you then write up on your own site. Then you send me a
webmention which does two things: first, it lets me know that you've written up
a response; second, it enables me to put a link on my site to your response so
that readers find your response as well.

This also works for toots or whatever. All that is required is that you link to
the post on my site in your writing. Then, you send me the URL to the thing you
wrote that contains the link to the thing I wrote and we've got a webmention!

### Ok, fine, but _how_ do I send you the link?

I'm so glad you asked. There's a small form at the bottom of each of these posts
where you can enter the URL for the thing you wrote that links to the thing I
wrote. Click "Send" and we're off to the races.

It'll take a day or so for the webmention to show up on here, because this site
is statically generated and only updates once a day (unless I publish something
new).

## Why are you so excited about this?

I like the idea of liberating our thoughts from the various — sometimes
impoverished — silos in which they currently exist on the web. I like the idea
that I can write up my thoughts however I want; I can art-direct individual
posts or build fun interactions with CSS and JavaScript. And you can do the
same! _And_ we can still be engaging in conversation.

And hopefully, because our conversation is not subject to character limits, or
run through the meat grinder of a recommendation algorithm, our conversation can
be more thoughtful.

As I said, I like to imagine that we are modern day philosophers publishing
essays in response to each other's work. It's a romantic notion that I find
appealing.

## Technical Gotchas

I'm not going to go into the details of how I set up webmentions in Eleventy,
since there are already several very good posts on the subject. Just scroll on
down to the [References](#references) section.

I did, however, run into one issue following the instructions in both Sia's and
Max's tutorials, which I thought was worth pointing out.

### IndieAuth

In addition to signing into [webmention.io](https://webmention.io) with my
domain, I had to make sure I was set up for [IndieAuth](https://indieauth.com/).

In a nutshell, the way this works is you have a link (either an `<a>` or
`<link>` tag) on your site with `rel="me"` pointing to another account you
control like your GitHub or Twitter profile. Then, in that profile, you need a
link back to your home page that also has `rel="me"`. This proves to IndieAuth
that you control both pages.

It took me a long time to figure this out because it wasn't included in any of
the tutorials I looked at. My guess is that the authors had set up these
backlinks from their public profiles before they set up webmentions, so they
never noticed. Since I'm being snobby about which services I advertise (I'm
pleased with neither GitHub nor Twitter), I didn't have links to those profiles
from this website.

## References

- [An In-Depth Tutorial of Webmentions +
  Eleventy](https://sia.codes/posts/webmentions-eleventy-in-depth/) by Sia
  Karamalegos
- [Making Persistent Build Folders in
  Netlify](https://mxb.dev/blog/persistent-build-folders-netlify/) by Max Böck
- [Adding Webmention Support to a Static
  Site](https://keithjgrant.com/posts/2019/02/adding-webmention-support-to-a-static-site/)
  by Keith J. Grant (for specifics on microformats)
- [Scheduling Netlify deploys with GitHub
  Actions](https://www.voorhoede.nl/en/blog/scheduling-netlify-deploys-with-github-actions/)
  by Thadee
- [Grow the IndieWeb with
  Webmentions](https://amberwilson.co.uk/blog/grow-the-indieweb-with-webmentions/)
  by Amber Wilson

