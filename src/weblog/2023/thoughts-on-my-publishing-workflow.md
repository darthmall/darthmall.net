---
title: Thoughts on My Publishing Workflow
date: 2023-03-12
tags:
- Blogging
---

Lately I’ve been feeling like my publishing workflow is interfering with my blogging, so I’ve been looking into flat-file content management systems like [Kirby](https://getkirby.com/).

<!-- excerpt -->

I really like the portability of markdown files that comes with a static site generator. And in theory I like Git-based workflows. I’ve never bothered implementing a [drafts status in Eleventy](https://www.11ty.dev/docs/quicktips/draft-posts/) because I can easily use branches for drafts. I can get previews of the drafts thanks to Netlify’s build previews. I know some people dislike having commits even for minor things like fixing typos—and in truth a lot of the commit messages I end up writing while working on a draft are useless—but it’s easy enough to clean up those commits with an interactive rebase.

But there are a few places where I feel like the workflow of a static site generator falls down a bit for me.

## Editing Tools

Much as I like working in Vim, it’s not always the nicest writing environment. Static site generators also don’t have much to offer in terms of flexibility for where you’re writing. I’ve used the GitHub web-based editor to start drafts from my phone, or on my work computer where I don’t have a clone of my website repo. It gets the job done, but it’s not a nice publishing interface.

This is where I start to get jealous of folks who use Wordpress or some other content management system. They usually have a nice web interface for writing and publishing. More than anything else, this feels like a point of friction that is actually interfering with how much I blog, because it’s much easier to pull up Mastodon on my phone and write a short thread than it is to write a post with my current publishing workflow.

## Wasted Effort

I’ve no idea how much energy it takes to build my site, but it bothers me a little that every time I publish something new on the site, it rebuilds the entire site. It seems wasteful. Posts are converted from markdown to HTML whether or not anything in the markdown has actually changed. Even more wasteful, is that images are re-processed into the various sizes and formats used to provide fast, responsive images for visitors.

Regardless of how much work it currently involves, one thing I know for sure: the longer the site is around, the more effort each build will require. the amount of energy required to build the site is only going to increase with time.

### Building On-demand

There are some tools available to me to mitigate these problems. Eleventy has a serverless plugin that supports [on-demand builds](https://www.11ty.dev/docs/plugins/serverless/#rendering-modes). So I could always just rebuild the home page, and maybe the blog posts listed on the home page, and leave everything else unbuilt until someone requests the page. Then I can cache the page for future visits (or at least until the next update to the site).

My reluctance to add the serverless plugin to my site stems from the fact that it currently only supports Netlify’s serverless functions, so it feels like it undermines some of the portability that appeals to me in a static site generator. If there were a documented path for creating adapters for other environments—preferably something more generic, like an Express server—then I might be a little more comfortable with this solution.

## Scheduling Posts

It is possible to schedule a post by post-dating the post, ensuring that Eleventy doesn’t list any posts whose publication date is after today, and then scheduling a build—once a day would probably sufficient. But again, this seems wasteful because of all the times that you run a build for no reason. Most days I don’t have a scheduled post, so most days this build is just a waste. Also a scheduled build like this undermines the usefulness of on-demand building, since each deploy would invalidate the already built pages.

## Images

The last thing that has been bothering me is how images are handled by static site generators. Aside from the fact that images are re-processed every build, I’m also just not happy with keeping the images in Git at all. Git is great with the markdown files, but it doesn’t have a great track record with large binary files (like images). I’ve never had good luck with [LFS](https://git-lfs.com/), and diffs of binary files are a bit useless.

I suppose the [Jamstack](https://jamstack.org/) solution to images would be a service like Cloudinary, but again the appeal of a static site generator to me is its portability. If I upload all of my images to one of these services and they go out of business, I will have to figure out how to export all of my data, and then replace that service with another service. Self-hosting all of my files feels much safer in this regard. I can just pick them up and move them wherever as easily as a `git clone` or an `rsync`.

This is maybe not a huge deal for me at the moment, since I don’t have many images on my site, but I’d kinda like to build myself a little photo gallery where I can upload my photographs. I like the way [Scott Kellum shares his photos](https://scottkellum.com/photos/).

## Flat-file Content Management Systems

All of this brings me around to looking at some flat-file content management systems, like Kirby. They seem to have all of the benefits of a static site generator in that all of your data is stored on the file system in plain text files while also providing a web-based publishing workflow you can use from anywhere. Although Kirby uses a file format that is unique, it doesn’t seem that hard to write a parser for, if I ever needed to export my data to something else. On the other hand, it isn’t as portable as something like markdown, JSON, or YAML.

Kirby seems nice because it can be used as a headless content management system, and they even have an example project for using it [headlessly with Eleventy](https://github.com/getkirby/eleventykit). This, at least, helps to alleviate some of the publishing issues I have with my current set up. I could use the Kirby panel from a web browser anywhere to write. It doesn’t do much for reducing the work of rebuilding my site on every update. So then I start thinking, “why use a static site at all? Why not just use Kirby for the whole site?” Is the performance difference between rendering each page on-demand <i>vs.</i> serving pre-rendered HTML that important on small blog like this?

And that’s a whole other rabbit hole.

## Just Blog

As much time and attention as I spend thinking about this problem—and it’s been on my mind quite a lot these past few weeks for some reason—I keep coming back to Tom MacWright’s advice for blogging.

<figure>
    <blockquote>
…the rule is whatever works. Jekyll works, and so does WordPress, and Gatsby.…Once you choose the technology that runs your blog, use it. Don’t replace it, ever. Never ever rewrite it.
    </blockquote>
    <figcaption>&horbar;&#8239;Tom MacWright, <a href="https://macwright.com/2019/02/06/how-to-blog.html">How to Blog</a></figcaption>
</figure>

It would be a lot of work to migrate my blog posts over to Kirby, few though they are in number. Obviously, trying to build a CMS for myself would be a long, probably unproductive rabbit hole.

For now I’m trying out [Typora](https://typora.io/)—which is a bit like iA Writer, but cross-platform. It’s a nice editing experience. Maybe it’s enough. Though it doesn’t provide the same kind of structure I could create with something like Kirby, nor does it solve my problem of writing directly in my web browser from anywhere; I still need to clone my site to wherever I’m writing if I want to write with Typora.

It makes me wonder if static site generators will ever be for anyone except nerds. It’s a hard sell to get anyone who isn’t, to some degree, a programmer to get on board with Git-based workflows and markdown. I’d have a hard time recommending to my comic or music friends that they should use Eleventy if they need a website, as much as I love it.

I first heard of Kirby when [Bastian Allgeier was on Shop Talk Show](https://shoptalkshow.com/533/). He mentioned that Kirby had originally started out based on the idea that writers would be writing the plain text files themselves, in a text editor. Just like we do with our static site generators. The panel was added because users wanted it. Maybe a writing interface like this should make it onto Eleventy’s roadmap. That might be nice.
