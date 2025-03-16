// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkGfm from 'remark-gfm';

// https://astro.build/config
export default defineConfig({
	site: 'https://dsx-blog.vercel.app',
	integrations: [
		mdx({
			remarkPlugins: [remarkGfm],
			gfm: true,
		}),
		sitemap()
	],
});
