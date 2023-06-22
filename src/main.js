import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

axios.defaults.baseURL = 'http://127.0.0.1:8080'
const app = createApp(App)
// 挂载一个自定义属性$http
app.config.globalProperties.$axios = axios;
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(ElementPlus)
app.use(router)

app.mount('#app')
