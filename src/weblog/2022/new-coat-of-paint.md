---
title: New Coat of Paint
date: 2022-02-06
tags:
    - Folderol
---

In the grand tradition of web developers everywhere, I have redesigned my website. Hopefully for the last time.

<blockquote>
<p>Once you choose the technology that runs your blog, use it. Don’t replace it, ever. Never ever <a href="https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/">rewrite it</a>.</p>
— Tom MacWright, <a href="https://macwright.com/2019/02/06/how-to-blog.html">How to Blog</a>
</blockquote>

I admire the fact that Tom MacWright’s website has had the same theme for about 10 years. He’s been tweaking it now and then to improve it, but he doesn’t spend time rebuilding his website from scratch (like I just did).

Some folks have personal websites that are astounding—[Lynn Fisher](https://lynnandtonic.com/), [Cassie Evans](https://www.cassie.codes/), [George Francis](https://georgefrancis.dev/), [Miriam Suzanne](https://www.miriamsuzanne.com/), and [Josh Comeau](https://www.joshwcomeau.com/) all come to mind. Their websites are colorful and playful; their websites are showcases of their skill. I had set out to create something similar for myself, but after spending two weeks fiddling with a grid layout and a bunch of media queries, and making very little progress on my to-do list for the site, I decided it might be a good idea to scale back my ambitions.

I realized that the redesign wasn’t a fun side project for me, it was a distraction from fun side projects. What I want out of my website is something simple, legible, and resilient that I don’t have to worry about so that I can focus on making the things that _are_ interesting to me.

## Highlights of the Redesign

### Figure Layouts

Figures in the old design extended past the right edge of the surrounding paragraphs and always looked lopsided to me. I also didn’t have a good solution for handling multiple images in a single figure. I finally solved both of these problems.

This and adding a dark theme were the two reasons I felt compelled to redesign the site at all.

### Dark Theme

I use dark themes on all my devices, but the old design for the site didn’t have a dark theme. Visiting my own website would often make me wince because of how bright it was.

### Theme Toggle

If you enable `privacy.resistFingerprinting` in Firefox, `prefers-color-scheme` always resolves to `light`. So without a theme toggle on your site, you’re relegating everyone trying to protect their privacy to a light theme.

I wish fingerprinting were illegal so that people don’t have to choose between accessibility and privacy, but as long as that’s the world we live in, I’ll try to help people have both.

### Share Sketches and Pens

I don’t blog a lot, and I don’t aspire to be a writer/blogger, so I thought it would be nice to have a place that I could share pens from CodePen, sketches from OpenProcessing, and other experiments alongside my infrequent blog posts.

They’ll show up in the [RSS feed](/feed.xml), too.

## Influences

There were several people whose websites I was looking at quite a lot during this process—not to copy them, but to try to understand how they struck a balance between beauty and simplicity.

[Tom MacWright](https://macwright.com/), as I already mentioned, was the primary inspiration for creating a simple website that wouldn’t distract me from creating stuff for the website.

[Max Böck](https://mxb.dev/)’s website gave me the idea to center the page titles so that I could have very large type with an appropriate line length while maintaining a sense of balance over the text below it. I never think to center align things.

[Thomas Semmler](https://helloyes.dev/)’s website has the “Report an Accessibility Issue” link. It is a brilliant idea and I think everyone should have one.

[Heydon Pickering](https://heydonworks.com/)’s website was an inspiration for the color palette. You can do a lot with just black and white, and with several shades of gray, you can do even more. I nearly went with a fully monochrome design, but at the last minute decided that a little color used for links would be helpful.

[Robin Rendle](https://www.robinrendle.com/). Not gonna lie, I basically just copied Robin Rendle’s design for blog post summaries in my archive. It was exactly the design I was looking for.
