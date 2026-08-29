import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 部署在子路径（/<repo>/）下时，资源路径需要带 base；
  // 本地构建/局域网部署不设置该变量，默认 '/'
  base: process.env.BASE_PATH || '/',
})
