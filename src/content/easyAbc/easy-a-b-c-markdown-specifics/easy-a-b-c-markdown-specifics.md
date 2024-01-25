---
title: 'EasyABC Markdown Specifics'
description: 'This is a guide for specific markdown syntax used in EasyABC.'
pubDate: 'Jan 24 2024'
updatedDate: 'Jan 02 2024'
heroImagePath: './easy-a-b-c-markdown-specifics/hero.jpg'
heroImage: './hero.jpg'
heroAlt: "A hero!"
---

This is a guide for specific markdown syntax used in EasyABC.

- This is in addition to the [general markdown guide.](/easy-a-b-c/markdown-style-guide)

<hr>

<h3> TL;DR </h3>

To resize and center images use the premade classes like:

```sh
![Alt text](./example.png)(class:'small')
![Alt text](./example.png)(class:'medium')
![Alt text](./example.png)(class:'large')
```

Add captions to images by adding the `caption` class to a tag like:

```sh
![Alt text](./example.png)(class:'medium')
<p class="caption">The Caption</p3>
```

<h3> Why this exists </h3>

Markdown (and the Astro rendering engine) natively supports adding images with the syntax:
```sh
![Alt text](./example.png)
```

![The example renders too small and not centered!](./example.png)

However, it does not provide away to style the image at all. This means the image will be at their original resolution, so you may end up with images that are larger or smaller than desired. Additionally, they will be be not be centered. *The example renders too small and not centered on desktop.*

<h3> A quick fix </h3>

Astro supports Remark plugins, and with the [remark-imgattr](https://github.com/OliverSpeir/remark-imgattr) plugin we can inline styles for image! 

```sh
![Alt text](./example.png)(
  style: '
    width: 36vw;
    display: flex; 
    margin-right: auto; 
    margin-left: auto;
    margin-bottom: 2em;
    margin-top: 1em;
  ')
```

![This for example sets an image to 33vw and centers it. But this is a bit verbose!](./example.png)(
    style: '
    width: 36vw;
    display: flex; 
    margin-right: auto; 
    margin-left: auto;
    margin-bottom: 2em;
    margin-top: 1em;
  ')

This example sets an image to 40vw and centers it. But this is a bit verbose and too much to coding when we're doing creative writing!

<h3> A better fix: pre-made classes </h3>

I've defined some premade classes for images that center and size them (dynamically).

```sh
![Alt text](./example.png)(class:'small')
![Alt text](./example.png)(class:'medium')
![Alt text](./example.png)(class:'large')
```

![Alt text](./example.png)(class:'small')

![Alt text](./example.png)(class:'medium')

![Alt text](./example.png)(class:'large')

<h3> Captions </h3>

I've defined a caption class you can use for your `<p>` tags.

```sh
![Alt text](./example.png)(class:'small')
<p class="caption">The Caption</p>
```

![Alt text](./example.png)(class:'small')
<p class="caption">The Caption</p3>

You can use other text tags as well.

```sh
![Alt text](./example.png)(class:'small')
<h6 class="caption">The Caption</h6>
```
![Alt text](./example.png)(class:'small')
<h6 class="caption">The Caption</h6>

<h3> Define your own classes </h3>

If you'd like to edit the pre-made classes or add your own open `src/styles/blog.css`, and add your changes!

<hr>

- This is based on the work of Oliver Speir's [remark-imgattr.](https://github.com/OliverSpeir/remark-imgattr)
  - This [Github issue](https://github.com/OliverSpeir/remark-imgattr/issues/1#issuecomment-1905098091) provides explicit details.