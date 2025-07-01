import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { CRX_CONTENT_OUTDIR } from './globalConfig'
import type { LibraryFormats } from 'vite'
import { ConfigEnv, loadEnv } from 'vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteSvgLoader from 'vite-svg-loader'

export default defineConfig((env: ConfigEnv) => {
    const { mode } = env
    // 环境变量
    const envVar = loadEnv(mode, process.cwd())
    return {
        plugins: [
            vue(),
            viteSvgLoader(),
            AutoImport({
                imports: ['vue'],
            }),
            // 这里是必须的，因为打包时，会根据项目中el的使用情况，自动导入组件
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
        resolve: {
            alias: {
                '@': '/src',
                '@content': '/src/content',
                '@popup': '/src/popup',
                '@background': '/src/background',
            },
        },
        server: {
            host: true,
        },
        build: {
            outDir: CRX_CONTENT_OUTDIR,
            lib: {
                entry: [path.resolve(__dirname, 'src/content/index.ts')],
                formats: ['cjs'] as LibraryFormats[],
                fileName: () => {
                    return 'content.js'
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
        // 定义全局变量，这里定义全局变量是因为content.js在执行中拿不到process.env
        define: {
            'process.env': envVar,
        },
    }
})
