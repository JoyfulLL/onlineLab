/**
 * @fileName index.js
 * @description 登录API,token校验API
 * @author LJF
 */
import service from "@/utils/axios.js"
import { useAuthStore } from "@/stores/tokenStore"
import router from "@/router/index.js"
// 登录接口
export function login(usernameOrEmail, password) {
  let requestData = {}

  if (usernameOrEmail.includes("@")) {
    requestData = { queryemail: usernameOrEmail, password }
  } else {
    requestData = { name: usernameOrEmail, password }
  }

  return service.post("/login", requestData)
}

// 用于刷新token
export function toRefreshToken(refreshToken) {
  return service.post(
    "/refresh",
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  )
}

// token校验,用于不需要获取数据但是需要校验的页面
export function checkToken() {
  const useAuth = useAuthStore()
  const token = useAuth.data.token
  service
    .get("/isvalid", { Authorization: `Bearer ${token}` })
    .then(res => {
      // Store the user data
      if (res.data.status === 0) {
        useAuth.setCheckTokenData(res.data.data)
      }
    })
    .catch(error => {
      console.error("Error while validating token:", error)
      // 错误码为7，无权限访问，跳转到403
      if (
        error.response &&
        error.response.data &&
        error.response.data.status === 7
      ) {
        ElNotification({
          title: "错误",
          message: "无权限访问",
          type: "error",
          duration: 5000,
        })
        // 跳转至403
        router.push({ path: "/403" })
      }
    })
}
