---
pagination:
  data: collections
  size: 1
  alias: tag
  filter:
    - all
    - posts
    - recent
    - sketches
    - work
permalink: /tags/{{ tag }}/
layout: layouts/weblog.njk
eleventyComputed:
  title: '{{ tag }}'
---

