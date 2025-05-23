import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      // '@': path.resolve(__dirname, 'src'), // Establece el alias @ para la carpeta src
    },
  },
})
