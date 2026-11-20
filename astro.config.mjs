// @ts-check
import { defineConfig } from 'astro/config';

// Moonlaugh website. Static output: every page is pre-rendered to HTML at build time.
// See docs/ARCHITECTURE.md for the overall structure.
export default defineConfig({
  // Change this to the real domain once it is bought (used for canonical and hreflang URLs).
  site: 'https://moonlaugh.com',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
