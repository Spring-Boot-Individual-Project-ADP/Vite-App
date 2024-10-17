import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDocker = process.env.IS_DOCKER === 'true';

  return {
    plugins: [react()],
    server: {
      host: true,
      proxy: {
        '/api': {
          target: isDocker ? 'http://data-server:8080' : 'http://localhost:8080',
          changeOrigin: true,
        },
        '/account': {
          target: isDocker ? 'http://account-server:8081' : 'http://localhost:8081',
          changeOrigin: true,
        },
      },
    },
  };
});