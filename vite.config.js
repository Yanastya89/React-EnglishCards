import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:"./",
    "proxy": "<http://itgirlschool.justmakeit.ru>",
 })
