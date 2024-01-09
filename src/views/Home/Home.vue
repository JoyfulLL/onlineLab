<template>这是HOME组件</template>

<script setup>
import { checkToken } from "@/api/manager";
onMounted(() => {
  checkToken();
});
</script>

<style scoped lang="less"></style>
