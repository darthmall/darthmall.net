---
title: Web Native “Visually Hidden”
date: 2023-04-01
description: Two cents on the topic of native visually hidden elements for the web. You didn’t ask for it, but I delivered anyway.
tags:
- Web Dev
- Accessibility
---

I wrote previously about some [changes I made to the design of this site](/weblog/2023/towards-visibility/); changes that made text that was previously invisible on the page, but still exposed to assistive technology, visible to everyone. These changes were prompted by a debate in the accessibility community about whether or not it would be good to have a native mechanism to create “visually hidden” elements—that is to say, elements that aren’t visible on-screen, but which are represented to people by assistive technology.

To make a long story short, despite the fact that I chose to eliminate nearly all of the visually hidden text on my site, I’d still like to see a native `.visually-hidden` become part of a specification and implemented uniformly across browsers and assistive technology. Broadly speaking, there are three reasons I feel this way:

1. I don’t believe we will ever eliminate the need (let alone the desire) to visually hide text
2. The recommended ruleset changes over time because it’s tracking unspec’ed heuristics in assistive technology/browser combinations
3. The recommended ruleset is arcane and verbose, making it tempting to create your own (poorly tested) ruleset

## A little background

In November of 2022, TPGi published [The anatomy of visually-hidden](https://www.tpgi.com/the-anatomy-of-visually-hidden/) which breaks down how the recommended `.visually-hidden` ruleset works. It ends by suggesting that it might be nice to be able to just set `display: visually-hidden` in your CSS. Then, in March of 2023, my pal Ben offered his thoughts on why [the web needs a native `.visually-hidden`](https://benmyers.dev/blog/native-visually-hidden/).[^1] Shortly after Ben published his article, [Web Axe](http://www.webaxe.org/we-dont-need-visually-hidden/) and [Scott O’Hara](https://www.scottohara.me/blog/2023/03/21/visually-hidden-hack.html) both published articles voicing their opposition to the idea of having a native way to visually hide elements on the web.

I’d encourage you to (re)read those articles. It’s a lot to read, but there’s a lot of good information contained therein. I’ll do my best from here on to summarize honestly the points I’m addressing, but there are plenty of really great details in these articles that are worth your time and attention.[^2]

## Encouraging Universal Design

One of the main objections raised by both Scott O’hara and Web Axe is that we shouldn’t be <q>enshrining</q> the practice of visually hiding elements in the platform. Instead, we should be encouraging people design interfaces that work for as broad an audience as possible—[Universal Design](https://universaldesign.ie/what-is-universal-design/). Scott, in particular, does a good job of walking through a number of common uses for visually hidden elements and explaining how each of these is actually just a workaround for shortcomings in the platform—such as skip links—or in the design—such as repetitive calls-to-action.

And I tend to agree. I get a little uncomfortable whenever I reach for `.visually-hidden` or `aria-label`. If a label is useful to someone using assistive technology, maybe it’s useful to everyone. All the same, I am not confident that all visually hidden elements can be eliminated. And neither is Scott…

<figure>
<blockquote>
For better and worse, we will have instances where we need to visually hide content to mitigate a gap in the visual design. That’s not to say that every gap is necessarily due to a failure to incorporate accessibility in the design process.
</blockquote>
<figcaption>&#x2015;&#x202F;Scott O’Hara, <q>Visually hidden content is a hack that needs to be resolved, not enshrined</q></figcaption>
</figure>

And this is all assuming that we live in a world where nobody prioritizes their own taste over the usability of what they’re building. I would love it if people chose visible labels over unlabeled icons and plain old built-in controls over fancy, custom-styled controls, but I don’t think we’ll ever get there. I think there will always be designers, product owners, and managers who say things like, <q>none of our users are disabled,</q> or, <q>the design is cleaner without all of that text.</q>

As long as people are going to be visually hiding elements, I think it’s a good idea to help them do it in the best way possible. Which brings me to the rest of my argument: why I’m not satisfied with the current technique.

## There is no standard `.visually-hidden`

Sure, there’s a recommended ruleset for visually hiding elements, but it’s not a standard.

First, how do you find the recommended ruleset? If you happen to care about accessibility, chances are you know some reliable sources for this kind of information, and you’ll check there. If not, you might do a web search. The problem with both approaches, though, is that the internet has a long memory. You could easily find an outdated version of this ruleset. Or you may be copying the same ruleset you’ve been using for the past 10 years that you picked up from Twitter Bootstrap.

Second, although our goals for visually hidden elements remain the same—<i>i.e.</i> remove the element from document flow, make it invisible on-screen, but leave it in the accessibility tree—the techniques change over time because they are based on heuristics that exist in different browsers, different assistive technologies, and combinations of those two.

For example, the TPGi article notes that the current recommended ruleset sets the height and width of the visually hidden element to `1px` because giving an element with `overflow: hidden` zero dimensions can cause it to be removed from the accessibility tree. But there’s an update immediately following that paragraph suggesting that that heuristic may have changed, and that now you probably can set zero dimensions and it’s fine, but maybe stick with the `1px` dimensions just to be safe.

Scott’s article suggests that we might be able to [simplify our ruleset down to just two properties](https://codepen.io/scottohara/pen/QWVOqNY):

```css
.visually-hidden {
    position: absolute;
    transform: scale(0);
}
```

He exhorts people to test for themselves, but thorough accessibility testing like this is really difficult. It requires multiple browsers, operating systems, devices, and assistive technology. According to Scott’s CodePen, he’s tested this ruleset with combinations of JAWS, Narrator, NVDA, VoiceOver, and TalkBack in Edge, Firefox, Chrome, and Safari on iOS and Android (and I presume Windows), and yet he _still_ doesn’t actually recommend this ruleset, he simply suggests this might be sufficient, but you should test for yourself.

This is like the bad old days of web development when you couldn’t count on browsers even trying to implement the specs, let alone maintain any kind of parity as to which parts of the specs had been implemented. The only way we could be sure our sites worked everywhere they needed to was to have a bunch of browsers and operating systems, test them, and then come up with hacks to work around the parts that were different.

Having an actual standard that defines the behavior of a visually hidden element would eliminate a lot of this guess work. It would mean people wouldn’t have to hunt around for the most recent recommendation. It would mean we wouldn’t have to keep chasing unspecified heuristics that differ between browsers and screen readers and operating systems.[^3]

There is no substitute for testing. We should all be testing our software as much as we can. But specs make testing much easier.

## It’s hard to understand why `.visually-hidden` works

The last reason that I’m discontented with relying on a recommended ruleset for visually hiding elements is that it’s hard to understand what it’s doing. This is another symptom of the fact that it’s a collection of hacks that are based on the variety of heuristics that exist in browsers and assistive technology. The problem with not being able to understand the rule is that, as Scott points out in [Inclusively Hidden](https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html), there are actually different kinds of hidden elements.

In some cases, you want the `.visually-hidden` ruleset we’ve been discussing; the ruleset that removes an element—usually a piece of text used for an accessible name—from document flow, makes it invisible, and leaves it in the accessibility tree. But in some cases, maybe you want actually want the element to retain its size. For example, if you’re hiding a built-in form control to present a fancier custom representation of the same control. Or perhaps you have an element that is being staged offscreen and needs to be animated into view; in which case, you might use the older version of `.visually-hidden` which relied on absolutely positioning an element out of view using an extremely large negative position based on the writing mode.

Now Scott suggests that these different types of visually hidden elements are a reason why creating something like `display: visually-hidden` is a bad idea. The native visually hidden mechanism would only solve one of these uses and not the others. But I think the benefit would be that its purpose would be a lot easier to understand.

As it is, probably a small percentage of web developers understand how the `.visually-hidden` ruleset works. There isn’t really a definitive source that describes it, although TPGi’s article does a good job. If, however, this behavior were part of a spec, there would be a very clear, and authoritative definition of what it does. It could be documented on Mozilla Developer Network and web.dev. If the spec clearly states that an element with `display: visually-hidden` receives no pointer events, then you know you shouldn’t use this if you’re trying to hide a checkbox from view while leaving it clickable.

## Visually hidden elements are a desire path

The debate around this topic has by and large been really good for me. I’ve gained a deeper understanding of how the `.visually-hidden` ruleset works. It’s caused me to look more closely at my own decisions to visually hide text and re-motivated me to strive for universal design in my work.

But at the end of the day, I am not convinced that we can eliminate the need for visually hidden elements. They are [desire paths](https://en.wikipedia.org/wiki/Desire_path) that represent real needs—or at least wants—that will not likely disappear. So as long as people are going to be doing this, I think it’s best to help them do it in the most accessible way possible. The alternative seems to be to continue tolerating people using out-of-date or untested rulesets to visually hide elements.

## Acknowledgements

Thanks to [Ben](https://benmyers.dev/) for reviewing this post.

[^1]: Full disclosure: in addition to being friends with Ben, I am quoted in the article voicing my support for this idea.
[^2]: Like Scott’s [pattern for an accessible call-to-action](https://codepen.io/scottohara/pen/LYJgbrd) in a card. I seriously love this pattern and I am probably going to start using it.
[^3]: This wouldn’t happen immediately, of course. We’d need to continue using the recommended ruleset to support older software, but if this were added to a spec, there would come a day when the extant software supported it and we could retire these rules. Much the same way we no longer need to set `display: none` for the `hidden` attribute because it’s well-supported now.
