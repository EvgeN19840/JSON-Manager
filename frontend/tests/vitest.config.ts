import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['tests/unit/**/*.{test,spec}.{ts,tsx,js}'],
    exclude: ['e2e/**', 'node_modules/**'],
  },
});