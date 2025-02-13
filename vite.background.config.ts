import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { CRX_BACKGROUND_OUTDIR } from './globalConfig'
import type { LibraryFormats } from 'vite'

export default defineConfig(() => {
    return {
        plugins: [vue()],
        resolve: {
            alias: {
                '@': '/src',
            },
        },
        server: {
            host: true,
        },
        build: {
            outDir: CRX_BACKGROUND_OUTDIR,
            lib: {
                entry: [path.resolve(__dirname, 'src/background/index.ts')],
                formats: ['cjs'] as LibraryFormats[],
                fileName: () => {
                    return 'background.js'
                },
            },
            rollupOptions: {
                output: {
                    assetFileNames: () => {
                        // 附属文件命名，content script会生成配套的css
                        return 'content.css'
                    },
                },
            },
        },
    }
})
