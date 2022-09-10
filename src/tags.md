---
eleventyExcludeFromCollections: true
pagination:
    data: collections
    size: 1
    alias: tag
    filter:
        - all
        - portfolio
        - posts
        - recent
        - sketches
permalink: /tags/{{ tag }}/
layout: layouts/weblog.njk
eleventyComputed:
    title: "{{ tag }}"
---
