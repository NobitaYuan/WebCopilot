import { createApp } from 'vue'
import Content from '@/content/content.vue'
import { insertStylesheet } from './utils'
// 创建插入到页面的容器
const eId = 'webcopilot_crx_container'
const crxApp = document.createElement('div')
crxApp.id = eId
document.body.appendChild(crxApp)
const app = createApp(Content)
// 为容器创建一个shadowRoot, 以实现样式隔离
const shadowEl: ShadowRoot = crxApp.attachShadow({ mode: 'open' })
app.mount(shadowEl as unknown as Element)
// 将content.css转为style标签插入到shadowRoot
insertStylesheet(shadowEl)
console.log('content.js is Running!')
