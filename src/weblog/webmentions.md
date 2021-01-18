---
title: "Webmentions: Joining the IndieWeb"
date: 2021-01-10
description: >-
    Webmentions are now live on the site, powered by webmention.io. I've been meaning to
    do this for ages, finally getting around to joining the IndieWeb more properly.
---

Finally!

## Gotchas

### IndieAuth

In addition to signing into webmention.io with my website, I had to make sure I was set up
for [IndieAuth](https://indieauth.com/). In a nutshell, the way this works is you have a
link (either an `<a>` or `<link>` tag) on your site with `rel="me"` pointing to another
account you control like your GitHub or Twitter profile. Then, in that profile, you need a
link back to your home page that also has `rel="me"`. This proves to IndieAuth that you
control both pages.

It took me a long time to figure this out because it wasn't included in any of the
tutorials I looked at. My guess is that the authors had set up these backlinks from their
public profiles before they set up webmentions, so they never noticed. Since I'm being
snobby about which services I advertise (I'm pleased with neither GitHub nor Twitter), I
didn't have links to those profiles from this website.

## References

- [An In-Depth Tutorial of Webmentions +
  Eleventy](https://sia.codes/posts/webmentions-eleventy-in-depth/) by Sia Karamalegos
- [Making Persistent Build Folders in
  Netlify](https://mxb.dev/blog/persistent-build-folders-netlify/) by Max Böck
- [Adding Webmention Support to a Static
  Site](https://keithjgrant.com/posts/2019/02/adding-webmention-support-to-a-static-site/)
  by Keith J. Grant (for specifics on microformats)
- [Scheduling Netlify deploys with GitHub
  Actions](https://www.voorhoede.nl/en/blog/scheduling-netlify-deploys-with-github-actions/)
  by Thadee

