// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import auth from 'auth-astro';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: vercel({
		functionPerRoute: false,
		includeFiles: [
			'./src/content/**/*'
		],
		webAnalytics: {
			enabled: false
		},
		speedInsights: {
			enabled: false
		},
		imageService: false,
		devImageService: 'sharp'
	}),
	integrations: [
		mdx({
			optimize: true
		}),
		sitemap(),
		auth()
	]
});
