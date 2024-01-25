import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import Unicon from 'vue-unicons'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import * as echarts from 'echarts'
import ElementPlus from 'element-plus'
import './assets/less/index.less'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import Pagination from '@/components/Pagination.vue'

import {
  uniUser,
  uniEnvelope,
  uniMars,
  uniVenus,
  uniAdjustCircle,
  uniUserSquare,
  uniMedal,
  uniSearch,
  uniChatInfo,
  uniUserCircle,
} from 'vue-unicons/dist/icons'

Unicon.add([
  uniUser,
  uniEnvelope,
  uniMars,
  uniVenus,
  uniAdjustCircle,
  uniUserSquare,
  uniMedal,
  uniSearch,
  uniChatInfo,
  uniUserCircle,
])

//创建实例
const app = createApp(App).use(Unicon)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
//element-plus
// app.config.globalProperties.$api= api
app.config.globalProperties.$echarts = echarts
app.use(pinia).use(VueAxios, axios).use(router).use(ElementPlus).component('Pagination', Pagination).mount('#app')
