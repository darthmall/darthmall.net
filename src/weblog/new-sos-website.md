---
title: New SOS Website is Live
date: 2021-07-12
description: >-
    Today we launched the new website for Science On a Sphere that I've been
    working on for the last year or so.
tags: ["11ty", "Science On a Sphere"]
---

<figure>
<img src="/img/new-sos-website/sos-website.png"
     alt="Hero image and page title of the Science On a Sphere website" />
<figcaption>
Home page of the newly launched Science On a Sphere website
</figcaption>
</figure>

Today we launched the new website for [Science On a
Sphere](https://sos.noaa.gov/) that I've been working on for the past year. The
launch went surprisingly smoothly. I plan to do a more in-depth write up at
some point, but for now these are some of the highlights for me.

## Improved Lighthouse Scores

Three of the four scores from Lighthouse went up on the homepage, from yellow to
green. Two of them are 100s. Performance dipped a little, probably because of
the large hero images on the home page slowing down the largest contentful
paint.  Image optimization is on my list of things to do.

<figure>
<div class="flow">
<img src="/img/new-sos-website/sos-original-lighthouse.png"
     alt="Performance: 89; Accessibility 89; Best Practices: 67; SEO: 64" />
<img src="/img/new-sos-website/sos-lighthouse.png"
     alt="Performance: 81; Accessibility: 94; Best Practices: 100; SEO: 100" />
</div>
<figcaption>
Before and after scores from Lighthouse
</figcaption>
</figure>

## Ousted Google

The old website used Google Analytics, but we never wanted to know anything that
server logs couldn't tell us, so I removed GA from the site entirely. I replace
an embedded Google Map with a map generated using
[Leaflet](https://leafletjs.com/) and
[OpenStreetMap](https://www.openstreetmap.org/) tiles. And I replaced all of the
embedded YouTube videos with Google's "no cookie" embed which just displays an
image that links to YouTube, so no one is at risk of being tracked just for
loading our video gallery.

## Simplified Build Process

The site is statically generated using [Eleventy](https://11ty.dev/). The old
site was mostly static files as well, but it was a mishmash of hand-written HTML
and some pages managed in [Django](https://www.djangoproject.com/) and exported
with [Django Bakery](https://django-bakery.readthedocs.io/en/latest/).  The only
part of the old site that wasn't static was the index for the [dataset
catalog](https://sos.noaa.gov/catalog/datasets/); this was backed by a separate
Django application that provided an API and the index was rendered client-side
with some JavaScript.

Deploying all of this involved copying a MySQL database containing the datasets
and transforming the schema into a different schema for the catalog backend.
Then exporting all of the HTML from Django, combining that with the existing
static HTML, and then taking all of those files and syncing them out to an
integration server, which synced them to production. The database schema also
had to be synced from development to integration to production. This was all
triggered with cron jobs about once an hour to keep the site up-to-date.

Now there is no database powering the catalog. I export a JSON file when I build
the site and fetch that in the client to power the filtering. If JavaScript is
unavailable, you just don't get the filters. You can still browse the catalog.
(Without JavaScript on the old catalog, you'd just get a loading spinner that
never went away.)

The build process is handled automatically by GitLab's CI/CD pipelines any time
a change is merged into the production branch. Our build times have dropped from
approximately 60 minutes to about 13 minutes. It's still too long for my taste,
but it is an improvement. It's also safer to trigger builds manually becaue
there's no risk that the cron job will kick off a second build while your first
is running and peg the CPU of the dev server.

***

None of this is perfect. I'm pretty sure we've stretched Eleventy a bit past
what it's really good at, although with this new [serverless
plugin](https://www.11ty.dev/docs/plugins/serverless/) that's coming in 1.0,
maybe there will be better solutions to some of the build slowness.

I also do think that a backend powering the catalog is a good idea. But the
backend shouldn't just return JSON, it should be able to return full pages of
HTML so that, even if JavaScript fails, you can use the filters.

And of course I'd like to provide the team with some more user-friendly tools
for updating the website than editing some Markdown files and opening a merge
request.

But it feels pretty good to get this out the door. Most of my career has been
building stuff that is not public, so it's kind of neat that something I made
can be seen by anyone.
