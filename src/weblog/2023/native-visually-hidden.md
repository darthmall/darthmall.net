---
title: Web Native “Visually Hidden”
---

If you’re at all involved in web development and concerned with accessibility, there’s a good chance you saw one or more articles recently debating the idea of adding a native way to visually hide elements in the <abbr>DOM</abbr> without removing them from the accessibility tree. It kicked off when my friend [Ben published an article](https://benmyers.dev/blog/native-visually-hidden/) suggesting that accessibility on the web might benefit from having a native spec’ed method to do this. Then a couple of other accessibility experts published responses where they argued against adding a spec for visually hiding elements.
<!-- excerpt -->

I have my own thoughts about this and I plan to write about them, but in this post I thought I’d write about some changes I’ve made to my blog as a result of this debate. In particular, [Scott O’Hara’s response to Ben](https://www.scottohara.me/blog/2023/03/21/visually-hidden-hack.html)’s article made some arguments that prompted me to reconsider some of the design decisions I’d made when I built this site.

## Scott’s Argument (in a Nutshell)

Well, that’s not really fair. Scott makes multiple arguments, and the post is definitely worth a (re)read to hear all of them. But a theme I picked on that was relevant to this website was the idea that often the need for visually hidden elements is symptomatic of design decisions that could just be changed. One example Scott gives is the classic “Read more” link at the bottom of every card in a collection of articles. Scott points out that instead of using `aria-label` (which is usually not translated by translation services) or visually hidden text to make each call-to-action distinct, you could just drop those links and make the article title itself a link.

## Labeled Icons

## Headings

## Visible Skip Link

## This is Not Advice




http://www.webaxe.org/we-dont-need-visually-hidden/

## Related Reading

https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html
https://www.tpgi.com/the-anatomy-of-visually-hidden/
