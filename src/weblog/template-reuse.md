---
title: Template Reuse with Nunjucks
date: 2021-11-02
description: >-
    When to use template inheritance, partials, and macros in Nunjucks (or
    Jinja2).
tags:
    - Eleventy
    - Nunjucks
    - Jinja2
---

When you're working with [Nunjucks](https://mozilla.github.io/nunjucks/) (or
[Jinja2](https://jinja.palletsprojects.com/en/3.0.x/)), you have three options
for creating reusable bits of template: [template
inheritance](https://mozilla.github.io/nunjucks/templating.html#template-inheritance),
[includes](https://mozilla.github.io/nunjucks/templating.html#include) (I call
them partials), and
[macros](https://mozilla.github.io/nunjucks/templating.html#macro). It's not
always obvious why you should choose one over another, particularly when it
comes to partials <i>vs</i> macros. The heuristic I follow when I'm trying to
decide how to organize my templates is:

- Template inheritance is for creating different page layouts
- Partials are for components that rely on no context, or on global or common
  context that will be present in any page
- Macros are for components that need to take parameters

Put another way: if I find myself having to use `{{ "{% set %}" | safe }}` more
than once to configure the context for a partial before I `{{ "{% include %}" |
safe }}` that partial, it should probably be a macro.

## Template Inheritance

## Includes

## Macros

### Call Blocks
