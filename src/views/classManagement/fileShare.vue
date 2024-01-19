<script setup>
import { checkToken } from "@/api";
onMounted(() => {
  checkToken();
});
</script>

<template>文件共享</template>

<style scoped lang="less"></style>
