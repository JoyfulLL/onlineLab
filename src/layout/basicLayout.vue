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

<style scoped>

</style>