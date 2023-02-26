---
title: "HTTP Methods"
date: 2023-02-26
tags:
- Web Dev
---

I wonder how many people care about HTTP methods anymore.
Tools like GraphQL seem to just shrug and `POST` all the things.
<!-- excerpt -->
I kinda get it.
Having a `POST` body makes it easier to send complex queries to the server.
I’ve been struggling a little bit at work to devise URL parameters for specifying a bounding box on a map, or ranges of values that could either be vectors or scalars.

Part of me thinks that maybe the HTTP methods aren’t really *that* important.
It’s mainly convention, right?
As long as your client and server agree on the meaning of the HTTP methods, it should be fine.
Maybe it doesn’t matter that your `PUT` method is not idempotent, or that you use a `POST` just to retrieve data.
Or if you just want to `POST` every request just so you can use that sweet, sweet post body and encode the actual method as a property of the body; well, where’s the harm?

This doesn’t feel like it has the same kinds of consequences as ignoring something like the HTML standard.
When you decide that you can just make everything a `<div>`, you create tons of problems for people relying on assistive technology.
I can’t think of any adverse consequences of misusing HTTP methods.

The HTTP methods are useful, I suppose, because browsers implement them.
If I make a `<form method=GET>`, then I know that the browser will update the URL the form values.
Handy if I want the pages to be bookmarkable and sharable.

Being able to lean on The Platform™ like this seems like the main benefit of continuing to use HTTP methods.
Of course, I could use any method and my server could just redirect to a page with the form values in the URL.
It might translate some of the query parameters into path components in the URL, if that’s preferable.

Personally, I always feel icky using a `POST` request to fetch data, but maybe that’s an antiquated attitude these days.

