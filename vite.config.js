import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "https://fakestoreapi.com",
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ""),
            }
        }
   /*     proxy: {
            "/api": {
                target: "https://fakestoreapi.com",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
            '/assets': {
                target: 'https://fakestoreapi.com',
                changeOrigin: true,
          
            }
        },*/
    },
});
