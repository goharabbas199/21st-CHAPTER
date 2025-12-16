import { defineConfig } from 'vite';

export default defineConfig({
  // Use relative paths so the built site works on GitHub Pages project URLs
  // like https://USERNAME.github.io/REPO/
  base: './',
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true
  }
});
