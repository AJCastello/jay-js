import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: [
      'src/**/__tests__/**/*.ts',
      'src/**/?(*.)+(spec|test).ts'
    ],
    exclude: [
      'src/**/*.d.ts',
      'node_modules',
      'dist'
    ],
    coverage: {
      provider: 'v8',
      include: [
        'src/**/*.ts'
      ],
      exclude: [
        'src/**/*.d.ts',
        'src/**/__tests__/**',
        'src/vite-plugin/**'
      ],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80
      }
    }
  }
});
