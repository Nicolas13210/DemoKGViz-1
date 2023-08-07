import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: './' ,
  
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8890/sparql',
        changeOrigin: true,
        secure:false ,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    cors:false
  }, 
  
})
