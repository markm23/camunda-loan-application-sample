import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/token": {
        // The path your React app makes requests to
        target: "https://pdf-services-ew1.adobe.io/token",
        changeOrigin: true,
        // Optional: Configure secure, rewrite, etc.: https://vitejs.dev/config/#server-proxy
      },
    },
  },
});
