import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";
import router from "./router";
import './assets/less/index.less'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import "element-plus/dist/index.css";

//创建实例
const app = createApp(App);

for (const [key,component] of Object.entries(ElementPlusIconsVue)){
    app.component(key,component)
}
//element-plus
app
  .use(VueAxios, axios)
  .use(router)
  .use(createPinia())
  .mount("#app");
