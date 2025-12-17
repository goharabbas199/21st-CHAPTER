import { defineConfig } from "vite";

export default defineConfig({
  base: "/",

  server: {
    host: "0.0.0.0",
    port: 0,
    strictPort: false,

    // ✅ Allow Replit preview hostnames
    allowedHosts: [
      ".replit.dev",
      ".replit.app",
      ".replit.co",
      ".spock.replit.dev",
    ],
  },
});
