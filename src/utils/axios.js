import {useAuthStore} from "@/stores/tokenStore"
import {errorMessages} from "@/utils/errorMessagesCode"
import axios from "axios"
import {ElNotification} from "element-plus"
const service = axios.create({
  baseURL: "https://b.guohaolan.com/api/",
  timeout: 10000,
  headers: {"Content-Type": "application/json"},
})

// 处理错误的函数
function handleRequestError(error) {
  let errorMessage = "失败"
  if (error.response && error.response.data && error.response.data.status) {
    const statusCode = error.response.data.status
    errorMessage = errorMessages[statusCode] || "未知错误"
    // if (statusCode === 7) {
    //   // 状态码为7，没有权限访问此网站，返回上一级
    //   // 跳转到上一页
    //   router.go(-1)
    //   return // 终止函数继续执行
    // }
  }

  ElNotification({
    title: "错误",
    message: errorMessage,
    type: "error",
    duration: 3000,
  })
}

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    const useAuth = useAuthStore(),
     token = useAuth.data.token
    if (token) config.headers.Authorization = `Bearer ${token}`
    //   checkToken();
    return config
  },
  error => {
    // 对请求错误做些什么
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据做些事
    return response
  },
  error => {
    // 对响应错误做些事
    handleRequestError(error)
    return Promise.reject(error)
  }
)

export default service
