import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Se actualiza sola cuando hacés cambios
      manifest: {
        name: 'Vinyl Wishlist',
        short_name: 'Wishlist',
        description: 'Mi colección personal de vinilos',
        theme_color: '#0f172a', // Color de la barra de estado en Android
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable' // Esto hace que el icono se vea bien en todos los Android
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      // Configuramos el alias @ para que apunte a la carpeta /src
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@/styles/variables" as *;
        @use "@/styles/mixins" as *;
        `
      }
    }
  }
})
