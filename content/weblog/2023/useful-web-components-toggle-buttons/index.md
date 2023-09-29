---
title: "Useful Web Components: Toggle Buttons"
date: 2023-09-25
description: "An implementation of a toggle button group, or segmented control using Web Components"
tags:
  - Web Dev
  - Web Components
eleventyExcludeFromCollections: true
---

This post is the first of a series highlighting some of my favorite uses for web components.

<figure class="demo">
<iframe title="Toggle button group with single selection demo" src="./demo/"></iframe>
<figcaption>A group of toggle buttons, also known as a segmented control.</figcaption>
</figure>

One of my favorite uses of Web Components is as a container for HTML elements that helps manage some aspect of state. In this case, we can wrap a couple of `<button>` elements to create a set of toggle buttons, like you might use for a theme picker on your website.

## Markup

<figure>

```html
<fieldset>
	<legend>Choose one</legend>
	<toggle-group>
		<button value="one">One</button>
		<button value="two">Two</button>
		<button value="three">Three</button>
	</toggle-group>
<fieldset>
```

<figcaption>HTML for the toggle group</figcaption>
</figure>

The markup for our control is pretty simple. At it’s core, we just wrap some `<button>` elements in our `<toggle-group>` custom element. We’ll register this with some JavaScript later on to implement the toggle behavior. Then we give our control an accessible name using a `<fieldset>` with a `<legend>`. All credit for this ingenious use of `<fieldset>` goes to [Ben Myers](https://benmyers.dev/).

We use the `value` attribute on the buttons much like we would use them with `<input type=radio>`, since, in effect, a single-selection toggle group like this is just a gussied up radio group.[^1]

### Default selection

With the above markup, none of our buttons will be selected by default. Selected buttons will be identified using the `aria-pressed=true` attribute. So, if you’d like to set a default selection, you simply have to include `aria-pressed=true` on whichever button should be selected.

### Multi-select

When we come to the implementation of our `<toggle-group>` Web Component, we’ll also include a boolean attribute for a multi-select mode. To use it, we simply include the `multiple` attribute in our markup like this, `<toggle-group multiple>` and that will turn on multi-selection.

## Styles

<figure>

```css
button[aria-pressed="true"] {
    background-color: AccentColor;
    border-color: AccentColor;
    color: AccentColorText;
}

/* Make all buttons in the group the same width */
toggle-group {
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
}

/* Eliminate rounded corners on inner edges of buttons. */
toggle-group button:not(:first-of-type) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

toggle-group button:not(:last-of-type) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}
```

<figcaption>Styles for the toggle group.</figcaption>
</figure>

Our styles are also pretty minimal. First, we define a style that communicates the toggled state for buttons. If you want, you can apply this to `toggle-group button[aria-pressed=true]` instead of all buttons, but I like to just define the toggle state for all buttons on a site.

Next, we handle the layout of the buttons in our toggle group. Grid makes this really easy and ensures that we have no gaps between buttons and that all buttons have the same size.

The last two rules remove rounded corners on the internal edges of any of the buttons. If you don’t have rounded corners on your buttons, this won’t really matter, and the corners of your toggle group will be square. If you do round the corners of your buttons, then the corners of your toggle group will match whatever border radius you have set for your buttons, and we only straighten out the corners we need to so that the control looks like a single, segmented button.

## JavaScript

<figure>

```js
class ToggleGroup extends HTMLElement {
	// Lifecycle methods
    connectedCallback() {}
    disconnectedCallback() {}

	// Properties
    get multiple() {}
    set multiple(value) {}
    get value() {}
    set value(val) {}

	// Internal methods
    #handleClick(event) {}
    #toggleState(button) {}
}

customElements.define("toggle-group", ToggleGroup);
```

<figcaption>The <code>ToggleGroup</code> class that will implement the control’s behavior, without any method implementation details.</figcaption>
</figure>

### Life cycle methods

Since we’re not using shadow DOM for this component, there’s no real need to implement a `constructor`. Instead, we can do all of our initialization in the `connectedCallback` method.

<figure>

```js
connectedCallback() {
    this.addEventListener("click", this.#handleClick);
}

disconnectedCallback() {
    this.removeEventListener("click", this.#handleClick);
}
```

<figcaption>Life cycle method implementations.</figcaption>
</figure>

All we do in our life cycle methods is connect and disconnect our click handler. We could listen for clicks on each individual button, but this has several disadvantages:

- If we’ve defined the custom element before we encounter the opening tag, `connectedCallback` will fire as soon as `<toggle-group>` is parsed; so if we go looking for `<button>` elements inside our Web Component, we won’t find any, they’ll be added later and we’ll miss them
- If any buttons are added or removed to our Web Component using JavaScript, we’ll miss them
- Having multiple event listeners is more costly than having just one

We could handle the first two problems using [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver), but that’s more complicated than just using [event delegation](https://gomakethings.com/event-delegation-and-nested-elements/).

### Properties

<figure>

```js
get multiple() {
    return this.hasAttribute("multiple");
}

set multiple(value) {
    if (value === true) {
        this.setAttribute("multiple", "");
    } else {
        this.removeAttribute("multiple");
    }
}
```

<figcaption>Getter and setter methods for the <code>multiple</code> property.</figcaption>
</figure>

The `multiple` property on our Web Component mimics the `multiple` attribute defined for `<select>` elements. It is just a reflection of the attribute of the same name in JavaScript, <i>i.e.</i> it is written to and read from the attribute on the element. This makes it convenient for us to test whether or not this is a multi-select group when handling clicks, and also makes it convenient to set the selection mode from JavaScript—`toggleGroup.multiple = true` is much nicer than `toggleGroup.setAttribute("multiple", "")`.

<figure>

```js
get value() {
    const value_list = [];

    for (let btn of this.querySelectorAll("[aria-pressed=true]")) {
        value_list.push(btn.value);
    }
    
    if (value_list.length === 0) return;

    return this.multiple ? value_list : value_list[0];
}

set value(val) {
    // Ensure we are always working with an array, for simplicity.
    if (!Array.isArray(val)) {
        this.value = [val];
        return;
    }

    // If this is a single-select toggle group and there's more than one
    // value in the array, we ignore all but the first value.
    if (val.length > 1 && !this.multiple) {
        this.value = [val[0]];
        return;
    }

    // Update the state to match the value.
    for (let btn of this.querySelectorAll("button")) {
        const state = val.includes(btn.value) ? "true" : "false";
        btn.setAttribute("aria-pressed", state);
    }
}
```

<figcaption>Getter and setter methods for the <code>value</code> property.</figcaption>
</figure>

The `value` property is modeled after the `value` property on `<input>` elements. The getter simply iterates over all of the children of the component that are toggled on and adds their value to an array of values. If the toggle group has multi-select enabled, it returns the array, otherwise it returns the first item in the array. If nothing is selected, it returns `undefined`.

The setter will accept either a single value or an array of values, with a guard to ignore all but the first array element if the toggle group is in single-select mode. Then it iterates over all of the buttons inside the component and sets its `aria-pressed` attribute based on whether or not its value can be found in the array of values being set.

### Click handler

<figure>

```js
#handleClick(event) {
    const target = event.target;

    // Bail out, in case someone puts a non-button element inside this component
    if (target.localName !== "button") return;

    // Prevent form submission when the toggle group is inside a form element
    // for progressive enhancement
    event.preventDefault();

    // If the toggle group is a multi-select, toggle the event target and
    // we're all done
    if (this.multiple) {
        this.#toggleState(target);
        return;
    }

    // In single select mode, clear any existing selections...
    for (let btn of this.querySelectorAll("[aria-pressed=true]")) {
        btn.setAttribute("aria-pressed", "false");
    }

    // ...and then select the event target
    target.setAttribute("aria-pressed", "true");
    
    this.dispatchEvent(new CustomEvent(
        "togglechange",
        { detail: { value: this.value } },
    ));
}
```

<figcaption>Implementation for the private click handler method.</figcaption>
</figure>

The first thing the handler does is check to see if the thing that was clicked was actually a button. In the event that someone put something other than a button inside the toggle group, we want to just ignore clicks and let the browser do whatever else it wants to do. If it is a button, we want to prevent the default browser behavior, because this toggle group could be inside a form and we don’t want the form submitting (more on this when we get to progressive enhancement).

With those guards in place, the next thing to do is check to see if this toggle group is a multi-select group or not. If it is a multi-select group, then all we have to do is toggle the state of whatever button was clicked. If it’s a single-select group, we first reset all of the buttons to off, and then turn on the toggle that was clicked. And finally dispatch a custom event to notify listeners that the value of the toggle group has changed.

### Toggle state method

<figure>

```js
#toggleState(button) {
    const currentValue = button.getAttribute("aria-pressed");
    const toggledValue = currentValue === "true" ? "false" : "true";
    button.setAttribute("aria-pressed", toggledValue);
}
```

<figcaption>Implementation of the toggle state private method.</figcaption>
</figure>

The toggle state method is a utility to make it easier to flip the `aria-pressed` attribute on any given button. It gets the current value of `aria-pressed` on an element, uses that to determine what the next value should be, and then sets the next value on the element.

## Progressive Enhancement

If you have the ability to respond to form submissions, you can use a form to progressively enhance your toggle group.

<figure>

```html
<form>
    <fieldset>
        <legend>Choose one</legend>
        <toggle-group>
            <button name="choose-one" value="one">One</button>
            <button name="choose-one" value="two">Two</button>
            <button name="choose-one" value="three">Three</button>
        </toggle-group>
    <fieldset>
</form>
```

<figcaption>Toggle group wrapped in a form for when JavaScript fails.</figcaption>
</figure>

By default, the buttons of a form will submit the form, and without a `method` or `action` property, the form will submit to the current <abbr>URL</abbr> as a `GET` request. By adding a `name` to our buttons, we ensure that clicking a button will request the current URL with `?choose-one=VALUE` as the query string, where `VALUE` is the `value` assigned to the button that was clicked. You can use this to process state on the server and set cookies or do whatever you need to do, so that your toggle group works even if JavaScript doesn’t.

This is why we called `event.preventDefault` in our click handler. If JavaScript is working, we can prevent the form submission and respond to an event fired by the Web Component.

### Without forms

If you can’t handle form submissions, your best bet may be to hide the control if JavaScript has failed. This can be easily done with <abbr>CSS</abbr>.

<figure>

```css
toggle-group:not(:defined) {
	display: none;
}
```

<figcaption><abbr>CSS</abbr> to hide the Web Component until it is upgraded.</figcaption>
</figure>

This will hide the control, but if you’re using `<fieldset>` to label the control, you’ll have a label that labels nothing. This can be fixed with `:has`, if your browser targets support that.

<figure>

```css
fieldset:has(toggle-group:not(:defined)) {
	display: none;
}
```

<figcaption><abbr>CSS</abbr> to hide the Web Component until it is upgraded.</figcaption>
</figure>

[^1]: It would therefore be a good idea to ask yourself whether you really want a toggle group, or if you’d be better off just using a group of radio buttons. A case for using a toggle group instead of a radio group can be made when we come to the progressive enhancement portion of the component.
