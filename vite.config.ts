import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        // Expose Claude key into the browser bundle so the app can call Anthropic
        // directly (with anthropic-dangerous-direct-browser-access header) when
        // the server-side proxy is unavailable or returns errors.
        'process.env.VITE_CLAUDE_API_KEY': JSON.stringify(
          env.CLAUDE_API_KEY || env.VITE_CLAUDE_API_KEY || ''
        ),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
