import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    base: '/treasure-game-vue/', // 替换为你的仓库名
    server: {
        port: 3000,
        host: true
    },
    build: {
        outDir: 'dist'
    }
})