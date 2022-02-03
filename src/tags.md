---
pagination:
  data: collections
  size: 1
  alias: tag
  filter:
    - all
    - posts
    - work
permalink: /tags/{{ tag }}/
layout: layouts/weblog.njk
eleventyComputed:
  title: '{{ tag }}'
---
