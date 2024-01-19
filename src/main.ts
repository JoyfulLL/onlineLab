import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "./router";
import "./assets/less/index.less";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import * as echarts from "echarts";
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";
// import api from './utils/axios'
//创建实例
const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
//element-plus
// app.config.globalProperties.$api= api

app.config.globalProperties.$echarts = echarts;
app.use(pinia).use(VueAxios, axios).use(router).use(ElementPlus).mount("#app");
