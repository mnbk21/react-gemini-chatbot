import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import env from "vite-plugin-env-compatible"; // viteでも.envファイルを使えるようにする

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    env({ prefix: "VITE", mountedPath: "process.env" }), // viteでも.envファイルを使えるようにする
  ],
})
