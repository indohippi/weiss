import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/weiss/',
  plugins: [react()],
  server: {
    port: 3000,
    open: '/weiss/'
  }
})


