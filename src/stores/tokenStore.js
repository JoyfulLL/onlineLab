/**
 * @file  tokenStore
 * @author ljf13
 * @description 此文件用于登录成功后存储token等相关认证信息
 * @date 2024/1/12
 */
import { defineStore } from "pinia"
import { checkToken } from "@/api/index.js"
const ROLES = {
  admin: '1386988588595',
  teacher: '2525863625116',
  default: '3728008988229'
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    data: {
      token: localStorage.getItem("token") || null,
      scope: localStorage.getItem("scope") || null,
      refreshtoken: localStorage.getItem("refreshtoken") || null,
      expiredAt: parseInt(localStorage.getItem("expiredAt")) || 0,
    },
    userInfoArray: [],
  }),
  actions: {
    setData(data) {
      // this.data = data;
      const { token, scope, refreshtoken, expiredAt } = data
      this.data.token = token
      this.data.scope = ROLES[scope] || ROLES.default;
      this.data.refreshtoken = refreshtoken
      this.data.expiredAt = expiredAt

      // localStorage.setItem("token", token)
      localStorage.setItem("scope", scope)
      // localStorage.setItem("refreshtoken", refreshtoken)
      // localStorage.setItem("expiredAt", expiredAt.toString())
    },
    setCheckTokenData(userInfo) {
      // 校验成功后，可以获取到用户的基础信息
      // api/index.js
      this.userInfoArray = userInfo
      // console.log(this.userInfoArray)
    },
    getData() {
      return this.data
    },
    getCheckTokenData() {
      return this.userInfoArray
    },
    getToken() {
      return this.data.token
    },
    /**
     * 
     * @returns ROLES=>admin,teacher,student
     */
    getScope() {
      // Get 'auth' data from localStorage
      const authDataString = localStorage.getItem('auth')
      // Parse the string into a Javascript Object
      const authData = JSON.parse(authDataString)
      // Get the scope from authData
      const role = authData.data.scope
      // Switch the role and return the String for any funtion
      switch (role) {
        case ROLES.admin:
          return 'admin'
        case ROLES.teacher:
          return 'teacher'
        default:
          return 'student'
      }
    },
    getRefreshToken() {
      return this.data.refreshtoken
    },
    getExpiredAt() {
      return this.data.expiredAt
    },
    // 删除auth，退出登录
    deleteToken() {
      localStorage.removeItem("auth")
    },
  },
  persist: {
    enable: true,
  },
})
