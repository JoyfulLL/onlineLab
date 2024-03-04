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
  <a-result status="success" title="表单提交成功">
    <template #extra>
      <a-button key="console" type="primary" @click="toLogin">去登录</a-button>
    </template>
  </a-result>
</template>

<style lang="lcss" scoped></style>
