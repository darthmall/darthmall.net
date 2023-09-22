---
title: "Bad Web Component Example: Cards"
tags:
  - Web Dev
  - Web Component
---

Cards are a bad example for web components because they rarely require custom behavior. This means that something that is purely presentational fails when JavaScript fails, which is silly. Most of the time, you’d be better off with a set of CSS classes and well-documented markup.

Declarative shadow DOM could be useful for presentation-only web components like this, but since the template has to be repeated inside every card, you still probably need some kind of templating language to encapsulate all of the markup around the card rather than copying and pasting, so unless you really need to encapsulate some elements of the card inside shadow DOM for scoping, it’s probably not worth it. If we get the ability to associate a single template as the declarative shadow DOM for multiple custom elements without JavaScript, then this might be a more viable option.