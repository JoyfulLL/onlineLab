import { useAuthStore } from "@/stores/tokenStore"
import { errorMessages } from "@/utils/errorMessagesCode"
import router from "@/router/index.js"
import axios from "axios"
const service = axios.create({
  baseURL: "https://b.guohaolan.com/api/",
  timeout: 120000, // 2 min
  headers: { "Content-Type": "application/json" },
})

//设置全局的请求次数，请求的间隙
service.defaults.retry = 4
service.defaults.retryDelay = 1000
service.interceptors.response.use(undefined, function axiosRetryInterceptor(
  err
) {
  var config = err.config
  // If config does not exist or the retry option is not set, reject
  if (!config || !config.retry) return Promise.reject(err)
  // Set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0
  // Check if we've maxed out the total number of retries
  if (config.__retryCount >= config.retry) {
    // Reject with the error
    return Promise.reject(err)
  }
  // Increase the retry count
  config.__retryCount += 1
  // Create new promise to handle exponential backoff
  var backoff = new Promise(function(resolve) {
    setTimeout(function() {
      resolve()
    }, config.retryDelay || 1)
  })
  // Return the promise in which recalls axios to retry the request
  return backoff.then(function() {
    return axios(config)
  })
})

// 处理错误的函数
function handleRequestError(error) {
  let errorMessage = "失败"
  if (error.response && error.response.data && error.response.data.status) {
    const statusCode = error.response.data.status
    errorMessage = errorMessages[statusCode] || "未知错误"
    if (statusCode === 7) {
      // 状态码为7，没有权限访问此网站
      // 跳转到403，用户自行选择返回上一级或者登录
      router.push({ name: "Forbidden" })
      return // 终止函数继续执行
    }
  }
  ElNotification({
    title: "错误",
    message: errorMessage,
    type: "error",
    duration: 3000,
  })
}

// 添加请求拦截器
service.interceptors.request.use(config => {
  const useAuth = useAuthStore()
  const token = useAuth.data.token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 响应数据，不做处理
    return response
  },
  error => {
    // 响应错误，交给错误函数处理
    handleRequestError(error)
    return Promise.reject(error)
  }
)

export default service
