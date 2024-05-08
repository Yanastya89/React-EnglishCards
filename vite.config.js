import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:"./",
  "proxy": {
    "/search": {
      "target": "<https://www.google.com>",
      "changeOrigin": true
    },
    "/api": {
      "target": "<http://itgirlschool.justmakeit.ru>",
      "changeOrigin": true
    }
  }
})
