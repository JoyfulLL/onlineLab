import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

//创建实例
const app = createApp(App);

//element-plus
app
  .use(VueAxios, axios)
  .use(ElementPlus)
  .use(router)
  .use(createPinia())
  .mount("#app");
