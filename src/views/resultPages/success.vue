<!--
* @description 成功后跳转的界面
* @fileName success.vue
* @author LJF
* @date 2024/01/25 22:23:45
!-->
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const toLogin = () => {
  router.push('/')
}
</script>

<template>
  <a-result status="success" title="Successfully submit the form">
    <template #extra>
      <a-button key="console" type="primary" @click="toLogin">去登录</a-button>
    </template>
  </a-result>
</template>

<style lang="lcss" scoped></style>
