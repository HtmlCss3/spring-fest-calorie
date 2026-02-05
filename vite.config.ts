import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/spring-fest-calorie/',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})