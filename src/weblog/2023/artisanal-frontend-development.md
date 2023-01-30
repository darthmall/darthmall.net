---
title: Artisanal Frontend Development
date: 2023-01-21
description: >-
  A response (of sorts) to Robb Owen’s “Hand-thrown frontends”.
tags:
- Bring Back Blogging
- Web Dev
---

Robb Owen had a nice post about how his [frontend development process](https://robbowen.digital/wrote-about/hand-thrown-frontends/) is more like making a bowl from clay than it is assembling Lego bricks.
The gist is that he’s not snapping together prefabricated pieces into a user interface, he builds the UI up over multiple passes.
Each pass over the user interface refines it, makes it a little better.
And each user interface is a little different, as each lump of clay might be a little different.

The part that really stuck out to me was this:

> On a surface-level it probably doesn't seem like it's as efficient as assembling Lego bricks to order, but over time you'll make more bowls and each phase of iteration will gradually shorten as your skill increases towards mastery.

This is a lot like how I work.
I haven’t built up a library of reusable charts.
I don’t use a charting library.
Instead I build the charts in each project to meet the needs of that project.
The more times that I’ve built a line chart — or a histogram or a map — the easier it becomes, and the faster it goes.

I could perhaps spend time and energy building up a library of reusable charts, but the complexity of those components would likely just increase over time.
I’d need components that could handle different axis styles, different types of interactions, different annotations.
I’d end up with chart components that had a lot of code that wasn’t necessarily all in use on any given project.[^1]
But all that code would have to be there to account for the possibility that it might be needed.

Instead I prefer to build exactly the chart that’s needed for a given project.
Over time you get good at building these charts, so they don’t take as much time.
You learn which parts to throw in and which to leave out based on the project’s needs.
This scatterplot needs to support selection of individual points?
Maybe throw in a quadtree.
This one should show tooltips on hover?
Use an invisible voronoi diagram overlaid on the chart to detect mouse events and identify the nearest point.

Instead of programming with components, you’re programming with patterns.[^2]
The more you do it, the more patterns you learn.

It’s not the only way to build software, but it is _a_ way to build software.
And I enjoy it.

[^1]: This is why I eschew off-the-shelf charting libraries.
[^2]: I do of course use components to organize code and to make it possible to reuse the component within the project. But the components don’t travel outside of the project, generally.
