import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Custom plugin to handle API routes
    {
      name: 'voltage-api',
      configureServer(server) {
        server.middlewares.use('/api/voltage', async (req, res, next) => {
          if (req.method === 'POST') {
            try {
              // Read request body
              let body = '';
              req.on('data', chunk => {
                body += chunk.toString();
              });
              
              req.on('end', () => {
                console.log('Voltage API called with data:', body);
                
                // Return 202 Accepted status
                res.statusCode = 202;
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
                
                const response = {
                  message: 'Voltage request received and accepted',
                  timestamp: new Date().toISOString(),
                  status: 'accepted'
                };
                
                res.end(JSON.stringify(response));
              });
            } catch (error) {
              console.error('Error handling voltage request:', error);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Internal server error' }));
            }
          } else if (req.method === 'OPTIONS') {
            // Handle CORS preflight
            res.statusCode = 200;
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            res.end();
          } else {
            next();
          }
        });
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

