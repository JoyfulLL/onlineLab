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
    data: {
      token: localStorage.getItem("token") || null,
      scope: localStorage.getItem("scope") || null,
      refreshtoken: localStorage.getItem("refreshtoken") || null,
      expiredAt: parseInt(localStorage.getItem("expiredAt")) || 0,
    },
    userInfoArray: {
      id: "",
      name: "",
      email: "",
      sex: "",
    },
  }),
  actions: {
    setData(data) {
      const { token, scope, refreshtoken, expiredAt } = data;
      this.data.token = token;
      this.data.scope = scope;
      this.data.refreshtoken = refreshtoken;
      this.data.expiredAt = expiredAt;

      localStorage.setItem("token", token);
      localStorage.setItem("scope", scope);
      localStorage.setItem("refreshtoken", refreshtoken);
      localStorage.setItem("expiredAt", expiredAt.toString());
    },
    storeCheckTokenData(userInfo) {
      const { id, name, email, sex } = userInfo;
      this.userInfoArray.id = id;
      this.userInfoArray.name = name;
      this.userInfoArray.email = email;
      this.userInfoArray.sex = sex;
    },
    getData() {
      return this.data;
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
    // 删除token，退出登录
    deleteToken() {
      const router = useRouter();
      this.data.token = null;
      this.data.scope = null;
      this.data.refreshtoken = null;
      this.data.expiredAt = 0;

      localStorage.removeItem("token");
      localStorage.removeItem("scope");
      localStorage.removeItem("refreshtoken");
      localStorage.removeItem("expiredAt");
    },
  },
});
