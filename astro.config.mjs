// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import auth from 'auth-astro';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
	site: 'https://dsx-blog.vercel.app',
	output: 'server',
	adapter: vercel({
		webAnalytics: {
			enabled: true,
		},
		maxDuration: 60
	}),
	integrations: [
		mdx(),
		sitemap(),
		auth()
	],
});
