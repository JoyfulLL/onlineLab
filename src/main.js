//import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import axios from "axios"
import "element-plus/theme-chalk/dark/css-vars.css"
import "@/assets/dark/css-vars.less"
//引入Elmessage和Elloading的css样式文件
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'
import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import { createApp } from "vue"
import VueAxios from "vue-axios"
import App from "./App.vue"
import "./assets/less/index.less"
import router from "./router"


// 创建实例
const app = createApp(App),
  pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }

app
  .use(pinia)
  .use(VueAxios, axios)
  .use(router)
  .mount("#app")
