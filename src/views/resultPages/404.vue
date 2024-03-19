<!-- eslint-disable vue/multi-word-component-names -->
<!--
* @description
* @fileName 404.vue
* @author LJF
* @date 2024/01/25 22:25:11
!-->
<script setup>
import { useRouter } from "vue-router"
import { useDark } from "@vueuse/core"
const router = useRouter(),
  goBackToUserInfo = () => {
    router.push("/userInfo")
  },
  backTo = () => {
    router.go(-1)
  }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isDark = useDark({
  disableTransition: false,
  valueDark: "dark",
  valueLight: "light",
})
</script>

<template>
  <el-empty description="页面不存在" :image-size="200">
    <el-button class="custom-button" @click="backTo" type="info"
      >返回上一级</el-button
    >
    <el-button class="custom-button" @click="goBackToUserInfo" type="primary"
      >返回个人中心</el-button
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
