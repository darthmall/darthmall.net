---
title: Useful Web Components
date: 2023-09-22
description: "An overview of some uses I’ve found for Web Components"
tags:
  - Web Dev
  - Web Component
eleventyExcludeFromCollections: true
---

I’ve been working with [web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_Components) for about a year and half at work, and I find that I really like the way they let me build an application. Web components have also received more attention in parts of the web development community in the past two years or so and, naturally, there’s been a fair amount of criticism. Developers are often frustrated when it comes to styling elements contained in shadow DOM, or by the fact that web components require JavaScript to work. While I can understand this frustration, I’ve found several uses for web components that avoid these frustrations altogether. It’s lead me to believe that perhaps many of the criticisms are actually just a mismatch between developer expectations and the capabilities of the technology. In other words: there are uses for which web components are ill-suited, and trying to use them in these ways leads to a lot of frustration.

I’m not going to tell anyone they’re “using web components wrong” or address any of the criticisms directly. I think it’s likely that these criticisms could lead to improvements to the web platform that will benefit all of us. Instead, I thought I’d share some examples of uses for web components for which I think they are well-suited. My hope is that seeing uses for web components where there aren’t a lot of caveats or grumbling about inconveniences in the API will help you shift your thinking about web components so that you don’t feel like you’re fighting with them whenever you choose to use them. I hope that this helps you see ways you can work with the grain of the web, instead of trying to circumvent it.

## Web Components probably won’t replace a framework

One thing that I think trips people up when they first start using Web Components is that we web developers are accustomed to thinking of components from frameworks like Svelte or Vue. In a framework, a component can be anything from a control with complex behavior, such as an interactive data visualization, to a simple HTML template that saves you having to copy the same boilerplate markup over and over again for something like a card. Framework components also handle data binding and DOM updates for us. So when someone uses the word “component” this is what we assume they mean. I know I did when I first heard about web components. I thought web components would replace my JavaScript frameworks and render most of my development tools superfluous. Glorious!

But that’s not really what Web Components are for—at least in my opinion. For one thing, they don’t handle data binding or DOM updates. You still need a library for that.

They also aren’t a great option for when you just want to <abbr>DRY</abbr>[^1] up your code if you have a bunch of HTML boilerplate that’s required for some interface element such as a card. You certainly can use them this way, but the problem is that if your JavaScript fails, you don’t get your boilerplate, because your Web Components rely on JavaScript. I think this is where a lot of the criticism about Web Components needing JavaScript comes from. There is a desire to be able to template HTML boilerplate to avoid either copying and pasting it without leaning on an external dependency like a framework or a templating library (such as Liquid or Nunjucks), but I’m afraid I don’t think this is really an intended use for Web Components.[^2]

The good news is that most of the popular JavaScript frameworks will play nicely with Web Components. So you have an opportunity to build some of your interface with Web Components[^3]—which are more stable and portable than their framework counterparts—and then use a JavaScript framework to glue those components together. The framework can manage your application state and pass the relevant bits of state to your web components via their attributes, just like they would to a native element. I’m not the only person to come to this conclusion, either: Brad Frost wrote about this at about the same time I discovered how nice this way of working is in his article [let’s talk about web components](https://bradfrost.com/blog/post/lets-talk-about-web-components/).

## Uses for Web Components

Which brings me to what I think Web Components are _really_ for: Web Components are for creating new HTML elements. They aren’t great for templating because they rely on JavaScript; they aren’t great for orchestrating application state because the platform lacks native tools for data binding and efficient DOM updates. But if you want to build a custom `<video-player>` element to enhance the built-in `<video>` element or build an `<emoji-picker>` element, Web Components might be a good fit.

What all of these things have in common is that they add some new _behavior_ to the platform. They’re not just presentational. So the fact that Web Components rely on JavaScript isn’t really an issue because implementing a custom video player or an emoji picker would require JavaScript with or without Web Components.

### Element containers

One use I really like Web Components for is to create containers for other elements. For example, if you want to create a group of toggle buttons (or a [segmented control](https://developer.apple.com/design/human-interface-guidelines/segmented-controls) as Apple calls them), you could make a web component that wraps a bunch of HTML buttons.

```html
<fieldset>
    <legend>Choose One</legend>
    <toggle-group>
        <button aria-pressed=true>Option 1</button>
        <button>Option 2</button>
        <button>Option 3</button>
    </toggle-group>
</fieldset>
```

The `toggle-group` Web Component listens for `click` events and manages the `aria-pressed` attribute on all the buttons in its light DOM. No shadow DOM required, so you don’t hit any of the issues people usually run into when trying to get a Web Component to match the rest of their site. The buttons are all in the regular DOM and pick up all of your normal button styles. I have an [example toggle group implementation](https://codepen.io/darthmall/pen/wvRqYEM?editors=1111) on CodePen; as a bonus you can see how I implemented single- and multi-select modes for it.

Another use case I’ve found for Web Component containers is for managing the sizes of data visualizations (which I also like to implement as Web Components, more on that in a moment).

It’s usually the case that I want to scale a data visualization to fill its parent element. You might say, “use an SVG, then let the browser scale it to fill the available space,” which is ok, but I usually want to change how the visualization is rendered depending on the space available. For example, in larger spaces I’ll use more ticks along the axes than I would in smaller spaces, or I might only show annotations if the chart has enough space (progressive enhancement, baby). So I like to trigger a re-render of the chart to adjust my scales and my axis ticks. Rather than trying to build resizing into a class hierarchy with an abstract base class, or reimplementing it on every chart, I’ll make a chart container that let’s me apply axis titles and handles resizing.

```html
<figure>
    <figcaption>Chart Title</figcaption>
    <chart-container>
        <bar-chart></bar-chart>
        <span slot="y-axis">Y Axis Title</span>
        <span slot="x-axis">X Axis Title</span>
    </chart-container>
</figure>
```

Here I typically do make use of shadow DOM so that I can create a grid layout that allows me to slot the axis titles and rotate them, if needed. Notably, though, the shadow DOM doesn’t introduce any elements that are likely to need styling, it’s purely for laying out the elements of the chart. There would also be a slot for legends for anything that uses size or colors as data channels.

The `chart-container` also creates a `ResizeObserver` and calculates the width and height of the newly resized chart, and sets those as attributes on the element. Anything that accepts `width` and `height` attributes works inside of this container.

### Custom replaced elements

Another use I’ve found for Web Components is what I think of as “custom replaced elements.”[^4] Strictly speaking, these aren’t [replaced elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element); or perhaps you could say it’s up to you if they’re replaced elements or not, because it’s up to you if you want to expose any styling API for your Web Component or not.[^5]

Whether or not these are actually replaced elements or not, I think of them this way because I think of them like `<picture>`, `<img>`, or `<video>`. Unlike a `<p>` element, whose contents are actually contained within the HTML itself, these elements fetch data (video, image, <i>etc.</i>) and then parse that data to generate what is displayed. My main use for these types of Web Components is data visualizations.

```html
<line-chart>
    <data-source name="Series 1" src="/api/data?name=1"></data-source>
    <data-source name="Series 2" src="/api/data?name=2"></data-source>
    <data-source name="Series 3" src="/api/data?name=3"></data-source>
</line-chart>
```

In these cases, I usually lean heavily on shadow DOM. Often I use SVG for visualizations—partly out of habit and partly because it’s easier to debug since one can inspect it with dev tools—but the SVG can get gnarly, full of lots of paths and points and text elements and `<g>` elements to manage layers and align everything. It just feels better to me to have all of these things tucked away in shadow DOM.[^6] Encapsulation is also somewhat handy here, since I don’t have to worry about styles from one chart leaking into another simply because they both have `class="x axis"`, and I can use IDs for things like series without having to scope them to each chart with some prefix: `<path id="series-1" d="..."></p>`.

There are only a few things I actually want to allow people to style within these charts, which I can usually expose via shadow parts or custom properties. For example, I might expose the tick labels on each axis as shadow parts, in case people using the chart want to change their styling. I probably wouldn’t expose the actual data marks for styling (the lines of a line chart, for example), because I wouldn’t want anyone assigning arbitrary colors to the lines, making them inaccessible. Instead, I’d probably use a custom property that sets a color scheme to be used for all of the marks, and let the Web Component assign a color to each series from that scheme.

```css
line-chart {
    /* Use the D3 schemeCategory10 color scheme to assign colors
     * to line charts
     */
    --color-scheme: category10;
}
```

### JavaScript-dependent enhancements

The final category of elements that I like Web Components for are any that rely on JavaScript to work. A color-scheme picker on a static website is one such example. With a static website, you have no backend, so you can’t use cookies and dynamically generate pages if you want to allow visitors to choose between light, system, or dark color schemes. Therefore, to provide a color scheme picker, you have to use JavaScript in the client to override the OS color scheme.

This is a case where using a Web Component with everything in shadow DOM could actually be desirable. Here, you probably don’t want the buttons for selecting a color scheme to be visible if JavaScript fails because they won’t do anything. In this case, shadow DOM’s JavaScript dependency is actually a feature. If JavaScript fails, the shadow DOM isn’t created, the buttons never render, and your site can just fall back to `prefers-color-scheme` media queries to respect the visitor’s preferences. If JavaScript succeeds, you get the control to override the OS settings. Progressive enhancement, baby!

## Web Components not required

In pretty much all of these cases you could skip Web Components entirely. Both the containers example and the JavaScript-dependent examples could be built by wrapping the other light DOM elements in a `<div>` with a class that you query for when the script runs; in the case of the JavaScript-dependent example, you could add a little CSS to hide the elements until the JavaScript runs. For the data visualizations, there is arguably some advantage to tucking the complex SVGs away inside of shadow DOM, but we’ve been building SVG visualizations on the web for years before shadow DOM, so it’s hard to argue it’s necessary.

So if you find Web Components don’t really match how you like to work, if you find yourself coming into conflict with shadow DOM, that’s cool. Chances are pretty good you don’t _need_ to use them. But you may also find that in certain cases Web Components can be pretty handy, if you just shift your thinking away from using them like a framework component.

[^1]: [Don’t Repeat Yourself](https://en.wikipedia.org/wiki/Don't_repeat_yourself).
[^2]: And if it is a stated goal, then I agree that Web Components fall short.
[^3]: You might create a library of components or a system for your interface design this way.
[^4]: Nolan Lawson describes these as [client-rendered leaf components](https://nolanlawson.com/2023/08/23/use-web-components-for-what-theyre-good-at/).
[^5]: Using either custom properties or shadow parts. Nolan Lawson has a good [overview of how to style Web Components](https://nolanlawson.com/2021/01/03/options-for-styling-web-components/).
[^6]: Theoretically there could be performance benefits to isolating complex SVGs inside of shadow DOM. Nolan Lawson wrote about how encapsulation in [shadow DOM affects style calculation](https://nolanlawson.com/2021/08/15/does-shadow-dom-improve-style-performance/); [twice](https://nolanlawson.com/2022/06/22/style-scoping-versus-shadow-dom-which-is-fastest/), actually. In practice, I don’t know if this matters, but as far as I can see, it also doesn’t hurt.
