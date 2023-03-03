---
title: "NPM’s Effect on Web Development Workflows"
date: 2023-03-03
tags:
- Web Dev
---

Lately I’ve been feeling that [NPM](https://www.npmjs.com/) has had a small negative impact on web development workflows.
It feels very difficult to have a dev environment without a bundler.
<!-- excerpt -->
What I’d like to do is just rely on [ECMAScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) (ESM) imports in development because I’m not worried about the network latency and chained requests in development.
Then for production I can bundle everything for performance.

Ideally I’d use a package manager to download a bundled ESM version of a library into an arbitrary directory that I can than `import` in my JavaScript.
Why an arbitrary directory?
Because I’m building an app with Flask, and it only allows me to specify one folder for serving static files.
So in order for Flask to find the libraries I import, they have to be in that folder.
This is the kind of thing we used to be able to do with [Bower](https://bower.io/), but Bower is no more.
They recommend using Yarn or NPM, except that Yarn and NPM don’t work this way.

The next thing I thought I’d try is to just `curl` the libraries into `static/js/vendor` myself.
But D3 doesn’t bundle any of its packages as ESM; the bundles are all [immediately-invoked function expressions](https://gomakethings.com/the-anatomy-of-an-immediately-invoked-function-expression/) (IIFE).
The NPM package has a `dist/` folder with the IIFE bundles, and a `src/` directory with all of the constituent JavaScript files as modules.
The assumption probably being that if you need an import you’re using a bundler and NPM, so there’s no reason to provide a downloadable bundle as a module.
So if I want to vendor the ESM version of D3 myself, I have fetch the directory of all of those files instead of just getting one JavaScript module.
I don’t much care for this idea because it will make upgrading libraries more difficult and error prone since stale files might linger in our repo if we’re not careful.

So all of this leaves me with having to use a bundler in development.
It’s not the end of the world, I guess, but it does make starting up the environment more difficult because now you have to start two processes instead of just one: a Node process for the bundler and the Python process for the application.
It also means I probably want to keep my JS out of Flask’s static directory because that’s where the bundler will need to write to, so I’ll need to add `static/js` to `.gitignore`, which is also annoying.

It kinda bums me out that this is where we’ve ended up.
Not because I think workflows relying on NPM and bundlers are bad, just because I’d like more options for projects.
I wish Bower—or something like it—was still around.
And I wish libraries would provide bundles both as IIFEs and modules.
