<!-- eslint-disable vue/multi-word-component-names -->
<!--
* @description
* @fileName 500.vue
* @author LJF
* @date 2024/01/25 22:25:32
!-->
<script setup>
import { useDark } from "@vueuse/core"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isDark = useDark({
  disableTransition: false,
  valueDark: "dark",
  valueLight: "light",
})
</script>

<template>
  <el-empty description="服务器错误" :image-size="200">
    <el-button type="primary">返回个人主页</el-button>
  </el-empty>
</template>

<style lang="less" scoped></style>
