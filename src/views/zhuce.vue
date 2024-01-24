<template>
  <student-registration :user-data="userData" :action="myAction"/>
</template>

<script setup>
import studentRegistration from "@/components/auth/studentRegistration.vue";
const userData = ref([])
const myAction = ref("reg")
</script>

<style scoped lang="less">
</style>
<!--<script>-->
<!--import { nextTick } from 'vue'-->

<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      count: 0-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    async increment() {-->
<!--      this.count++-->

<!--      // DOM 还未更新-->
<!--      console.log("DOM 还未更新")-->
<!--      console.log(document.getElementById('counter').textContent) // 0-->
<!--      console.log(" DOM 此时已经更新1")-->
<!--      await nextTick()-->
<!--      // DOM 此时已经更新-->
<!--      console.log(" DOM 此时已经更新2")-->
<!--      console.log(document.getElementById('counter').textContent) // 1-->
<!--      console.log(" DOM 此时已经更新3")-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<template>-->
<!--  <button id="counter" @click="increment">{{ count }}</button>-->
<!--</template>-->