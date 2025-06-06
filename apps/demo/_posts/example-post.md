---
title: Example Post
excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus.'
coverImage: '/blog/dynamic-routing/cover.jpg'
date: '2024-03-16T05:35:07.322Z'
author:
  name: JJ Kasper
  picture: '/blog/authors/jj.jpeg'
ogImage:
  url: '/blog/dynamic-routing/cover.jpg'
---


## 组件

<!-- <Counter /> -->

This is an example post, with a [link](https://nextjs.org) and a React component:

<TestComponent name="next-mdx-remote" />

<Greeting person={{ name: "Alice" }}/>

The title and description are pulled from the MDX file and processed using `gray-matter`. Additionally, links are rendered using a custom component passed to `next-mdx-remote`.

Go back [blog](/blog).

## 数学公式

This is an inline _equation:_ $$V_{sphere} = \frac{4}{3}\pi r^3$$, followed by a display style equation after lots more lines of paragraph to test vertical alignment of inline expressions as well as the standalone expressions.
Here is also some **styled text**.

This is another inline expression $$\sum_{i=0}^n i^2 = \frac{(n^2+n)(2n+1)}{6}$$ followed by a normal expression, which align to the **_middle_** of the content:

$$
\begin{array}{c}
\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} &
= \frac{4\pi}{c}\vec{\mathbf{j}}    \nabla \cdot \vec{\mathbf{E}} & = 4 \pi \rho \\
\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t} & = \vec{\mathbf{0}} \\
\nabla \cdot \vec{\mathbf{B}} & = 0
\end{array}
$$

## Blog: A Chain Reaction

I wrote a bit of JSX in my editor:

```js
<p className="font-sans text-2xl text-purple-400 dark:text-purple-500">
  Hello, <i>Alice</i>!
</p>
```

Right now, this information only exists on _my_ device. But with a bit of luck, it will travel through time and space to _your_ device, and appear on _your_ screen.

<p className="font-sans text-2xl text-purple-400 dark:text-purple-500">
  Hello, <i>Alice</i>!
</p>

The fact that this works is a marvel of engineering.

Deep inside of your browser, there are pieces of code that know how to display a paragraph or draw text in italics. These pieces of code are different between different browsers, and even between different versions of the same browser. Drawing to the screen is also done differently on different operating systems.

在浏览器的深处，有一些代码知道如何显示段落或以斜体绘制文本。这些代码片段在不同的浏览器之间是不同的，甚至在同一浏览器的不同版本之间也是不同的。在不同的操作系统上，绘制到屏幕上的方式也不同。

However, because these concepts have been given agreed-upon _names_ ([`<p>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p) for a paragraph, [`<i>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i) for italics), I can refer to them without worrying how they _really_ work on your device. I can't directly access their internal logic but I know which information I can pass to them (such as a CSS [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)). Thanks to the web standards, I can be reasonably sure my greeting will appear as I intended.

然而，因为这些概念已经有了一致的名称(`<p>`表示段落，`<i>`表示斜体)，所以我可以引用它们而不必担心它们在您的设备上的实际工作方式。我不能直接访问它们的内部逻辑，但我知道我可以传递哪些信息给它们(比如CSS `className`)。感谢web标准，我可以合理地确定我的问候将按照我的意图出现。

Tags like `<p>` and `<i>` let us refer to the built-in browser concepts. However, names don't _have to_ refer to something built-in. For example, I'm using CSS classes like [`text-2xl`](https://tailwindcss.com/docs/font-size) and [`font-sans`](https://tailwindcss.com/docs/font-family) to style my greeting. I didn't come up with those names myself--they come from a CSS library called Tailwind. I've included it on this page which lets me use any of the CSS class names it defines.

So why do we like giving names to things?

---

I wrote `<p>` and `<i>`, and my editor recognized those names. So did your browser. If you've done some web development, you probably recognized them too, and maybe even guessed what would appear on the screen by reading the markup. In that sense, names help us start with a bit of a shared understanding.

Fundamentally, computers execute relatively basic kinds of instructions--like adding or multiplying numbers, writing stuff to memory and reading from it, or communicating with external devices like a display. Merely showing a `<p>` on your screen could involve running hundreds of thousands of such instructions.

If you saw all the instructions your computer ran to display a `<p>` on the screen, you could hardly guess what they're doing. It's like trying to figure out which song is playing by analyzing all the atoms bouncing around the room. It would seem incomprehensible! You'd need to "zoom out" to see what's going on.

To describe a complex system, or to instruct a complex system what to do, it helps to separate its behavior into layers that build on each other's concepts.

This way, people working on screen drivers can focus on how to send the right colors to the right pixels. Then people working on text rendering can focus on how each character should turn into a bunch of pixels. And that lets people like me focus on picking just the right color for my "paragraphs" and "italics".

We like names because they let us forget what's behind them.

---

I've used many names that other people came up with. Some are built into the browsers, like `<p>` and `<i>`. Some are built into the tools I'm using, like `text-2xl` and `font-sans`. These may be my building blocks, but what am _I_ building?

For example, what is this?

```js
<p className="font-sans text-2xl text-purple-400 dark:text-purple-500">
  Hello, <i>Alice</i>!
</p>
```

<p className="font-sans text-2xl text-purple-400 dark:text-purple-500">
  Hello, <i>Alice</i>!
</p>

From your browser's perspective, this is a paragraph with certain CSS classes (which make it large and purple) and some text inside (part of it is in italics).

But from _my_ perspective, it's _a greeting for Alice._ Although my greeting _happens_ to be a paragraph, most of the time I want to think about it this way instead:

```js
<Greeting person={alice} />
```

Giving this concept a name provides me with some newfound flexibility. I can now display multiple `Greeting`s without copying and pasting their markup. I can pass different data to them. If I wanted to change how all greetings look and behave, I could do it in a single place. Turning `Greeting` into its own concept lets me adjust _"which greetings to display"_ separately from _"what a greeting is"_.

However, I have also introduced a problem.

Now that I've given this concept a name, the "language" in my mind is different from the "language" that your browser speaks. Your browser knows about `<p>` and `<i>`, but it has never heard of a `<Greeting>`--that's my own concept. If I wanted your browser to understand what I mean, I'd have to "translate" this piece of markup to only use the concepts that your browser already knows.

I'd need to turn this:

```js
<Greeting person={alice} />
```

into this:

```js
<p className="font-sans text-2xl text-purple-400 dark:text-purple-500">
  Hello, <i>Alice</i>!
</p>
```

How would I go about that?

---

To name something, I need to define it.

For example, `alice` does not mean anything until I define `alice`:

```js
const alice = {
  firstName: "Alice",
  birthYear: 1970,
};
```

Now `alice` refers to that JavaScript object.

Similarly, I need to actually _define_ what my concept of a `Greeting` means.

I will define a `Greeting` for any `person` as a paragraph showing "Hello, " followed by _that_ person's first name in italics, plus an exclamation mark:

```js
function Greeting({ person }) {
  return (
    <p className="font-sans text-2xl text-purple-400 dark:text-purple-500">
      Hello, <i>{person.firstName}</i>!
    </p>
  );
}
```

Unlike `alice`, I defined `Greeting` as a function. This is because _a greeting_ would have to be different for every person. `Greeting` is a piece of code--it performs a _transformation_ or a _translation_. It _turns_ some data into some UI.

That gives me an idea for what to do with this:

```js
<Greeting person={alice} />
```

Your browser wouldn't know what a `Greeting` is--that's my own concept. But now that I wrote a definition for that concept, I can _apply_ this definition to "unpack" what I meant. You see, _a greeting for a person is actually a paragraph:_

```js {3-5}
function Greeting({ person }) {
  return (
    <p className="font-sans text-2xl text-purple-400 dark:text-purple-500">
      Hello, <i>{person.firstName}</i>!
    </p>
  );
}
```

Plugging the `alice`'s data into that definition, I end up with this final JSX:

```js
<p className="font-sans text-2xl text-purple-400 dark:text-purple-500">
  Hello, <i>Alice</i>!
</p>
```

At this point I only refer to the browser's own concepts. By substituting the `Greeting` with what I defined it to be, I have "translated" it for your browser.

<Greeting
  person={{
    name: "Alice",
    birthYear: 1970,
  }}
/>

Now let's teach a computer to do the same thing.

---

Take a look at what JSX is made of.

```js
const originalJSX = <Greeting person={alice} />;
console.log(originalJSX.type); // Greeting
console.log(originalJSX.props); // { person: { firstName: 'Alice', birthYear: 1970 } }
```

Under the hood, JSX constructs an object with the `type` property corresponding to the tag, and the `props` property corresponding to the JSX attributes.

You can think of `type` as being the "code" and `props` as being the "data". To get the result, you need to plug that data _into_ that code like I've done earlier.

Here is a little function I wrote that does exactly that:

```js
function translateForBrowser(originalJSX) {
  const { type, props } = originalJSX;
  return type(props);
}
```

In this case, `type` will be `Greeting` and `props` will be `{ person: alice }`, so `translateForBrowser(<Greeting person={alice} />)` will return the result of calling `Greeting` with `{ person: alice }` as the argument.

Which, as you might recall from the previous section, would give me this:

```js
<p className="font-sans text-2xl text-purple-400 dark:text-purple-500">
  Hello, <i>Alice</i>!
</p>
```

And that's exactly what I wanted!

You can verify that feeding my original piece of JSX to `translateForBrowser` will produce the "browser JSX" that only refers to concepts like `<p>` and `<i>`.

```js {5-7}
const originalJSX = <Greeting person={alice} />;
console.log(originalJSX.type); // Greeting
console.log(originalJSX.props); // { person: { firstName: 'Alice', birthYear: 1970 } }

const browserJSX = translateForBrowser(originalJSX);
console.log(browserJSX.type); // 'p'
console.log(browserJSX.props); // { className: 'text-2xl font-sans text-purple-400 dark:text-purple-500', children: ['Hello', { type: 'i', props: { children: 'Alice' }, '!'] }
```

There are many things I could do with that "browser JSX". For example, I could turn it into an HTML string to be sent to the browser. I could also convert it into a sequence of instructions that update an already existing DOM node. For now, I won't be focusing on the different ways to use it. All that matters right now is that by the time I have the "browser JSX", there is nothing left to "translate".

It's as if my `<Greeting>` has dissolved, and `<p>` and `<i>` are the residue.

---

Let's try something a tiny bit more complex. Suppose I want to wrap my greeting inside a [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) tag so that it appears collapsed by default:

```js {1,3}
<details>
  <Greeting person={alice} />
</details>
```

The browser should display it like this (click "Details" to expand it!)

<details className="pb-8">
  <Greeting
    person={{
      firstName: "Alice",
      birthYear: 1970,
    }}
  />
</details>

So now my task is to figure out how to turn this:

```js
<details>
  <Greeting person={alice} />
</details>
```

into this:

```js
<details>
  <p className="font-sans text-2xl text-purple-400 dark:text-purple-500">
    Hello, <i>Alice</i>!
  </p>
</details>
```

Let's see if `translateForBrowser` can already handle that.

```js {2-4,9}
const originalJSX = (
  <details>
    <Greeting person={alice} />
  </details>
);
console.log(originalJSX.type); // 'details'
console.log(originalJSX.props); // { children: { type: Greeting, props: { person: alice } } }

const browserJSX = translateForBrowser(originalJSX);
```

You will get an error inside of the `translateForBrowser` call:

```js {3}
function translateForBrowser(originalJSX) {
  const { type, props } = originalJSX;
  return type(props); // 🔴 TypeError: type is not a function
}
```

What happened here? My `translateForBrowser` implementation assumed that `type`--that is, `originalJSX.type`--is always a function like `Greeting`.

However, notice that `originalJSX.type` is actually a _string_ this time:

```js {6}
const originalJSX = (
  <details>
    <Greeting person={alice} />
  </details>
);
console.log(originalJSX.type); // 'details'
console.log(originalJSX.props); // { children: { type: Greeting, props: { person: alice } } }
```

When you start a JSX tag with a lower case (like `<details>`), by convention it's assumed that you _want_ a built-in tag rather than some function you defined.

Since built-in tags don't have any code associated with them (that code is somewhere inside your browser!), the `type` will be a string like `'details'`. How `<details>` work is opaque to my code--all I really know is its name.

Let's split the logic in two cases, and skip translating the built-ins for now:

```js {3,5-7}
function translateForBrowser(originalJSX) {
  const { type, props } = originalJSX;
  if (typeof type === "function") {
    return type(props);
  } else if (typeof type === "string") {
    return originalJSX;
  }
}
```

After this change, `translateForBrowser` will only attempt to call some function if the original JSX's `type` actually _is_ a function like `Greeting`.

So that's the result I wanted, right?...

```js
<details>
  <Greeting person={alice} />
</details>
```

Wait. What I wanted is this:

```js
<details>
  <p className="font-sans text-2xl text-purple-400 dark:text-purple-500">
    Hello, <i>Alice</i>!
  </p>
</details>
```

In my translation process, I want to _skip over_ the `<details>` tag because its implementation is opaque to me. I can't do anything useful with it--it is fully up to the browser. However, anything _inside_ of it may still need to be translated!

Let's fix `translateForBrowser` to translate any built-in tag's children:

```js {6-12}
function translateForBrowser(originalJSX) {
  const { type, props } = originalJSX;
  if (typeof type === "function") {
    return type(props);
  } else if (typeof type === "string") {
    return {
      type,
      props: {
        ...props,
        children: translateForBrowser(props.children),
      },
    };
  }
}
```

With this change, when it meets an element like `<details>...</details>`, it will return another `<details>...</details>` tag, but the stuff _inside_ of it would be translated with my function again--so the `Greeting` will be gone:

```js
<details>
  <p className="font-sans text-2xl text-purple-400 dark:text-purple-500">
    Hello, <i>Alice</i>!
  </p>
</details>
```

And _now_ I am speaking the browser's "language" again:

<details className="pb-8">
  <p className="font-sans text-2xl text-purple-400 dark:text-purple-500">
    Hello, <i>Alice</i>!
  </p>
</details>

The `Greeting` has been dissolved.

---

Now suppose that I try to define an `ExpandableGreeting`:

```js
function ExpandableGreeting({ person }) {
  return (
    <details>
      <Greeting person={person} />
    </details>
  );
}
```

Here is my new original JSX:

```js
<ExpandableGreeting person={alice} />
```

If I run it through `translateForBrowser`, I'll get this JSX in return:

```js
<details>
  <Greeting person={alice} />
</details>
```

But that's not what I wanted! It still has a `Greeting` in it, and we don't consider a piece of JSX "browser-ready" until _all_ of my own concepts are gone.

This is a bug in my `translateForBrowser` function. When it calls a function like `ExpandableGreeting`, it will return its output, and not do anything else. But we need to keep on going! That returned JSX _also_ needs to be translated.

Luckily, there is an easy way I can solve this. When I call a function like `ExpandableGreeting`, I can take the JSX it returned and translate _that_ next:

```js {4-5}
function translateForBrowser(originalJSX) {
  const { type, props } = originalJSX;
  if (typeof type === "function") {
    const returnedJSX = type(props);
    return translateForBrowser(returnedJSX);
  } else if (typeof type === "string") {
    return {
      type,
      props: {
        ...props,
        children: translateForBrowser(props.children),
      },
    };
  }
}
```

I also need to stop the process when there's nothing left to translate, like if it receives `null` or a string. If it receives an array of things, I need to translate each of them. With these two fixes, `translateForBrowser` is complete:

```js {2-7}
function translateForBrowser(originalJSX) {
  if (originalJSX == null || typeof originalJSX !== "object") {
    return originalJSX;
  }
  if (Array.isArray(originalJSX)) {
    return originalJSX.map(translateForBrowser);
  }
  const { type, props } = originalJSX;
  if (typeof type === "function") {
    const returnedJSX = type(props);
    return translateForBrowser(returnedJSX);
  } else if (typeof type === "string") {
    return {
      type,
      props: {
        ...props,
        children: translateForBrowser(props.children),
      },
    };
  }
}
```

Now, suppose that I start with this:

```js
<ExpandableGreeting person={alice} />
```

It will turn into this:

```js
<details>
  <Greeting person={alice} />
</details>
```

Which will turn into this:

```js
<details>
  <p className="font-sans text-2xl text-purple-400 dark:text-purple-500">
    Hello, <i>Alice</i>!
  </p>
</details>
```

And at that point, the process will stop.

---

Let's see how this works one more time, with a bit of extra depth.

I'll define `WelcomePage` like this:

```js
function WelcomePage() {
  return (
    <section>
      <h1 className="pb-2 font-sans text-3xl">Welcome</h1>
      <ExpandableGreeting person={alice} />
      <ExpandableGreeting person={bob} />
      <ExpandableGreeting person={crystal} />
    </section>
  );
}
```

Now let's say I start the process with this original JSX:

```js
<WelcomePage />
```

Can you retrace the sequence of transformations in your head?

Let's do it step by step together.

First, imagine `WelcomePage` dissolving, leaving behind its output:

```js {1-6}
<section>
  <h1 className="pb-2 font-sans text-3xl">Welcome</h1>
  <ExpandableGreeting person={alice} />
  <ExpandableGreeting person={bob} />
  <ExpandableGreeting person={crystal} />
</section>
```

Then imagine each `ExpandableGreeting` dissolving, leaving behind _its_ output:

```js {3-11}
<section>
  <h1 className="pb-2 font-sans text-3xl">Welcome</h1>
  <details>
    <Greeting person={alice} />
  </details>
  <details>
    <Greeting person={bob} />
  </details>
  <details>
    <Greeting person={crystal} />
  </details>
</section>
```

Then imagine each `Greeting` dissolving, leaving behind _its_ output:

```js {4-6,9-11,14-16}
<section>
  <h1 className="pb-2 font-sans text-3xl">Welcome</h1>
  <details>
    <p className="font-sans text-2xl text-purple-400 dark:text-purple-500">
      Hello, <i>Alice</i>!
    </p>
  </details>
  <details>
    <p className="font-sans text-2xl text-purple-400 dark:text-purple-500">
      Hello, <i>Bob</i>!
    </p>
  </details>
  <details>
    <p className="font-sans text-2xl text-purple-400 dark:text-purple-500">
      Hello, <i>Crystal</i>!
    </p>
  </details>
</section>
```

And now there is nothing left to "translate". All _my_ concepts have dissolved.

<section className="pb-8">
  <h1 className="pb-2 font-sans text-3xl">Welcome</h1>
  <details>
    <p className="font-sans text-2xl text-purple-400 dark:text-purple-500">
      Hello, <i>Alice</i>!
    </p>
  </details>
  <details>
    <p className="font-sans text-2xl text-purple-400 dark:text-purple-500">
      Hello, <i>Bob</i>!
    </p>
  </details>
  <details>
    <p className="font-sans text-2xl text-purple-400 dark:text-purple-500">
      Hello, <i>Crystal</i>!
    </p>
  </details>
</section>

This feels like a chain reaction. You mix a bit of data and code, and it keeps transforming until there is no more code to run, and only the residue is left.

It would be nice if there was a library that could do this for us.

But wait, here's a question. These transformations have to happen _somewhere_ on the way between your computer and mine. So where _do_ they happen?

Do they happen on your computer?

Or do they happen on mine?
