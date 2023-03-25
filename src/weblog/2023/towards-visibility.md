---
title: Towards Visibility
date: 2023-03-25
description: A look at some of the changes I made to my website as a result of the debate surrounding the need for a native “.visually-hidden” mechanism.
tags:
- Web Dev
- Accessibility
---

If you’re at all involved in web development and concerned with accessibility, there’s a good chance you saw one or more articles recently debating the idea of adding a native way to visually hide elements in the <abbr title="Document Object Model">DOM</abbr> without removing them from the accessibility tree. It kicked off when TPGi published a [breakdown of the `.visually-hidden` class](https://www.tpgi.com/the-anatomy-of-visually-hidden/) and my friend [Ben published an article](https://benmyers.dev/blog/native-visually-hidden/) suggesting that accessibility on the web might benefit from having a native, spec’d mechanism to do this. Then a couple of other accessibility experts published responses where they argued against adding a spec for visually hiding elements.
<!-- excerpt -->

I have my own thoughts about this and I plan to write about them, but in this post I thought I’d write about some changes I’ve made to my blog as a result of this debate.

## Visible Labels

I recently converted all of my [Nunjucks](https://mozilla.github.io/nunjucks/) templates to [WebC](https://github.com/11ty/webc). As I was going through the templates, I was surprised to find a number of them that used `aria-label`. Usually when I add `aria-label` or `.visually-hidden` to an element on a site, I find myself asking whether or not everyone would benefit from reading this text. If it’s helpful to someone using assistive technology, maybe it would also be helpful to someone who isn’t and I should just show it.

I left them in-place because I was trying not to get side-tracked by redesigning my site while I was just trying to move template engines, but reading through the arguments opposing a native `.visually-hidden` I became motivated enough to revisit my use of invisible accessible names.

### Unlabeled Icons

I had a couple of icons in my footer that had no visible labels: the link to my RSS feed and my CodePen profile. Both used `aria-label` to provide accessible names for the links. Generally speaking, I oppose unlabeled icons because there’s no guarantee that a person both recognizes what the icon is meant to be and correctly infers its purpose in the interface. And it’s very hard to search for an icon. A labeled icon, on the other hand, is more likely to be understood correctly, and failing that, the label can always be used as a search term.

Nonetheless, I opted for unlabeled icons because I thought they looked nice. I figured that social links like this are common enough in footers—at least I see them pretty regularly—and the stakes were pretty low. The worst outcome is that someone who doesn’t recognize the RSS logo clicks it and gets a face full of XML.

But in light of the debate over enshrining `.visually-hidden` in a spec, I was scrutinizing this decision more closely. I decided that, although it was probably _ok_ to have these icon-only links down there, I didn’t _need_ them to be unlabeled. There were few enough links, and I had enough space in the footer, that I could simply stack them vertically in a bulleted list and make the labels visible next to the icons.

### Post Metadata 

The other place I was a bit surprised to discover some use of `aria-label` on my site was in the metadata for blog posts: the published date and the list of tags. I suppose I thought that a person looking at the page layout could infer the meaning of these pieces of text, but that their location in the DOM was insufficient for a person relying on the accessibility tree, so I put accessible names in the markup.

I suppose a person might see a date at the beginning of a blog post and assume that it’s the publication date, but why make them guess? So I collected the metadata for each post into a description list so that there would be clear labels for everyone[^1], not just in the accessibility tree.

## Headings

I have to confess here that I was doing a bad thing on my homepage. There was no `<h1>`. I *could* have fixed the document outline without changing the design of the home page simply by adding a `.visually-hidden` heading. I surveyed a number of personal sites belonging to accessibility experts and a couple of them use this technique. But as with the previous examples, I figured if it’s useful for someone using a screenreader to know they’re looking at my “Latest Posts,” maybe it’s useful for someone looking at the page, too. So a visible `<h1>` it is.

I confess that of all the changes I made, I like this one the least, aesthetically. I liked the simplicity of the home page with no visible heading. But it’s fine and I have a hard time adding the `.visually-hidden` utility to my CSS *just* for the home page.

## Visible Skip Link

Perhaps the most unusual change I made to the design was making the skip link visible in the header. Scott O’Hara suggests that [skip links are a workaround](https://www.scottohara.me/blog/2023/03/21/visually-hidden-hack.html) for a missing browser feature: the ability to navigate a page using landmark regions. I’d never thought of it like that, but as someone who prefers to keep his hands on the homerow of his keyboard as much as possible, I would certainly appreciate some navigation shortcuts like this in my browser. That got me thinking that maybe the skip link isn’t just for people relying on assistive technology.

Especially given the ludicrous size of the headings on my blog posts[^2], I thought that maybe some folks might like a quick way to just jump right past the title and get to the text of the post. If nothing else, I had plenty of room in my spartan header that I could just remove the `.visually-hidden` styles from the skip link and it would fit right in to the header. It was easy to add it, and I have trouble imagining that it’s doing any harm.

## The Lone Instance of Hidden Text

There is one extant use of `aria-label` left on the site: the illustration of me that acts as a link to the homepage. It has an accessible name of “Home” provided by `aria-label` on the anchor element. I can’t really rationalize this decision, I just liked this element of the design as-is and chose not to change it.

## This is Not Advice

I’m not writing this to convince anyone they should eliminate visually hidden text from their site. I did this work because I wanted to see how far I could push such an exercise just for my own edification; although I do think my site is better for it (especially the metadata on blog posts).

Mostly I just wanted to step back from the question of “do we need a native mechanism for visually hiding elements” to share how the mere existence of the debate was educational for me. I appreciated how the debate provoked me to take a closer look at some of my own assumptions.

[^1]: Plus I’ll take any excuse to use a `<dl>`.
[^2]: Sorry, not sorry.
