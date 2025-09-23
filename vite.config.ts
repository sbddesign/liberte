import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { handleVoltageRequest } from './src/api/voltage'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Custom plugin to handle API routes
    {
      name: 'voltage-api',
      configureServer(server) {
        server.middlewares.use('/api/voltage', handleVoltageRequest);
      }
    }
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})

