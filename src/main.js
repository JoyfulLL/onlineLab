import Pagination from "@/components/Pagination.vue"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import axios from "axios"
import * as echarts from "echarts"
import ElementPlus from "element-plus"
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/assets/dark/css-vars.css'
import "element-plus/dist/index.css"
import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import { createApp } from "vue"
import VueAxios from "vue-axios"
import Unicon from "vue-unicons"
import App from "./App.vue"
import "./assets/less/index.less"
import router from "./router"

import {
  uniAdjustCircle,
  uniBookOpen,
  uniBookReader,
  uniChatInfo,
  uniEnvelope,
  uniInfoCircle,
  uniMars,
  uniMedal,
  uniSearch,
  uniSwatchbook,
  uniUser,
  uniUserCircle,
  uniUserSquare,
  uniVenus,
} from "vue-unicons/dist/icons"

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
  uniInfoCircle,
  uniBookOpen,
  uniBookReader,
  uniSwatchbook,
])

//创建实例
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
//element-plus
// app.config.globalProperties.$api= api
app.config.globalProperties.$echarts = echarts
app
  .use(pinia)
  .use(VueAxios, axios)
  .use(router)
  .use(ElementPlus)
  .use(Unicon)
  .component("Pagination", Pagination)
  .mount("#app")
