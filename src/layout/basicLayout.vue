<!--
* @description 基础的页面布局
* @fileName basicLayout.vue
* @author LJF
!-->

<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <common-aside />
      <el-container>
        <common-header />
        <el-main class="right-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import CommonAside from "@/layout/commonAside.vue"
import CommonHeader from "@/layout/commonHeader.vue"
</script>

<style scoped lang="less">
.r-container {
  flex-wrap: wrap;
}
.el-container {
  flex-wrap: wrap;
  align-items: flex-start;
}

.common-layout {
  height: 100vh;
  .lay-container {
    flex-wrap: nowrap;
    .right-main {
      overflow-y: auto;
      height: calc(100vh - 60px); /* 视口高度减去 common-header 的高度 */
    }
  }

  & > .el-container {
    height: 100%;
    & > .el-aside {
      height: 100%;
      //background-color: #ffffff;
    }
  }
}
html:not(.dark) .right-main {
  background-color: #f6f6f6; /* 设置亮色模式下 el-main 的背景色为灰色 */
}
</style>
