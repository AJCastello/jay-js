import { defineConfig } from 'vite';
import { jayJsInspector } from '@jay-js/inspector';

export default defineConfig({
  plugins: [
    jayJsInspector({
      enabled: process.env.NODE_ENV === 'development',
      editor: 'code', // or 'vscode', 'cursor', 'webstorm', 'atom'
      activationKey: 'shift+click',
      overlayStyles: {
        backgroundColor: 'rgba(65, 184, 131, 0.2)',
        borderColor: '#41b883',
        borderWidth: '2px',
        borderStyle: 'solid',
        opacity: 0.8,
      },
    }),
  ],
  server: {
    port: 3000,
  },
});