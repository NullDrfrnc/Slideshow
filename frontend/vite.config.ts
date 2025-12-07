import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "./src"),
      '#': path.resolve(__dirname, "./src/assets/css"),
      '$': path.resolve(__dirname, "./src/assets/icons")
    }
  },
  base: "/"
})
