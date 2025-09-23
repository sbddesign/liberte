import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { handleVoltageRequest } from './src/api/voltage'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      react(),
      tailwindcss(),
      // Custom plugin to handle API routes
      {
        name: 'voltage-api',
        configureServer(server) {
          // Set environment variables for the server
          process.env.VOLTAGE_API_KEY = env.VOLTAGE_API_KEY
          process.env.VOLTAGE_BASE_URL = env.VOLTAGE_BASE_URL
          process.env.VOLTAGE_TIMEOUT = env.VOLTAGE_TIMEOUT
          process.env.VOLTAGE_ORGANIZATION_ID = env.VOLTAGE_ORGANIZATION_ID
          
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
  }
})

