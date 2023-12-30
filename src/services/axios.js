import axios from "axios";


const service = axios.create({
  baseURL: "http://8.219.238.232/api/",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
// service.interceptors.response.use(
//   (response) => response,
//   (error) => {}
// );
export default service;
