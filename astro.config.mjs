// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import auth from 'auth-astro';
import node from '@astrojs/node';
import remarkGfm from 'remark-gfm';

// https://astro.build/config
export default defineConfig({
	site: 'https://dsx-blog.vercel.app',
	output: 'server',
	adapter: node({
		mode: 'standalone'
	}),
	integrations: [
		mdx({
			remarkPlugins: [remarkGfm],
			gfm: true,
		}),
		sitemap(),
		auth()
	],
});
