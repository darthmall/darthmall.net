---
title: "Back on Team Alphabetize"
date: 2023-02-17
tags:
- Web Dev
---

File this under stuff nobody asked me to write about, but I’m going back to alphabetizing my CSS declarations.
A year or two ago I got sold on ordering them “semantically”, but I’m ready to declare defeat.
<!-- excerpt -->
It’s a really great idea — I was using the [ordering proposed by 9elements](https://9elements.com/css-rule-order/).
To make this work I had to manually define the ordering for [stylelint-order](https://github.com/hudochenkov/stylelint-order).
Not such a big deal.
At some point, I could conceivably take the time to package this up for reuse.

The problem is that there are quite a few properties not included in the 9elements scheme: `isolation`, `contain`, and `filter`, to name a few.
Every time I encounter a property that’s not covered by this ordering, I have to stop and think about where it should go.
Sometimes it’s not obvious.
Moreover, I have to stop what I’m doing to add the property to my stylelint-order config.[^1]

Meanwhile, alphabetizing my declarations scales to any new properties the CSS working group cares to add.
I have to give barely any thought to where it should go.
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

But the thing is, even if I’m a master of all things CSS, that doesn’t mean I know your organization scheme.
[SMACSS](http://smacss.com/book/formatting#grouping) would have you put box-related declarations first, but 9elements goes for `content` first.
Why?
Just because the groups are based around a taxonomy of CSS declarations, doesn’t mean they’re not arbitrary, and it doesn’t mean they’re obvious to me.

So I’m going back to alphabetizing my declaratioons; not reluctantly, but enthusiastically.
In theory I love the idea of some kind of semantic grouping of declarations, but in practice I’ll be much happier to never have to think about ordering my CSS declarations again.

[^1]: Which would be exacerbated by me importing this from a separate package.
[^2]: Of course, if you want to enforce this across a team, you’ll want something that can be run in Git hooks and CI, but nobody has to configure a formatter in their editor just to fix the declaration order.
[^3]: I think this article may have been what prompted the discussion that lead me to try the 9elements ordering in my projects.
