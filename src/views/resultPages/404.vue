<!--
* @description 
* @fileName 404.vue
* @author LJF
* @date 2024/01/25 22:25:11
!-->
<script setup>
import { useRouter } from "vue-router"
const router = useRouter()
const goBackToUserInfo = () => {
  router.push("/userInfo")
}
</script>

<template>
  <a-result
    status="404"
    title="404"
    sub-title="Sorry, the page you visited does not exist."
  >
    <template #extra>
      <a-button type="primary" @click="goBackToUserInfo">返回个人中心</a-button>
    </template>
  </a-result>
</template>

<style lang="lcss" scoped></style>
