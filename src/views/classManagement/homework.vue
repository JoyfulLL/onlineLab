<script setup>
import { checkToken } from "@/api";
onMounted(() => {
  checkToken();
});
</script>

<template>作业</template>

<style scoped lang="less"></style>
