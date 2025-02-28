import { createApp } from 'vue'
import '@/common/style/main.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import App from './popup.vue'
import router from './router'
import { createPinia } from 'pinia'
// import { i18n } from '@/i18n'
const app = createApp(App)
app.use(router)
app.use(createPinia())
// app.use(i18n)
app.mount('#app')
