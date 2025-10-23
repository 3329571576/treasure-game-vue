import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './',  // 使用相对路径
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist'
  }
})
