import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['**/__tests__/**/*.{test,spec}.ts', '**/*.{test,spec}.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{js,ts}'],
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
