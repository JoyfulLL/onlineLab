/**
 * @fileName index.js
 * @description 登录API,token校验API
 * @author LJF
 */
import { useAuthStore } from "@/stores/tokenStore.js"
import service from "@/utils/axios.js"
// 登录接口
export function login(username, password) {
  return service.post("/login", { name: username, password: password })
}

// token校验，如果用户的token过期，则将用户导航到登陆界面

// export function checkToken() {
//   return new Promise((resolve, reject) => {
//     const useAuth = useAuthStore()
//     const token = localStorage.getItem("token")
//     service
//       .get("/isvalid", { Authorization: `Bearer ${token}` })
//       .then(res => {
//         if (res.data.status === 0) {
//           //校验成功，存储基本信息
//           useAuth.setCheckTokenData(res.data.data)
//           resolve(true) // 校验成功，返回 true
//         } else {
//           reject(new Error("Token 校验失败")) // 校验失败，返回错误
//         }
//       })
//       .catch(error => {
//         console.error("发生错误，将用户导航回登录界面", error)
//         resolve(false) // 发生错误，返回错误
//       })
//   })
// }
let isAuthenticated = false

export function checkToken(shouldCheck) {
  if (!shouldCheck) {
    return Promise.resolve(true) // 如果不需要校验，直接返回 true
  }
  if (isAuthenticated) {
    return Promise.resolve(true) // 如果已经校验过token，直接返回缓存的结果
  }
  return new Promise((resolve, reject) => {
    const useAuth = useAuthStore()
    const token = useAuth.data.token
    service
      .get("/isvalid", { Authorization: `Bearer ${token}` })
      .then(res => {
        if (res.data.status === 0) {
          useAuth.setCheckTokenData(res.data.data)
          resolve(true) // 校验成功，返回 true
        }
      })
      .catch(error => {
        console.error("发生错误，将用户导航回登录界面", error)
        resolve(false) // 发生错误，返回 false
      })
  })
}
