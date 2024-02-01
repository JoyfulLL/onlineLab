<!--
* @description 登陆后的首页 用于展示课程列表
               路由为 /userInfo
* @fileName homePageLayout.vue
* @author LJF
* @date 2024/02/01 12:07:40
!-->
<script setup>
import CommonHeader from "./commonHeader.vue"
</script>

<template>
  <el-container>
    <CommonHeader :is-home-pgae="true" class="userInfoHeader" />
    <el-main class="right-main">
      <router-view />
    </el-main>
  </el-container>
</template>

<style lang="less" scoped>
.userInfoHeader {
  position: absolute;
  height: 60px;
}
.el-container {
  height: 100%;
  align-items: flex-start;
  flex-wrap: nowrap;
}

.right-main {
  top: 60px;
  position: absolute;
  right: 0;
  left: 0;
  height: calc(100% - 60px);
}
</style>
