# The Builders Log

A daily development blog documenting the journey of building The Digital Sunshine Exchange (DSX) through Lab3. This blog uses AI-assisted content generation to create and publish daily logs across multiple platforms.

## 🎯 Project Overview

The Builders Log provides an innovative approach to development blogging through AI-assisted documentation:

1. **Builder Authentication**: Secure login for authorized builders
2. **Interactive Documentation**: Conversational interface with an AI Buddy
3. **Smart Content Generation**: AI-powered blog post creation based on daily progress
4. **Multi-Platform Publishing**: Automated syndication to multiple platforms
   - Main MDX blog
   - BlueSky
   - Twitter
   - LinkedIn

## 🔄 Daily Workflow

1. **Login**: Access the platform as a Builder
2. **Daily Interview**: 
   - Engage with AI Buddy
   - Answer 3-7 targeted questions about your progress
3. **Content Review**:
   - Review AI-generated blog post
   - Collaborate with Buddy on refinements
4. **Publishing**:
   - Approve final content
   - Automated multi-platform distribution
5. **Logout**

## 🚀 Technical Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🛠️ Development Setup

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## 🤝 Contributing

This is a personal development blog for documenting the DSX journey. While the blog content is not open for contributions, the technical implementation improvements are welcome through issues and pull requests.

## 📝 License

Copyright (c) 2024 Lab3. All rights reserved.

---

Built with [Astro](https://astro.build) 🚀
