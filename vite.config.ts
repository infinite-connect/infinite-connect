import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      strategies: "injectManifest", // 직접 작성한 service-worker.ts 사용
      srcDir: "src", // 서비스 워커 파일 위치
      filename: "service-worker.ts", // 사용할 service-worker.ts 파일 지정
      devOptions: {
        enabled: true, // vite dev 로 돌려도 PWA 까지 볼 수 있게끔 주는 옵션
      },
      includeAssets: ["/icons/icon-192x192.png", "/icons/icon-512x512.png"], // 로컬 경로의 이미지 참조
      manifest: {
        id: "/", // ✅ ID 추가 (경고 해결)
        name: "Infinite Connect",
        short_name: "InfiniteConnect",
        description: "Networking PWA conference app",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          // ✅ PWA UI 강화를 위해 추가
          {
            src: "/screenshots/screenshot-1.png",
            sizes: "1080x1920",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/screenshots/screenshot-2.png",
            sizes: "1080x1920",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/your-api-url\.com\/.*/, // Example API caching
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: { maxEntries: 50, maxAgeSeconds: 86400 },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
