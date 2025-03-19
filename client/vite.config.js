import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 4000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:4001',
        secure: false,
        changeOrigin: true
      }
    }
  },
})
