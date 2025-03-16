// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import auth from 'auth-astro';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: vercel(),
	integrations: [mdx(), sitemap(), auth()]
});
