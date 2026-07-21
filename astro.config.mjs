// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO: set this to your real domain (or https://<user>.github.io) before deploying.
  site: 'https://example.com',
  // TODO: if deploying to a GitHub Pages project site (username.github.io/repo),
  // set this to '/repo/' and update the CI deploy job's site/base accordingly.
  base: '/',
  vite: {
    plugins: [tailwindcss()],
  },
});
