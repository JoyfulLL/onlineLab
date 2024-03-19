<!-- eslint-disable vue/multi-word-component-names -->
<!--
* @description 成功后跳转的界面
* @fileName success.vue
* @author LJF
* @date 2024/01/25 22:23:45
!-->
<script setup>
import { useRouter } from "vue-router"
import { useDark } from "@vueuse/core"
const router = useRouter(),
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
  <el-empty description="成功" :image-size="200">
    <el-button @click="toLogin">去登录</el-button>
  </el-empty>
</template>

<style lang="less" scoped></style>
