<!--
* @description 
* @fileName 404.vue
* @author LJF
* @date 2024/01/25 22:25:11
!-->
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goBackToHome = () => {
  router.push('/Home')
}
</script>

<template>
  <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <a-button type="primary" @click="goBackToHome">Back Home</a-button>
    </template>
  </a-result>
</template>

<style lang="lcss" scoped></style>
