---
title: Includes and Macros
date: 2021-11-02
description: >-
    Comparing techniques for encapsulating HTML components in Nunjucks or
    Jinja2.
tags:
    - Eleventy
    - Nunjucks
    - Jinja2
---

When you're working with [Nunjucks](https://mozilla.github.io/nunjucks/) (or
[Jinja2](https://jinja.palletsprojects.com/en/3.0.x/)), you have two[^1] options
for creating reusable bits of template:
[includes](https://mozilla.github.io/nunjucks/templating.html#include) (I call
them partials) and
[macros](https://mozilla.github.io/nunjucks/templating.html#macro). It's not
always obvious why you should choose one over another when it comes to partials
<i>vs</i> macros. The heuristic I follow when I'm trying to decide how to
organize my templates is:

- Partials are for components that rely on no context, or on global or common
  context that will be present in any page
- Macros are for components that need to take parameters

Put another way: if I find myself having to use `{{ "{% set %}" | safe }}` to
configure the context for a partial before I `{{ "{% include %}" | safe }}` that
partial, it should probably be a macro.

## Includes

## Macros

### Call Blocks

[^1]: Well, I suppose you could say three, if you include custom filters as an
  option, but let's just ignore that for now.
