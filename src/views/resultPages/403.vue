<!-- eslint-disable vue/multi-word-component-names -->
<!--
* @description
* @fileName 403.vue
* @author LJF
* @date 2024/01/25 22:24:47
!-->
<script setup>
import router from "@/router"
import { useDark } from "@vueuse/core"
const backTo = () => {
    router.go(-1)
  },
  toLogin = () => {
    router.push("/login")
  }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isDark = useDark({
  disableTransition: false,
  valueDark: "dark",
  valueLight: "light",
})
</script>

<template>
  <el-empty description="暂无权限访问，或登陆后重试" :image-size="200">
    <el-button type="primary" class="custom-button" @click="backTo"
      >返回上一级</el-button
    >
    <el-button
      style="color: rgb(58, 127, 6);"
      class="custom-button"
      @click="toLogin"
      >登录</el-button
    >
  </el-empty>
</template>

<style lang="less" scoped>
.button-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.custom-button {
  width: 200px;
}
</style>
