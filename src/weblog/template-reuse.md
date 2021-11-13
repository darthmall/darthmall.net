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
[includes](https://mozilla.github.io/nunjucks/templating.html#include) and
[macros](https://mozilla.github.io/nunjucks/templating.html#macro). It's not
always obvious why you should choose one over another when it comes to partials
<i>vs</i> macros. The heuristic I follow when I'm trying to decide how to
organize my templates is:

- Includes are for components that rely on no context, or on global or common
  context that will be present in any page
- Macros are for components that need to take parameters

Put another way: if I find myself having to use `{{ "{% set %} " }}` to
configure the context for a partial before I `{{ "{% include %}" }}` that
partial, it should probably be a macro.

## Includes

Includes are the simplest of the two encapsulation mechanisms. All you have to
do is write a fragment of a template in a file, and then you can use the `{{ "{%
include %}" }}` tag in another template and Nunjucks will replace that tag with
the contents of the fragment. An example might help to make this more clear.

Suppose I want to encapsulate the markup for my site header so that I can use it
in multiple templates. I might create a template fragment that looks like this:

<figure>

{% raw %}
```html
<header>
  <a href="/">{{ site.title }}</a>
  <nav aria-label="main">
    <ul>
      {% for link in navigation %}
        <li><a href="{{ link.href }}">{{ link.text }}</a></li>
      {% endfor %}
    </ul>
  </nav>
</header>
```
{% endraw %}

<figcaption>templates/includes/site-header.njk</figcaption>
</figure>

Now, I can include that fragment in any page template. So, for example, if I
have a template that I use to render all of my blog posts, it might look
something like this:

<figure>

{% raw %}
```html
<!DOCTYPE html>
<html>
  <body>
    {% include "./includes/site-header.njk" %}
    <h1>{{ title | safe }}</h1>
    {{ content | safe }}
  </body>
</html>
```
{% endraw %}

<figcaption>templates/post.njk</figcaption>
</figure>

Et voilà, all of the markup for my site header gets put in every blog post. If I
need the site header in another page, I just have to `{{ '{% include
"./includes/site-header.njk" %}' | safe }}` in that template wherever I want the
site header to appear in the markup.

When you include a template fragment in Nunjucks, it is interpreted using the
same context that is present in the calling template at the time the fragment
was included. So in my `site-header.njk` fragment, I'm making the following
assumptions about the context:

1. There is a variable called `site` which has a property `title`
2. There is a variable called `navigation` that is iterable
3. The objects yielded by iterating over navigation have two properties: `href`
   and `text`

Judging by my use of the fragment from `post.njk`, one might conclude that
`site` and `navigation` are both global variables provided by whatever
application is rendering the template, since you don't see those variables being
set in the template itself. If you're using a static site generator (like
[Eleventy](https://11ty.dev)), there is often a mechanism for you to define your
own global variables that will be added to the context of every template that is
rendered, and there is also usually a set of common variables that the static
site generator adds to every context.

Now what if I have a design for a card component that I want to use to list all
of my blog posts. I _could_ use a template fragment that gets included in a loop
that iterates over all of my blog posts.

<figure>

{% raw %}
```html
<article class="card">
  <h2 class="card__title">
    <a href="{{ cardUrl }}">{{ cardTitle | safe }}</a>
  </h2>
  <div class="card__media">
    <img src="{{ cardMedia }}" alt="{{ cardMediaAlt }}" />
  </div>
  <div class="card__body">
    {{ cardBody | safe }}
  </div>
</article>
```
{% endraw %}

<figcaption>templates/includes/card.njk</figcaption>
</figure>

And if I wanted to list my blog posts on my home page, I can do something like
this:

<figure>

{% raw %}
```html
<!DOCTYPE html>
<html>
  <body>
    {% include "./includes/site-header.njk" %}

    <section aria-label="posts">
      {% for post in posts %}
        {% set cardTitle = post.title %}
        {% set cardUrl = post.url %}
        {% set cardMedia = post.media.src %}
        {% set cardMediaAlt = post.media.alt %}
        {% set cardBody = post.description %}

        {% include "./includes/card.njk" %}
      {% endfor %}
    </section>
  </body>
</html>
```
{% endraw %}

<figcaption>templates/home.njk</figcaption>
</figure>

On each iteration of the loop I have to set five variables in the current
context before I include the card fragment. This is how I "pass" parameters to
the template fragment when I include it.

I've seen a lot of people do this with Nunjucks. And, really, there's nothing
wrong with it. The only thing that might cause some odd behavior is that at the
end of this loop, you have five variables in your context that are still set to
the values from the last post that was evaluated. _If_ you happened to reuse
those same variable for a different purpose and forgot to change or unset them,
you could get some unexpected content in your page, but that's about it.

But, for me, I think there's a better way to handle situations like this.
Macros.

## Macros

### Call Blocks

***

At the end of the day, you should use whatever mechanism for encapsulating
components that works for you. I'm not trying to convince you that it's wrong to
`{% raw %}{% set %}{% endraw %}` a bunch of variables before you `{% raw %}{%
include %}{% endraw %}` a template fragment. You should organize your code in a
way that makes sense to you and works for you. But if you've ever been a bit
perplexed about the differences between a macro and an include, or unsure of
which one you should use in any given situation, hopefully this helps you decide
one way or the other.

[^1]: Well, I suppose you could say three, if you include custom filters as an
  option, but let's just ignore that for now.
