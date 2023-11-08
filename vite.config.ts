import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true,
      },
      registerType: "autoUpdate",
      manifest: {
        name: "Sports Pulse application",
        short_name: "Sports Pulse",
        icons: [
          {
            src: "/favicon.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
          {
            src: "/16x16.png",
            type: "image/png",
            sizes: "16x16",
          },
          {
            src: "/32x32.png",
            type: "image/png",
            sizes: "32x32",
          },
          {
            src: "/192x192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "/512x512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "any maskable",
          },
        ],
        theme_color: "#AAF",
      },
    }),
  ],
});
