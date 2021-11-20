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

But I think there's a better way to handle situations like this. Macros.

## Macros

Macros are a bit like functions for Nunjucks. They don't receive the context of
the calling template, so they have a local scope; they take parameters; you
import them. If you don't know much about using macros in Nunjucks, I recommend
having a look at [Thomas Semmler's writeup on using
macros](https://helloyes.dev/blog/2021/using-parameters-in-your-eleventy-includes-with-nunjucks-macros/)
in Eleventy.

Now, let's have a look at how we can convert our card template into a macro. We
can start by just converting our original card template into a macro by wrapping
it in a `{{ "{% macro %}" }}` tag.

<figure>

{% raw %}
```html
{% macro card(title, url, media, mediaAlt, body) %}
<article class="card">
  <h2 class="card__title">
    <a href="{{ url }}">{{ title | safe }}</a>
  </h2>
  <div class="card__media">
    <img src="{{ media }}" alt="{{ mediaAlt }}" />
  </div>
  <div class="card__body">
    {{ body | safe }}
  </div>
</article>
{% endmacro %}
```
{% endraw %}

<figcaption>templates/includes/card.njk</figcaption>
</figure>

There are only two differences between this new macro and our old template
fragment:

1. The HTML is wrapped in a `{{ "{% macro %}{% endmacro %}" }}` Nunjucks tag
2. I've removed the `card*` prefix from all the variable names, since the
   variables are scoped to the macro

The `{{ "{% macro %}" }}` tag acts a lot like the `function` keyword in
JavaScript. You could almost think of the above as

```js
function card(title, url, media, mediaAlt, body) {
  return `<article class="card">
    <h2 class="card__title">
    ...
  `;
}
```

Now that we have defined our macro, we have to import it before we can call it.

{% raw %}
```html
{% import "./includes/card.njk" as card %}
```
{% endraw %}

And then we invoke the macro like it's a function inside of a Nunjucks variable
reference.

{% raw %}
```html
{{ card.card(post.title, post.url, post.media.src, post.media.alt, post.description) }}
```
{% endraw %}

Now, I want to do one last thing before showing how this transforms the original
template that relied on `{{ "{% include %}" }}`, because I dislike the
`card.card()` call—it seems silly and redundant to me. You can collect macros
into a single file that are all accessible from a single import, so I'm going to
rename the `includes/card.njk` file to `macros/components.njk`. This keeps my
macros separate from my template partials, and gives me a single place to
collect my component macros.

Now, with our macro in place, our template for the home page becomes this:

<figure>

{% raw %}
```html
{% import "./macros/components.njk" as components %}
<!DOCTYPE html>
<html>
  <body>
    {% include "./includes/site-header.njk" %}

    <section aria-label="posts">
      {% for post in posts %}
        {{ components.card(post.title, post.url, post.media.src, post.media.alt, post.description) }}
      {% endfor %}
    </section>
  </body>
</html>
```
{% endraw %}

<figcaption>templates/home.njk</figcaption>
</figure>

Personally, I like this much better. It's more succinct, and doesn't add a bunch
of additional variables to my template context.

<aside>

If you use Nunjucks template inheritance, you can `{{ "{% import %}" }}` your
macros in the base template, and they'll be available from every template that
`{{ "{% extends %}" }}` that template. This is a convenient way to make a
library of components and form inputs available in all templates.

</aside>

### Call Blocks

I have one last tweak I'd like to make to our macro to make it a little more
flexible. Suppose we want the body of our card component to be a little more
flexible. Maybe we use this component in our portfolio, where the description is
a simple paragraph, but we also use it for our recent blog posts on the home
page, where we want to include the description _and_ the publication date. Our
portfolio template might look like:

{% raw %}
```html
{% for p in projects %}
  {{ card(p.title, p.url, p.screenshot.src, p.screenshot.alt, p.summary) }}
{% endfor %}
```
{% endraw %}

But our recent posts needs to construct a custom card body, so we might do
something like this:

{% raw %}
```html
{% for post in recent_posts %}
  {% set postBody %}
  <p>{{ post.description | safe }}</p>
  <p>Published: {{ post.pub_date }}</p>
  {% endset %}

  {{ card(post.title, post.url, post.media.src, post.media.alt, postBody) }}
{% endfor %}
```
{% endraw %}

And now we're back to using `{{ "{% set %}" }}` again.

Nunjucks offers an alternate syntax for invoking a macro called a `{{ "{% call
%}" }}` block. Call blocks have start and end tags, and anything you put between
the tags gets passed to the macro. So the first thing we have to do is update
our card macro to use the contents of the call block. We do this by putting `{{
"{{ caller() }}" }}` in our macro where we want that content to appear.

<figure>

{% raw %}
```html
{% macro card(title, url, media, mediaAlt) %}
<article class="card">
  <h2 class="card__title">
    <a href="{{ url }}">{{ title | safe }}</a>
  </h2>
  <div class="card__media">
    <img src="{{ media }}" alt="{{ mediaAlt }}" />
  </div>
  <div class="card__body">
    {{ caller() }}
  </div>
</article>
{% endmacro %}
```
{% endraw %}

<figcaption>templates/macros/components.njk</figcaption>
</figure>

There are only two changes to the card macro:

1. I removed the body parameter from the macro
2. I replaced `{{ "{{ body | safe }}" }}` with `{{ "{{ caller() }}" }}`

Now, when we want to create a card, we use a call block:

{% raw %}
```html
{% for post in recent_posts %}
  {% call components.card(post.title, post.url, post.media.src, post.media.alt) %}
    <p>{{ post.description | safe }}</p>
    <p>Published: {{ post.pub_date }}</p>
  {% endcall %}
{% endfor %}
```
{% endraw %}

Now we're done with our card macro, I think.

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
