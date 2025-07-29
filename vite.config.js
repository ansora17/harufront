import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5174, // 백엔드 CORS 설정과 일치하도록 포트 고정
    proxy: {
      "/api": {
        target: "http://localhost:8080", // 백엔드 서버 주소
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, _res) => {
            console.log("🚨 프록시 에러:", err);
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log("🔍 프록시 요청:", req.method, req.url);
          });
          proxy.on("proxyRes", (proxyRes, req, _res) => {
            console.log("🔍 프록시 응답:", proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
});
