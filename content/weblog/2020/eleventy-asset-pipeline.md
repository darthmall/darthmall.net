---
title: Asset Pipelines in Eleventy
date: 2020-11-13
tags:
    - Eleventy
    - Web Dev
description: >-
    This is a clever trick (probably too clever) for setting up Eleventy to
    manage asset pipelines like SCSS and JavaScript transformations, as well
    as using hashes in filenames for cache busting.
---

There's currently an enhancement requested for [Eleventy][eleventy] to offer
some kind of [official asset pipeline][pipeline issue]. I was thinking about
this problem at work (where I'm rebuilding the [Science On a Sphere
website][sos] in Eleventy) and came up with a Clever Hack&trade; using
Eleventy's computed data, pagination, collections, and filters.

Fair warning: this is probably too clever.

## The Gist

The technique has four components.

1.  [JavaScript data files][js data files] to transform
    assets, such as compiling SCSS into CSS, and expose them as an array
2.  A JavaScript template that uses the technique for [creating pages from
    data][pages from data] to output assets to
    files and create a collection for them
3.  A filter to find the URL for a specific asset to help you load the assets
    in your layouts
4.  Some additional watch targets for Eleventy so the auto-reload works

Clear as mud, right? Let's walk through how I transform the SCSS for this
site as an example.

## Example: Transforming SCSS

### Transforming the assets

First, we have to do the transformation. We create a global data file in our
[data
directory](https://www.11ty.dev/docs/config/#directory-for-global-data-files):
`_data/styles.js`. The data created is an array of objects with three properties:
fileName, hashedFileName, and contents.

<figure>

```js
const crypto = require("crypto");
const path = require("path");

const glob = require("glob");
const sass = require("sass");

module.exports = function styles() {
	let stylesheets = [];

	// I use glob to generate an array of all the SCSS files in src/_scss/. Files
	// prefixed with "_" are ignored.
	glob.sync("src/_scss/[^_]*.scss").forEach(function (file) {
		const baseName = path.basename(file, ".scss"),
			fileName = `${baseName}.css`;

		const output = sass.renderSync({
			file,
			outFile: fileName,
			outputStyle: "compressed",
			sourceMap: true,
		});

		// Create a hash of the contents to use in the filename for cache busting
		// in production.
		const content = output.css.toString("utf8"),
			hash = crypto.createHash("md5");

		hash.update(content);

		const hashedFileName = `${baseName}-${hash
			.digest("hex")
			.slice(0, 10)}.css`;

		stylesheets.push({
			fileName,
			hashedFileName,
			content,
		});

		// Include the sourcemap as an asset. There's no need to put a hash in the
		// filename of the source map, but we still need that property present on
		// all assets for our JavaScript Template later on.
		stylesheets.push({
			fileName: `${fileName}.map`,
			hashedFileName: `${fileName}.map`,
			content: output.map.toString("utf8"),
		});
	});

	return stylesheets;
};
```

<figcaption>src/_data/stylesheets.js</figcaption>
</figure>

At this point we have an array available that contains the names and contents
of all of our CSS. Next step is to write out those CSS files.

### Writing the asset files

To create the assets, we'll use the technique for [creating pages from
data][pages from data]. If you're not familiar with this technique, you might
want to read through how it works first. I created a new JavaScript template
in the root of my input directory: `styles.11ty.js`.

<figure>

```js
class Stylesheet {
	data() {
		return {
			eleventyComputed: {
				assetKey: ({ stylesheet }) => stylesheet.fileName,
			},
			permalink: ({ stylesheet }) =>
				process.env.NODE_ENV === "production"
					? `/css/${stylesheet.hashedFileName}`
					: `/css/${stylesheet.fileName}`,
			pagination: {
				addAllPagesToCollections: true,
				alias: "stylesheet",
				data: "styles",
				size: 1,
			},
			layout: "",
			tags: ["_styles"],
		};
	}

	render({ stylesheet }) {
		return stylesheet.content;
	}
}

module.exports = Stylesheet;
```

<figcaption>src/style.11ty.js</figcaption>
</figure>

Just a couple of things to point out here. I added a computed property to
each page — `assetKey` — which we'll use in a minute to look up the asset
URLs when we need them.

I set the permalink (the URL at which the assets will be available) based on
the environment (`NODE_ENV`). In production we use the hashed file name for
cache busting, otherwise we just use the file name (because otherwise our dev
directory would fill up with CSS files as we work on our styles).

Finally, I add each of these pages to a "\_styles" collection. This will make
it easier to find these pages later when we need their URLs. I chose to
prefix the tag with an "\_" just to avoid the possibility of a collision with
a tag I might want to use for my blog or something. (Plus, I've been a Python
programmer for a long time, so an "\_" always implies something internal to
me.)

**Nota bene:** you have to set `addAllPagesToCollections: true` in your
pagination options, otherwise only the first asset ends up in the collection.
I spent a lot of time trying to figure out why only one of my two stylesheets
was working. 😅

### Looking up the asset URLs

The last major piece of the puzzle is adding a filter that makes it easy to
grab the URL for any of your assets. In your `.eleventy.js` configuration you
can add this filter:

<figure>

```js
module.exports = function (eleventyConfig) {
	// ...

	eleventyConfig.addFilter("assetUrl", function (assetCollection, key) {
		for (let asset of assetCollection) {
			if (asset.data.assetKey === key) return asset.url;
		}

		return "";
	});

	// ...
};
```

<figcaption>.eleventy.js</figcaption>
</figure>

### Triggering rebuilds with a new watch target

And finally, to make sure that Eleventy knows to pay attention to our assets
and rebuild the site, you can add this to your `.eleventy.js` as well:

<figure>

```js
module.exports = function (eleventyConfig) {
	// ...

	eleventyConfig.addWatchTarget("./src/_scss/");

	// ...
};
```

<figcaption>.eleventy.js</figcaption>
</figure>

Now, whenever you make a change to your style, Eleventy will rebuild your CSS
and reload the site.

### Loading assets in your layouts

Now that all the pieces are in place, we can load our assets fairly easily in
our layouts.

<figure>

```jinja2
<link rel="stylesheet" href="{{ '{{ collections._styles | assetUrl(\'global.css\') | url }}' | safe }}">
```

<figcaption>
Example <link> element in a Nunjucks template that loads the compiled styles
from the global data object
</figcaption>
</figure>

This assumes that we started with a file: `src/_scss/global.scss`. Remember
we set the asset key for each asset as the file name, this was so that we can
look it up without having to know whether we're using the hashed file name or
not. Plus, I think it helps you understand what's going on in the markup better.

## Thoughts

### What's to like

There are a number of things I like about this solution.

-   It didn't require any additional dependencies to run tasks (no
    [Gulp][gulpjs], [Parcel][parceljs], or [Webpack][webpack]), it's all done
    by wiring up the dev tools (`sass`) in Eleventy
-   I don't have ridiculously complicated NPM scripts to watch my SCSS and my
    HTML and then have to try to coordinate the two
-   The URLs are robust: asset location is controled by the `permalink` of the
    JS template, and anything that references the assets automatically gets
    the right URL, so it's easy to change my mind and move `css/global.css` to
    `styles/global.css` if I want, or set up a [path prefix][eleventy prefix]

### What's not to like

This feels a bit too clever to me. A new person coming to a project using
this technique would likely be utterly mystified regarding how assets are
processed. One might expect an asset pipeline like this to be configured in
`.eleventy.js` or `package.json`, not hidden amongst other data files in
`_data/`.

### What's next

I've also used this technique to bundle JavaScript files — same set of files,
it's just [`rollup`][rollup] instead of `sass`, and `scripts.js` instead of
`styles.js`. But I'd also like to be able to handle images in a way that's
similar to [Wagtail's image processing][wagtail images]. Wagtail's custom
image tags allow you to specify in your template sizes, crops, and aspect
ratios of images, and then it will generate them for you based on the
original uploaded image. I'd love to be able to store only a single, original
image in my repo and have the build process generate all the needed image
sizes and formats based on where they're used.

## Let me know what you think

If you have thoughts or questions, let me know! You can find me on
[vis.social][mastodon] (Mastodon) or [Twitter][twitter] (if you must).

[pipeline issue]: https://github.com/11ty/eleventy/issues/272
[sos]: https://sos.noaa.gov/
[js data files]: https://www.11ty.dev/docs/data-js/
[pages from data]: https://www.11ty.dev/docs/pages-from-data/
[eleventy prefix]: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix
[rollup]: https://rollupjs.org/guide/en/
[wagtail images]: https://docs.wagtail.io/en/stable/topics/images.html
[gulpjs]: https://gulpjs.com/
[parceljs]: https://parceljs.org/
[webpack]: https://webpack.js.org/
[eleventy]: https://11ty.dev/
[mastodon]: https://vis.social/@darth_mall
[twitter]: https://twitter.com/darth_mall
