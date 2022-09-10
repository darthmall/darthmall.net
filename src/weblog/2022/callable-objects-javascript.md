---
title: Callable Objects in JavaScript
date: 2022-08-07
description: >-
    A pattern for building stateful functions in JavaScript.
tags:
    - JavaScript
    - Design Patterns
---

Recently, Chris Fedinandi wrote about the [constructor
pattern](https://gomakethings.com/the-vanilla-js-constructor-pattern/) and [when
you might use
it](https://gomakethings.com/when-and-why-would-you-use-a-constructor-pattern-over-a-utility-library-or-standalone-functions-in-vanilla-javascript/).
This got me thinking about a design pattern in JavaScript of which I’m fond—I
think of the pattern as “callable objects”. I first encountered this pattern in
[D3](https://d3js.org), where it is used extensively to create utilities like
scales.

<aside>

I probably call these “callable objects” because of how this pattern would be
implemented in Python. In Python, you’d create a class with a [`__call__`
method](https://docs.python.org/3/reference/datamodel.html?highlight=__call__#object.__call__).
Implementing `__call__` in the class allows you to call any instance of the
class like a function, hence “callable objects”. In JavaScript, as we’ll see,
these might be more accurately called “stateful functions”.

</aside>

## What are callable objects?

Callable objects are objects that you can call like a function, and which
maintain some internal state. They have getters and setters for managing state,
and when invoked like a function, the internal state of the object determines
the behavior of the function.

They can be useful when you want to perform some operation multiple times where
only one of several arguments to the operation is changing each time you call
it. Because you have an object that stores it’s own state, you can set the
state on the object and hold onto that reference, then you just call it like a
function whenever you need.

## A trivial example

Let’s take a simple greeter function as an example. The function combines a
salutation and a subject to form the greeting.

<figure>

```js
> greet("Hello", "world")
"Hello, world"
> greet("Ahoy", "matey")
"Ahoy, mate"
```

<figcaption>Output from our <code>greet</code> function</figcaption>
</figure>

If I were to implement this as a callable object, I’d probably make the
salutation part of the object state so that we could set it once and then use
the greeter to greet multiple subjects. To use it, we would first create an
instance of the greeter function, then we use the `salutation` accessor to set
our salutation. From then on, we can just call the greeter instance with the
subject we want to greet and it will use the salutation we set on it.

<figure>

```js
> const hello = greeter()
> hello.salutation("Hello")
> hello("world")
"Hello, world"
```

<figcaption>Sample use of a greeter function that stores its salutation for
reuse</figcaption>
</figure>

This can come in handy if we’re applying this function to multiple arguments.

<figure>

```js
> for (let subject of ["Linus", "Lucy", "Snoopy"]) {
... console.log(hello(subject))
... }
Hello, Linus
Hello, Lucy
Hello, Snoopy
```

<figcaption></figcaption>
</figure>

And it’s especially handy if you want to pass the function off to some other
function as an argument.

<figure>

```js
> ["Linus", "Lucy", "Snoopy"].map(hello)
[ "Hello, Linus", "Hello, Lucy", "Hello, Snoopy" ]
```

<figcaption>Passing the greeter as the callback to
<code>Array.prototype.map</code></figcaption>
</figure>

<aside>

Be careful about [passing functions as callbacks if they’re not designed to be
callbacks](https://jakearchibald.com/2021/function-callback-risks/).

</aside>

## Implementing a callable object

Implementing this pattern in JavaScript is relatively straightforward. All you
have to do is write a function that returns another function.

<figure>

```js
function greeter() {
	function call() {}

	return call;
}
```

<figcaption>Template for our greeter callable object</figcaption>
</figure>

Every time you invoke `greeter()`, you’ll get a new copy of this `call()`
function. The `call()` function is where we’ll implement the actual greeting
logic. We’ll want `call()` to take a subject to greet as an argument, so for
starters we’ll implement it like this:

<figure>

```js
function greeter() {
	function call(subject) {
		return `Hello, ${subject}`;
	}

	return call;
}
```

<figcaption>Preliminary implementation of the greeter <code>call()</code>
function</figcaption>
</figure>

The next thing we need to do is add a property to the greeter for the salutation
to replace the hard-coded `"Hello"`. We’ll add a variable to the closure to hold
the state, and add a property to our `call()` function to get and set the
salutation variable.

<figure>

```js
function greeter() {
	// "Private" variable for containing the salutation used by
	// our greeter, with a default value.
	let salutation = "Hello";

	function call(subject) {
		// Combine the salutation variable in the closure with the
		// subject argument to form the greeting.
		return `${salutation}, ${subject}`;
	}

	// Accessor for the salutation. When called with no argument,
	// it acts as a getter, otherwise it sets the salutation to
	// `value`
	call.salutation = function (value) {
		if (arguments.length < 1) return salutation;

		salutation = value;
	};

	return call;
}
```

<figcaption>Implementation of a greeter callable object</figcaption>
</figure>

If you’re thinking that this looks an awful lot like currying a function, you’re
not wrong. The big difference is that instead of passing in the state when we
call `greeter()`, we set the state using accessors. This has advantages in some
situations. It allows us to change state later without having to call
`greeter()` again to create a new callable. It also allows us to defer some of
our configuration to a later time.

## Spoiled for choice

Personally, I’m a fan of this particular pattern, but JavaScript is flexible
and there are plenty of other patterns you could use instead of creating a
callable object. Our trivial greeter example would do just fine as a simple
function, and you could always use an anonymous function if you needed to hold
the salutation constant for some reason.

<figure>

```js
> const hello = (subject) => greet("Hello", subject)
```

<figcaption>Recreating the stateful greeter using an anonymous
function.</figcaption>
</figure>

If you had a lot of state that makes for too many arguments passed to one
function, you could go the class route. In this case, instead of invoking the
object directly, you invoke a method on it. You know: object-orient programming,
if that’s your thing.

<figure>

```js
> const helloGreeter = new Greeter()
> helloGreeter.salutation = "Hello"
> helloGreeter.greet("world")
"Hello, world"
```

<figcaption>Invocation of the greeter as a traditional class-based
object.</figcaption>
</figure>

---

It’s possible that callable objects are appealing to me because they’re so
common in D3, and I really like working with D3. Why D3 makes so much sense to
me, though, I can’t say.
