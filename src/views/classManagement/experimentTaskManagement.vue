<script setup>
import { checkToken } from "@/api/index.js"
onMounted(() => {
  checkToken()
})
</script>

<template>实验任务</template>

<style scoped lang="less"></style>
