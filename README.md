<img src="/public/easy-abc/easyHero.png" alt="Alt text" style="height: 200px; width: auto; display: flex; margin-right: auto; margin-left: auto; margin-bottom: 2em; border-radius: 0.5rem;">

[EasyABC Live Demo](https://shelbyjenkins.github.io/)

- Create and host a blog for free using github pages
- _Almost_ WYSIWYG with plain text + markdown
- Step-by-step instructions for usage, styling, and deploying
- Based on the excellent 🧑‍🚀 [Astro](https://astro.build/) 🧑‍🚀 meta-framework

<h4>Already ready to start?</h4>

```sh
git clone https://github.com/ShelbyJenkins/easy-astro-blog-creator
```

<!-- [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/blog/devcontainer.json) -->

---

<!-- Here we should have some images of example usages -->
<!-- This should start closed -->
<details closed>
  <summary><h1> Why </h1></summary>

  <h4>No Paywalls and Walled Gardens.</h4>

- Blogging platforms like Medium put your posts behind a paywall. Others like Substack and Dev.to might someday do the same.
- Linkedin and other social media are in the business of controlling your content. It can make organic discovery of your content via SEO difficult or impossible.

<h4>Github and Git is pretty great!</h4>

- Git gives you a higher level of version control (saving), remote editing, and redudancy.
- You maintain complete control of your work to share, edit, or export for other platforms.
- Github Pages are free (for now), but because it's built on Git you can export to another provider easily.

<h4>It's more professional.</h4>

- A Github Page is considered _safe_ to click on as a common, well known, non-paywalled service.
- You can use your own domain name and your own styling to really create something unique.

<h4>It's fun!</h4>

- If you are comfortable with not understanding _everything_, it's an enjoyable experience to create and learn.
- It's actually really easy (30m-60m).

</details>

<details open>
    <summary><h1> Setup </h1></summary>

<h4>First Steps</h4>

- You will need a _fancy_ text editor called '[VS Code](https://code.visualstudio.com/)'. It's not just for coders!
- If you're very new to this, I'd suggest asking any questions you have to ChatGPT. It's very good at giving step-by-step instructions for common tasks.
- You will also need [NPM.](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-version-manager-to-install-nodejs-and-npm)

_It should also be possible to use a Github Codespace to create and edit a blog without installing anything. In the future I may write instructions for this which will simplify things._

<h4>Install</h4>

- Fork the [existing repository](https://github.com/ShelbyJenkins/easy-astro-blog-creator) by going to github and pressing the fork button.
  - Important! Name the repository with this format: `GITHUB_USERNAME.github.io`.
  - For example mine is `shelbyjenkins.github.io`.
- Download the repository with:
  ```sh
  git clone https://github.com/GITHUB_USERNAME/GITHUB_USERNAME.github.io
  ```
- Move into the directory:
  ```sh
  cd GITHUB_USERNAME.github.io
  ```
- Install all the related dependencies with:
  ```sh
  npm install
  ```
- Start the Thing!
`sh
    npm run dev
    `
</details>

<details open>
  <summary><h1> Usage </h1></summary>

<h4>Adding your content</h4>

- Your content will live in the `src/content/blog` folder.
  - By adding a markdown file to this folder, it will automatically be added to the blog.
  - If you plan on having many posts with images, I suggest using sub-folders like `src/content/blog/post-1`.
- Select `src/content/blog/template`, copy it, and paste it to duplicate it. You can then rename it however you like.
  - The folder name must match the markdown file within it. For example `src/content/blog/your-post` must contain `src/content/blog/your-post/your-post.md`
- Your new blog post will now be in your browser!
<h4>Working with markdown</h4>

- Markdown is straight forward and you defintely use it in some form already. For example: Slack and Discord both use flavors of markdown. - Check out the [general markdown guide](/easy/markdown-style-guide) for some notes. - And also the [EasyABC markdown specifics guide](/easy/easy-markdown-specifics).
<h4>Your homepage</h4>

- The landing page for your website is `src/pages/index.astro`.
  - Update this however you like.

</details>

<details open>
  <summary><h1> Config and Deploy </h1></summary>

<h4>Config</h4>

- Open `src/consts.ts` and set the information within. This sets things like adding your name and social links.
- Replace `public/favicon.png` with your choice of image.
- Finally, lets remove the EasyABC content from your blog!
- Go to `src/components/Navbar.astro` and comment out or remove this line: `<HeaderLink href="/easy">EasyABC</HeaderLink>`. This removes the link in the header.
- Rename `src/content/blog/template` to `src/content/blog/_template`. Pre-fixing `_` tells Astro to ignore this item, but it will be there for you to copy from in the future!
<h4>Deploy</h4>

- In your Github repository go to the settings and find the pages panel.
  - Set the Source dropdown to Github Actions.
    - Set the Source dropdown to Github Actions.
- In your VSCode terminal in the project root folder (The folder with the README.md) run these commands:
`sh
    git commit -m "my first commit"
    git branch -M main
    git push -u origin main
    `
</details>

## 👀 Want to learn more?

Check out [the Astro documentation](https://docs.astro.build).

## Credit

This project used the [Astro Blog example](https://github.com/withastro/astro/tree/main/examples/blog) as a starting point.

Dynamic images and presets are from Oliver Speir's [remark-imgattr](https://github.com/OliverSpeir/remark-imgattr)
