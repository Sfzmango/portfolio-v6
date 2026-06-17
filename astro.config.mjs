// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Locked subpath hosting on GitHub Pages: sfzmango.github.io/portfolio-v6
  site: 'https://sfzmango.github.io',
  base: '/portfolio-v6',
  trailingSlash: 'ignore',
  output: 'static',
  integrations: [
    tailwind({
      // global.css owns the @tailwind directives + design tokens; don't inject a base sheet.
      applyBaseStyles: false,
    }),
    react(),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
