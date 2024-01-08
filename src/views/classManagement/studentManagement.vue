<script setup>
import {checkToken} from "@/api/manager";
onMounted(() => {
  checkToken()
})
</script>

<template>
学生管理
</template>

<style scoped lang="less">

</style>