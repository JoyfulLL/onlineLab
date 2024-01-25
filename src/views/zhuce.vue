<template>
  <student-registration :user-data="userData" :action="myAction" />
</template>

<script setup>
import studentRegistration from '@/components/auth/studentRegistration.vue'
const userData = ref([])
const myAction = ref('reg')
</script>

<style scoped lang="less"></style>
