/* eslint-disable */
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import reactJsx from 'vite-react-jsx'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'
import ssr from 'vite-plugin-ssr/plugin'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [reactRefresh(), reactJsx(), VitePWA()],
  optimizeDeps: {
    exclude: ['lodash.mergeWith', 'tinycolor2'],
  },
  resolve: {
    alias: {
      '~': path.join(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      plugins: [visualizer()].filter(Boolean),
    },
  },
})
