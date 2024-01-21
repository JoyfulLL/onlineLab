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
      // const { token, scope, refreshtoken, expiredAt } = data;
      // this.data.token = token;
      // this.data.scope = scope;
      // this.data.refreshtoken = refreshtoken;
      // this.data.expiredAt = expiredAt;
      this.data = data;
      // localStorage.setItem("token", token);
      // localStorage.setItem("scope", scope);
      // localStorage.setItem("refreshtoken", refreshtoken);
      // localStorage.setItem("expiredAt", expiredAt.toString());
    },
    setCheckTokenData(userInfo) {
      // const { id, name, email, sex } = userInfo;
      // this.userInfoArray.id = id;
      // this.userInfoArray.name = name;
      // this.userInfoArray.email = email;
      // this.userInfoArray.sex = sex;
      this.userInfoArray = userInfo;
      // console.log(this.userInfoArray);
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
