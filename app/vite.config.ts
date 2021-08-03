import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import reactJsx from 'vite-react-jsx'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [reactRefresh(), reactJsx(), VitePWA()],
  optimizeDeps: {
    exclude: ['lodash.mergeWith', 'tinycolor2'],
  },
})
