import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    proxy: {
      // When you call '/api/quiz?level=1' in your code, it will be proxied to the external API
      '/api': {
        target: 'https://api-ghz-v2.azurewebsites.net',
        changeOrigin: true,
        // Rewrite '/api' to '/api/v2' so that '/api/quiz?level=1' becomes '/api/v2/quiz?level=1'
        rewrite: (path) => path.replace(/^\/api/, '/api/v2')
      }
    }
  }
})