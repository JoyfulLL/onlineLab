import axios from "axios";
import { checkToken } from "@/api";
import { useAuthStore } from "@/stores/tokenStore";

const service = axios.create({
  baseURL: "http://8.219.238.232/api/",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    const useAuth = useAuthStore();
    const token = useAuth.data.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    //   checkToken();
    return config;
  },
  (error) => {
    // 对请求错误做些什么
  },
);

// 响应拦截器
// service.interceptors.response.use(
//   (response) => response,
//   (error) => {}
// );
export default service;
