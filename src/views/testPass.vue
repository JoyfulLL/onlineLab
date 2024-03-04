<script setup lang="ts">
const count = ref<string | number>("300")
</script>

<template>
  <div>
    {{ count }}
  </div>
</template>

<style scoped lang="less">
.course-container {
  margin: 0 px;
}
.box-card {
  width: auto;
  margin: 10px;
}
</style>
