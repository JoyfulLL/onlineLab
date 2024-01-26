/**
 * @file  tokenStore
 * @author ljf13
 * @description 此文件用于登录成功后存储token等相关认证信息
 * @date 2024/1/12
 */
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
export const useAuthStore = defineStore('auth', {
    state: () => ({
        data: {
            token: localStorage.getItem('token') || null,
            scope: localStorage.getItem('scope') || null,
            refreshtoken: localStorage.getItem('refreshtoken') || null,
            expiredAt: parseInt(localStorage.getItem('expiredAt')) || 0,
        },
        userInfoArray: [],
    }),
    actions: {
        setData(data) {
            // this.data = data;
            const { token, scope, refreshtoken, expiredAt } = data
            this.data.token = token
            this.data.scope = scope
            this.data.refreshtoken = refreshtoken
            this.data.expiredAt = expiredAt

            localStorage.setItem('token', token)
            localStorage.setItem('scope', scope)
            localStorage.setItem('refreshtoken', refreshtoken)
            localStorage.setItem('expiredAt', expiredAt.toString())
        },
        setCheckTokenData(userInfo) {
            //校验成功后，可以获取到用户的基础信息
            this.userInfoArray = userInfo
            //console.log(this.userInfoArray)
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
        getScope() {
            return String(this.data.scope)
        },
        getRefreshToken() {
            return this.data.refreshtoken
        },
        getExpiredAt() {
            return this.data.expiredAt
        },
        // 删除auth，退出登录
        deleteToken() {
            localStorage.removeItem('auth')
        },
    },
    persist: {
        enable: true,
    },
})
