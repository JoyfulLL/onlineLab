<template>
  <div class="common-layout">
    <el-container>
      <common-aside/>
      <el-container>
        <common-header/>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import CommonHeader from "@/layout/commonHeader.vue";
import CommonAside from "@/layout/commonAside.vue";
import ContentContainer from "@/layout/contentContainer.vue";


</script>

<style scoped lang="less">
.r-container{
  flex-wrap: wrap;
}

.el-container {
  flex-wrap: wrap;
  align-items: flex-start;
}

.common-layout {
  height: 100%;

  & > .el-container {
    height: 100%;

    & > .el-aside {
      height: 100%;
      background: #545c64;
    }
  }
}


</style>