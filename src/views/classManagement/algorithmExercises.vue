<script setup>
import { checkToken } from "@/api/index.js"
onMounted(() => {
  checkToken()
})
</script>

<template>算法练习</template>

<style scoped lang="less"></style>
