<script setup>
import { RouterView } from "vue-router"
import { nextTick, provide, ref } from "vue"

// @此方法为全局提供，在增删查改后刷新DOM
const isRouterAlive = ref(true),
  reload = () => {
    isRouterAlive.value = false
    nextTick(() => {
      isRouterAlive.value = true
    })
  }
provide("reload", reload)
</script>

<template>
  <router-view v-if="isRouterAlive" />
</template>

<style lang="less">
#app {
  height: 100%;
}
</style>
