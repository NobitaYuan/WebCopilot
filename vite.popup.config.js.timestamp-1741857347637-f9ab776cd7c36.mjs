// vite.popup.config.ts
import {
    defineConfig,
    loadEnv,
} from 'file:///D:/coding/WebCopilot/node_modules/.pnpm/vite@5.4.14_@types+node@20.14.9_sass@1.84.0_terser@5.31.3/node_modules/vite/dist/node/index.js'
import vue from 'file:///D:/coding/WebCopilot/node_modules/.pnpm/@vitejs+plugin-vue@5.2.1_vite@5.4.14_@types+node@20.14.9_sass@1.84.0_terser@5.31.3__vue@3.5.13_typescript@5.7.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs'
import vueDevTools from 'file:///D:/coding/WebCopilot/node_modules/.pnpm/vite-plugin-vue-devtools@1.0.0-rc.5_pug@3.0.3_rollup@4.34.6_vite@5.4.14_@types+node@20.14.9_sass@1.84.0_terser@5.31.3_/node_modules/vite-plugin-vue-devtools/dist/vite.mjs'
import { visualizer } from 'file:///D:/coding/WebCopilot/node_modules/.pnpm/rollup-plugin-visualizer@5.14.0_rollup@4.34.6/node_modules/rollup-plugin-visualizer/dist/plugin/index.js'
import AutoImport from 'file:///D:/coding/WebCopilot/node_modules/.pnpm/unplugin-auto-import@19.0.0_@vueuse+core@10.11.1_vue@3.5.13_typescript@5.7.3___rollup@4.34.6/node_modules/unplugin-auto-import/dist/vite.js'
import Components from 'file:///D:/coding/WebCopilot/node_modules/.pnpm/unplugin-vue-components@28.0.0_@babel+parser@7.26.8_rollup@4.34.6_vue@3.5.13_typescript@5.7.3_/node_modules/unplugin-vue-components/dist/vite.js'
import { ElementPlusResolver } from 'file:///D:/coding/WebCopilot/node_modules/.pnpm/unplugin-vue-components@28.0.0_@babel+parser@7.26.8_rollup@4.34.6_vue@3.5.13_typescript@5.7.3_/node_modules/unplugin-vue-components/dist/resolvers.js'
import { createHtmlPlugin } from 'file:///D:/coding/WebCopilot/node_modules/.pnpm/vite-plugin-html@3.2.2_vite@5.4.14_@types+node@20.14.9_sass@1.84.0_terser@5.31.3_/node_modules/vite-plugin-html/dist/index.mjs'

// globalConfig.js
var CRX_OUTDIR = 'build'

// vite.popup.config.ts
var vite_popup_config_default = defineConfig((env) => {
    const { mode } = env
    const envVar = loadEnv(mode, process.cwd())
    return {
        plugins: [
            vueDevTools(),
            vue(),
            createHtmlPlugin({
                inject: {
                    data: {
                        documentTitle: envVar.VITE_APP_TITLE,
                    },
                },
            }),
            AutoImport({
                imports: ['vue', 'vue-router'],
                dts: 'src/types/auto-imports.d.ts',
                // 生成声明global的.eslintrc-auto-import.json，随后导入eslint防止报错
                eslintrc: {
                    enabled: true,
                },
            }),
            Components({
                resolvers: [ElementPlusResolver()],
                // 暂时不需要生成声明文件，因为ts.config.ts中已经配置全局类型了
                // dts: 'src/types/components.d.ts',
            }),
            visualizer({
                filename: 'boundleView.html',
                //分析图生成的文件名
                open: false,
                //如果存在本地服务端口，将在打包后自动展示
            }),
            // hotReloadExtension({
            //     log: true,
            //     backgroundPath: 'src/background/index.ts', // src/pages/background/index.ts
            // }),
        ],
        resolve: {
            alias: {
                '@': '/src',
                // '@': path.resolve(__dirname, 'src'),
            },
        },
        server: {
            host: true,
        },
        build: {
            /* 
      boolean | "hidden" | "inline"
      配置为 hidden 时，依旧会生成sourcemap文件，但是是隐藏的，需要手动指定文件的路径
      在控制台进入该文件后，右键添加sourcemap的路径即可，
      路径就是该文件的请求路径，然后在后缀加上.map即可
      */
            sourcemap: true,
            outDir: CRX_OUTDIR,
        },
    }
})
export { vite_popup_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5wb3B1cC5jb25maWcudHMiLCAiZ2xvYmFsQ29uZmlnLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcY29kaW5nXFxcXFdlYkNvcGlsb3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGluZ1xcXFxXZWJDb3BpbG90XFxcXHZpdGUucG9wdXAuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jb2RpbmcvV2ViQ29waWxvdC92aXRlLnBvcHVwLmNvbmZpZy50c1wiO2ltcG9ydCB7IENvbmZpZ0VudiwgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXG5pbXBvcnQgeyBjcmVhdGVIdG1sUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4taHRtbCdcbmltcG9ydCB7IENSWF9PVVRESVIgfSBmcm9tICcuL2dsb2JhbENvbmZpZydcbi8vIGltcG9ydCBob3RSZWxvYWRFeHRlbnNpb24gZnJvbSAnaG90LXJlbG9hZC1leHRlbnNpb24tdml0ZSdcblxuLyoqXG4gKiBcdTkxNERcdTdGNkVcdTY1ODdcdTdBRTBcdUZGMUFodHRwczovL21wLndlaXhpbi5xcS5jb20vcy9zUUkxZ3ZNRnU4VzJTcldObTBXdll3XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoZW52OiBDb25maWdFbnYpID0+IHtcbiAgICBjb25zdCB7IG1vZGUgfSA9IGVudlxuICAgIC8vIFx1NzNBRlx1NTg4M1x1NTNEOFx1OTFDRlxuICAgIGNvbnN0IGVudlZhciA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSlcbiAgICByZXR1cm4ge1xuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgICB2dWVEZXZUb29scygpLFxuICAgICAgICAgICAgdnVlKCksXG4gICAgICAgICAgICBjcmVhdGVIdG1sUGx1Z2luKHtcbiAgICAgICAgICAgICAgICBpbmplY3Q6IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnRUaXRsZTogZW52VmFyLlZJVEVfQVBQX1RJVExFLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICAgICAgICAgIGltcG9ydHM6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInXSxcbiAgICAgICAgICAgICAgICBkdHM6ICdzcmMvdHlwZXMvYXV0by1pbXBvcnRzLmQudHMnLFxuICAgICAgICAgICAgICAgIC8vIFx1NzUxRlx1NjIxMFx1NThGMFx1NjYwRWdsb2JhbFx1NzY4NC5lc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uXHVGRjBDXHU5NjhGXHU1NDBFXHU1QkZDXHU1MTY1ZXNsaW50XHU5NjMyXHU2QjYyXHU2MkE1XHU5NTE5XG4gICAgICAgICAgICAgICAgZXNsaW50cmM6IHtcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBDb21wb25lbnRzKHtcbiAgICAgICAgICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxuICAgICAgICAgICAgICAgIC8vIFx1NjY4Mlx1NjVGNlx1NEUwRFx1OTcwMFx1ODk4MVx1NzUxRlx1NjIxMFx1NThGMFx1NjYwRVx1NjU4N1x1NEVGNlx1RkYwQ1x1NTZFMFx1NEUzQXRzLmNvbmZpZy50c1x1NEUyRFx1NURGMlx1N0VDRlx1OTE0RFx1N0Y2RVx1NTE2OFx1NUM0MFx1N0M3Qlx1NTc4Qlx1NEU4NlxuICAgICAgICAgICAgICAgIC8vIGR0czogJ3NyYy90eXBlcy9jb21wb25lbnRzLmQudHMnLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB2aXN1YWxpemVyKHtcbiAgICAgICAgICAgICAgICBmaWxlbmFtZTogJ2JvdW5kbGVWaWV3Lmh0bWwnLCAvL1x1NTIwNlx1Njc5MFx1NTZGRVx1NzUxRlx1NjIxMFx1NzY4NFx1NjU4N1x1NEVGNlx1NTQwRFxuICAgICAgICAgICAgICAgIG9wZW46IGZhbHNlLCAvL1x1NTk4Mlx1Njc5Q1x1NUI1OFx1NTcyOFx1NjcyQ1x1NTczMFx1NjcwRFx1NTJBMVx1N0FFRlx1NTNFM1x1RkYwQ1x1NUMwNlx1NTcyOFx1NjI1M1x1NTMwNVx1NTQwRVx1ODFFQVx1NTJBOFx1NUM1NVx1NzkzQVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAvLyBob3RSZWxvYWRFeHRlbnNpb24oe1xuICAgICAgICAgICAgLy8gICAgIGxvZzogdHJ1ZSxcbiAgICAgICAgICAgIC8vICAgICBiYWNrZ3JvdW5kUGF0aDogJ3NyYy9iYWNrZ3JvdW5kL2luZGV4LnRzJywgLy8gc3JjL3BhZ2VzL2JhY2tncm91bmQvaW5kZXgudHNcbiAgICAgICAgICAgIC8vIH0pLFxuICAgICAgICBdLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgICAgICdAJzogJy9zcmMnLFxuICAgICAgICAgICAgICAgIC8vICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgc2VydmVyOiB7XG4gICAgICAgICAgICBob3N0OiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBidWlsZDoge1xuICAgICAgICAgICAgLyogXG4gICAgICAgICAgICBib29sZWFuIHwgXCJoaWRkZW5cIiB8IFwiaW5saW5lXCJcbiAgICAgICAgICAgIFx1OTE0RFx1N0Y2RVx1NEUzQSBoaWRkZW4gXHU2NUY2XHVGRjBDXHU0RjlEXHU2NUU3XHU0RjFBXHU3NTFGXHU2MjEwc291cmNlbWFwXHU2NTg3XHU0RUY2XHVGRjBDXHU0RjQ2XHU2NjJGXHU2NjJGXHU5NjkwXHU4NUNGXHU3Njg0XHVGRjBDXHU5NzAwXHU4OTgxXHU2MjRCXHU1MkE4XHU2MzA3XHU1QjlBXHU2NTg3XHU0RUY2XHU3Njg0XHU4REVGXHU1Rjg0XG4gICAgICAgICAgICBcdTU3MjhcdTYzQTdcdTUyMzZcdTUzRjBcdThGREJcdTUxNjVcdThCRTVcdTY1ODdcdTRFRjZcdTU0MEVcdUZGMENcdTUzRjNcdTk1MkVcdTZERkJcdTUyQTBzb3VyY2VtYXBcdTc2ODRcdThERUZcdTVGODRcdTUzNzNcdTUzRUZcdUZGMENcbiAgICAgICAgICAgIFx1OERFRlx1NUY4NFx1NUMzMVx1NjYyRlx1OEJFNVx1NjU4N1x1NEVGNlx1NzY4NFx1OEJGN1x1NkM0Mlx1OERFRlx1NUY4NFx1RkYwQ1x1NzEzNlx1NTQwRVx1NTcyOFx1NTQwRVx1N0YwMFx1NTJBMFx1NEUwQS5tYXBcdTUzNzNcdTUzRUZcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgICAgICAgICBvdXREaXI6IENSWF9PVVRESVIsXG4gICAgICAgIH0sXG4gICAgfVxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcY29kaW5nXFxcXFdlYkNvcGlsb3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGluZ1xcXFxXZWJDb3BpbG90XFxcXGdsb2JhbENvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY29kaW5nL1dlYkNvcGlsb3QvZ2xvYmFsQ29uZmlnLmpzXCI7Ly8gQ2hyb21lIEV4dGVuc2lvbiBcdTY3MDBcdTdFQzhidWlsZFx1NzZFRVx1NUY1NVxuZXhwb3J0IGNvbnN0IENSWF9PVVRESVIgPSAnYnVpbGQnXG4vLyBcdTRFMzRcdTY1RjZidWlsZCBjb250ZW50IHNjcmlwdFx1NzY4NFx1NzZFRVx1NUY1NVxuZXhwb3J0IGNvbnN0IENSWF9DT05URU5UX09VVERJUiA9ICdfYnVpbGRfY29udGVudCdcbi8vIFx1NEUzNFx1NjVGNmJ1aWxkIGJhY2tncm91bmQgc2NyaXB0XHU3Njg0XHU3NkVFXHU1RjU1XG5leHBvcnQgY29uc3QgQ1JYX0JBQ0tHUk9VTkRfT1VURElSID0gJ19idWlsZF9iYWNrZ3JvdW5kJ1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnUSxTQUFvQixjQUFjLGVBQWU7QUFDalQsT0FBTyxTQUFTO0FBQ2hCLE9BQU8saUJBQWlCO0FBQ3hCLFNBQVMsa0JBQWtCO0FBQzNCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsMkJBQTJCO0FBQ3BDLFNBQVMsd0JBQXdCOzs7QUNOMUIsSUFBTSxhQUFhOzs7QURhMUIsSUFBTyw0QkFBUSxhQUFhLENBQUMsUUFBbUI7QUFDNUMsUUFBTSxFQUFFLEtBQUssSUFBSTtBQUVqQixRQUFNLFNBQVMsUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQzFDLFNBQU87QUFBQSxJQUNILFNBQVM7QUFBQSxNQUNMLFlBQVk7QUFBQSxNQUNaLElBQUk7QUFBQSxNQUNKLGlCQUFpQjtBQUFBLFFBQ2IsUUFBUTtBQUFBLFVBQ0osTUFBTTtBQUFBLFlBQ0YsZUFBZSxPQUFPO0FBQUEsVUFDMUI7QUFBQSxRQUNKO0FBQUEsTUFDSixDQUFDO0FBQUEsTUFDRCxXQUFXO0FBQUEsUUFDUCxTQUFTLENBQUMsT0FBTyxZQUFZO0FBQUEsUUFDN0IsS0FBSztBQUFBO0FBQUEsUUFFTCxVQUFVO0FBQUEsVUFDTixTQUFTO0FBQUEsUUFDYjtBQUFBLE1BQ0osQ0FBQztBQUFBLE1BQ0QsV0FBVztBQUFBLFFBQ1AsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUE7QUFBQTtBQUFBLE1BR3JDLENBQUM7QUFBQSxNQUNELFdBQVc7QUFBQSxRQUNQLFVBQVU7QUFBQTtBQUFBLFFBQ1YsTUFBTTtBQUFBO0FBQUEsTUFDVixDQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUtMO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDTCxPQUFPO0FBQUEsUUFDSCxLQUFLO0FBQUE7QUFBQSxNQUVUO0FBQUEsSUFDSjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ0osTUFBTTtBQUFBLElBQ1Y7QUFBQSxJQUNBLE9BQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQU9ILFdBQVc7QUFBQSxNQUNYLFFBQVE7QUFBQSxJQUNaO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
