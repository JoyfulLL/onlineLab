<!-- eslint-disable vue/multi-word-component-names -->
<!--
* @description
* @fileName 404.vue
* @author LJF
* @date 2024/01/25 22:25:11
!-->
<script setup>
import { useRouter } from "vue-router"
const router = useRouter(),
  goBackToUserInfo = () => {
    router.push("/userInfo")
  },
  backTo = () => {
    router.go(-1)
  }
</script>

<template>
  <a-result status="404" title="404" sub-title="此页面貌似不存在喔~">
    <template #extra>
      <div class="button-container">
        <a-button class="custom-button" @click="backTo">返回上一级</a-button>
        <a-button type="primary" class="custom-button" @click="goBackToUserInfo"
          >返回个人中心</a-button
        >
      </div>
    </template>
  </a-result>
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
