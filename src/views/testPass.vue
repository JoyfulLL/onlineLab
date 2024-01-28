<script setup>
import axios from "axios"
import { onMounted, ref } from "vue"
onMounted(() => {
  getCourselist()
})
const courselist = ref([])

const getCourselist = async () => {
  const response = await axios.get(
    "https://www.fastmock.site/mock/2a5ecbdc32432d0c06d1e08c6e250731/api/courseList"
  )
  courselist.value = response.data.data.courselist
}
</script>

<template>
  <el-row class="course-container">
    <el-col :span="8" v-for="course in courselist" :key="course.id">
      <el-card class="box-card">
        <p>班级ID: {{ course.id }}</p>
        <p>班级名称: {{ course.name }}</p>
        <p>教师姓名: {{ course.create_time }}</p>
      </el-card>
    </el-col>
  </el-row>
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
