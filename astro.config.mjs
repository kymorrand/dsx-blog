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
		includeFiles: ['./src/content/**/*'],
		webAnalytics: {
			enabled: false
		},
		speedInsights: {
			enabled: false
		},
		isr: {
			expiration: false
		}
	}),
	integrations: [
		mdx({
			optimize: true,
			extendMarkdownConfig: false
		}),
		sitemap(),
		auth()
	],
	vite: {
		ssr: {
			noExternal: ['@auth/core']
		},
		optimizeDeps: {
			exclude: ['@auth/core']
		}
	}
});
