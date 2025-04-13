import { defineConfig } from 'vite'
import path from 'node:path'

export default defineConfig({
  build: {
    target: 'es2017',
    lib: {
      name: '__anyframe_css__',
      entry: './src/index.ts',
      formats: ['es', 'iife', 'cjs'],
      fileName: (format) => `anycss.${format !== 'cjs' ? `${format}.js` : format}`
    },
    rollupOptions: {
      output: {
        exports: 'named'
      }
    }
  },
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, './src'),
      '@types': path.resolve(__dirname, './src/types')
    }
  }
})
