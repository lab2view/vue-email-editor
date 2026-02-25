import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'EmailEditor',
      formats: ['es'],
      fileName: 'email-editor',
    },
    rollupOptions: {
      external: ['vue', 'mjml-browser'],
      output: {
        globals: {
          vue: 'Vue',
          'mjml-browser': 'mjml',
        },
        manualChunks(id) {
          // TipTap + ProseMirror in their own chunk (loaded on inline edit)
          if (id.includes('@tiptap') || id.includes('prosemirror') || id.includes('tippy')) {
            return 'tiptap'
          }
          // CodeMirror in its own chunk (loaded on code view)
          if (id.includes('@codemirror') || id.includes('@lezer')) {
            return 'codemirror'
          }
        },
      },
    },
    sourcemap: true,
  },
})
