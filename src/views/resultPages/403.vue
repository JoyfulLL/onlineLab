<!--
* @description 
* @fileName 403.vue
* @author LJF
* @date 2024/01/25 22:24:47
!-->
<script setup>
import router from "@/router"

const backTo = () => {
  router.go(-1)
}

const toLogin = () => {
  router.push("/login")
}
</script>

<template>
  <a-result
    status="403"
    title="403"
    sub-title="抱歉，您暂时无权限访问，或登陆后重试"
  >
    <template #extra>
      <div class="button-container">
        <a-button type="primary" @click="backTo" class="custom-button"
          >返回上一级</a-button
        >
        <a-button
          @click="toLogin"
          style="color: rgb(58, 127, 6);"
          class="custom-button"
          >登录</a-button
        >
      </div>
      <div class="footer">
        <el-link
          href="http://beian.miit.gov.cn/"
          target="_blank"
          type="default"
          class="footerLink"
        >
          粤ICP备2024184954号-1
        </el-link>
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
