import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
      proxy: {
        '/api': { // Matches API requests starting with '/api'
          target: 'http://localhost:8000', // Replace with your backend server URL
          changeOrigin: true, // Change origin to match frontend domain for CORS
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

  
  });

