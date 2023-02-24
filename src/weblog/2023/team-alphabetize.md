---
title: "Back on Team Alphabetize"
date: 2023-02-17
tags:
- Web Dev
---

File this under stuff nobody wants to hear about, but I’m going back to alphabetizing my CSS declarations.
<!-- excerpt -->
A year or two ago I got sold on ordering them based on a taxonomy, but I’m ready to declare defeat.
Don’t get me wrong, a taxonomic ordering is a really great idea — I was using the [ordering proposed by 9elements](https://9elements.com/css-rule-order/).
To make this work I had to manually define the ordering for [stylelint-order](https://github.com/hudochenkov/stylelint-order).
Not such a big deal.
At some point, I could conceivably take the time to package this up for reuse.

The problem is that there are a few properties not included in the 9elements scheme: `isolation`, `contain`, and `filter`, for example.
Every time I encounter a property that’s not covered by this ordering, I have to stop and think about where it should go.
Sometimes it’s not obvious.
Moreover, I have to stop what I’m doing to add the property to my stylelint-order config.[^1]
This is true for any taxonomy you care to use, not just the 9elements ordering.

Meanwhile, alphabetizing my declarations scales to any new properties the CSS working group cares to add.
I barely have to give any thought to where it should go, because alphabetizing a list is practically second nature.
In fact, I don’t have to give it any thought, because I can just highlight the block of declarations in (Neo)Vim and `:sort` it.
Which is another point in favor of alphabetizing the declarations: I don’t even need a build tool to manage it.
Most of the editors I’ve used have a built-in “sort lines” feature.[^2]

[Eric Bailey wrote about alphabetizing declarations](https://ericwbailey.website/published/organize-your-css-declarations-alphabetically/) a couple of years ago.[^3]
He seemed somewhat disappointed that he was recommending alphabetizing declarations.

<figure>
<blockquote>
	This is a bummer because investing in CSS theory makes for better overall results—declaration organization approaches other than alphabetical do communicate, and therefore teach more advanced CSS concepts.
</blockquote>
<figcaption>&horbar;&#8239;Eric Bailey, <i>Organize your CSS declarations alphabetically</i></figcaption>
</figure>

But for me, the primary purpose of ordering something is to make it easier to update and find things.
I can see how a more taxonomic ordering might encourage people to learn more about CSS, but I’m more concerned about quickly finding the declaration I need and updating my CSS.
Even if I’m a master of all things CSS, that doesn’t mean I know your organization scheme.
[SMACSS](http://smacss.com/book/formatting#grouping) would have you put box-related declarations first, but 9elements goes for `content` first.
Why?

Just because the groups are based around a taxonomy of CSS declarations, doesn’t mean they’re not arbitrary, and it doesn’t mean they’re obvious to me.
The only way to find anything in your CSS rule is to have memorized whatever taxonomy you’re using to order things.

An alphabetical sort is arbitrary, but it is also the nearest thing to a universal organization scheme I’ve ever encountered.[^4]
Most anyone familiar with a language that uses the latin alphabet will be familiar with the concept of “alphabetical order” and will quickly recognize it when they see it.
This is why I’m such a booster of alphabetizing lists in pretty much any context.

So I’m going back to alphabetizing my declaratioons; not reluctantly, but enthusiastically.
In theory I love the idea of some kind of semantic grouping of declarations, but in practice I’ll be much happier to never have to think about ordering my CSS declarations again.

[^1]: Which would be exacerbated by me importing this from a separate package.
[^2]: Of course, if you want to enforce this across a team, you’ll want something that can be run in Git hooks and CI, but nobody has to configure a formatter in their editor just to fix the declaration order.
[^3]: I think this article may have been what prompted the discussion that lead me to try the 9elements ordering in my projects.
[^4]: It’s not universal, because [not every language has an alphabet](https://99percentinvisible.org/episode/alphabetical-order/).
