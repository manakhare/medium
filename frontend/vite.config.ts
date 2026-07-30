// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config'   // was 'vite' — vitest/config adds `test` typings
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  plugins: [react()],
  test: {
    environment: 'jsdom',        // give tests a fake browser DOM
    globals: true,               // use describe/it/expect without importing them
    setupFiles: './src/test/setup.ts', // runs before every test file
    css: true,                   // don't choke on `import './x.css'`
  },
})