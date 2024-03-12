---
title: 'Template for creating new posts'
# Optional
description: 'If provided the description field will be used for previews. If not provided, the first 3-4 lines from the post will be used as a description.'

# Published date is required and in the format of ISO-8601: `yyyy-mm-dd`. For more info see https://docs.astro.build/en/guides/content-collections/#working-with-dates-in-the-frontmatter
pubDate: 2023-01-01
# Optionally specify an update date. If not provided, one will be generated from the git history. Only if the post has been changed since the day published.
updatedDate: 2023-01-01
heroImage: './hero.png'
# Optional
heroAlt: 'Describe the image for screen readers.'
---

## Adding new posts

New posts can be added in two ways:

- Adding an individual markdown file into the `public/personal-blog/blog` directory.

- Adding a directory with a markdown file inside it into the `public/personal-blog/blog` directory.
  - The new directory name must match the markdown file within it. For example `public/personal-blog/blog/your-post` must contain `public/personal-blog/blog/your-post/your-post.md`

I prefer adding a new directory as it makes it easy to organize - especially when it comes to images. This way you you can have `heroImage.png` in every folder rather than having a bunch of loose images in the `public/personal-blog/blog` folder.

## Adding post meta-data

At the top of each post is a section like:

```md
---
title: 'Template for creating new posts'
description: 'If provided the description field will be used for previews. If not provided, the first 3-4 lines from the post will be used as a description.'
pubDate: 2024-01-01
heroImage: './hero.png'
heroAlt: 'Describe the image for screen readers.'
---
```

This section is not included in the published blog, but is used to generate details about the post. See the comment in `public/personal-blog/blog/template/template.md` for specific instructions about each field.

## Adding images

### Hero image

The hero image is used for the hero image at the top of the blog on and social media previews of the post.

You can add it by setting `heroImage:` line in the post metadata to the file you've dragged and dropped into the folder.

For example `heroImage: './hero.png'` references `public/personal-blog/blog/template/hero.png`

### In blog images

Images can be added to your blog by adding the images to the folder containing the posts markdown file.

You can then link to the images like `![Alt text](./example.png)`.

You can adjust the size and even add captions like:

```md
![Alt text](./example.png)(class:'small')

<p class="caption">The Caption</p>
```

See [this post for more information about images](https://shelbyjenkins.github.io/easy/blog/easy-a-b-c-markdown-specifics/).

## Removing Posts

You can remove anything from your blog by rename it so that the file or directory starts with an underscore.

For example to remove the template simply rename the folder `public/personal-blog/blog/_template`
