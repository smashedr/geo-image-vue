import path from 'node:path'
import { crx } from '@crxjs/vite-plugin'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import zip from 'vite-plugin-zip-pack'
import { name, version } from './package.json'
import manifest from './manifest.config.ts'

export default defineConfig({
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}`,
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      '~bootswatch': path.resolve(__dirname, 'node_modules/bootswatch'),
    },
  },
  plugins: [
    vue(),
    crx({ manifest }),
    zip({ outDir: 'web-ext-artifacts', outFileName: `${name}-chrome-${version}.zip` }),
  ],
  server: {
    cors: {
      origin: [/chrome-extension:\/\//],
    },
  },
  build: {
    rollupOptions: {
      input: {
        permissions: 'src/permissions/index.html',
        popout: 'src/popout/index.html',
        page: 'src/page/index.html',
      },
    },
  },
  // NOTE: This silences bootstrap deprecation warnings
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        silenceDeprecations: [
          'import',
          'color-functions',
          'global-builtin',
          'if-function',
        ],
      },
    },
  },
})
