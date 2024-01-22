/**
 * @file  tokenStore
 * @author ljf13
 * @description 此文件用于登录成功后存储token等相关认证信息
 * @date 2024/1/12
 */
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    data: [],
    userInfoArray: [],
  }),
  actions: {
    setData(data) {
      this.data = data;
    },
    setCheckTokenData(userInfo) {
      //校验成功后，可以获取到用户的基础信息
      this.userInfoArray = userInfo;
    },
    getData() {
      return this.data;
    },
    getCheckTokenData() {
      return this.userInfoArray;
    },
    getToken() {
      return this.data.token;
    },
    getScope() {
      return String(this.data.scope);
    },
    getRefreshToken() {
      return this.data.refreshtoken;
    },
    getExpiredAt() {
      return this.data.expiredAt;
    },
    // 删除auth，退出登录
    deleteToken() {
      localStorage.removeItem("auth");
    },
  },
  persist: {
    enable: true,
  },
});
