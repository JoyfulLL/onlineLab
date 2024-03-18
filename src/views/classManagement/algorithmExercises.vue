<script setup>
import { checkToken } from "@/api/index.js"
onMounted(() => {
  checkToken()
})
</script>

<template>
  <el-empty description="待开发" />
</template>

<style scoped lang="less"></style>
