<!-- eslint-disable vue/multi-word-component-names -->
<!--
* @description
* @fileName 500.vue
* @author LJF
* @date 2024/01/25 22:25:32
!-->
<script setup>
import { useDark } from "@vueuse/core"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isDark = useDark({
  disableTransition: false,
  valueDark: "dark",
  valueLight: "light",
})
</script>

<template>
  <a-result status="500" title="500" sub-title="Sorry, the server is wrong.">
    <template #extra>
      <a-button type="primary">Back Home</a-button>
    </template>
  </a-result>
</template>

<style lang="lcss" scoped></style>
