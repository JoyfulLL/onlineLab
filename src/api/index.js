/**
 * @fileName index.js
 * @description 登录API,token校验API
 * @author LJF
 */
import service from "@/utils/axios.js"
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

// token的校验放在全局解析守卫处

// export function checkToken() {
//   const useAuth = useAuthStore()
//   const token = useAuth.data.token
//   service
//     .get("/isvalid", { Authorization: `Bearer ${token}` })
//     .then(res => {
//       if (res.data.status === 0) {
//         useAuth.setCheckTokenData(res.data.data)
//       }
//     })
//     .catch(error => {
//       console.error("发生错误，将用户导航回登录界面", error)
//     })
// }
