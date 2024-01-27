<!--
* @description 用于测试模拟数据
* @fileName testMock.vue
* @author LJF
* @date 2024/01/26 20:57:26
!-->
<script setup>
import axios from "axios";

let _url =
  "https://www.fastmock.site/mock/2a5ecbdc32432d0c06d1e08c6e250731/api/authrequired/teacher/class/students";

const gteData = () => {
  axios
    .get(_url)
    .then((res) => {
      const { data } = res.data;
      const { classes } = data;
      const students = classes.flatMap((cls) => cls.students);
      students.value = students;
    })
    .catch((error) => {
      // 处理请求错误
      console.error("Error fetching data:", error);
    });
};
</script>

<template>
  <ElButton @click="gteData()">获取数据</ElButton>
</template>

<style lang="lcss" scoped></style>
