import { createApp } from 'vue'
import Content from '@/content/content.vue'
import { insertStylesheet } from './utils'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@content/style/main.css'

// 创建插入到页面的容器
const crxApp = document.createElement('div')
crxApp.id = 'webcopilot_crx_container'
document.documentElement.append(crxApp)

// 创建app
const app = createApp(Content)
app.use(createPinia())
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 为容器创建一个shadowRoot, 以实现样式隔离
const shadowEl: ShadowRoot = crxApp.attachShadow({ mode: 'open' })
app.mount(shadowEl as unknown as Element)

// 将content.css转为style标签插入到shadowRoot
insertStylesheet(shadowEl).then(() => {
    console.log('%cWebCopilot is Running！', 'color:#1e80ff;font-weight:600;font-size:18px;')
})
