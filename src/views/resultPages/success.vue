<!-- eslint-disable vue/multi-word-component-names -->
<!--
* @description 成功后跳转的界面
* @fileName success.vue
* @author LJF
* @date 2024/01/25 22:23:45
!-->
<script setup>
import { useRouter } from "vue-router"
const router = useRouter(),
  toLogin = () => {
    router.push("/login")
  }
</script>

<template>
  <a-result status="success" title="表单提交成功">
    <template #extra>
      <a-button key="console" type="primary" @click="toLogin">去登录</a-button>
    </template>
  </a-result>
</template>

<style lang="lcss" scoped></style>
