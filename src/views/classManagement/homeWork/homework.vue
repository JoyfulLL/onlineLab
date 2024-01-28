<!--
* @description 
* @fileName homework.vue
* @author LJF
* @date 2024/01/27 21:46:07
!-->

<script setup>
import HomeWorkList from "@/components/charts/homeWork/homeWorkList.vue"
const assignments = ref([
  {
    id: 1,
    title: "数学作业",
    deadline: "2023-07-19",
    submissionStatus: "未提交",
  },
  {
    id: 2,
    title: "英语作业",
    deadline: "2023-07-22",
    submissionStatus: "已提交",
  },
  {
    id: 3,
    title: "物理作业",
    deadline: "2023-07-25",
    submissionStatus: "未提交",
  },
  {
    id: 4,
    title: "化学作业",
    deadline: "2023-07-27",
    submissionStatus: "已提交",
  },
])
const viewDetails = assignment => {
  // 在这里实现跳转到作业详情界面的逻辑，例如使用路由跳转或者弹窗显示详情等。
  console.log("Viewing details of assignment:", assignment)
}
</script>

<template>
  <div>
    <el-table :data="assignments" style="width: 100%">
      <el-table-column
        prop="title"
        label="作业标题"
        width="180"
        @click="viewDetails(assignment)"
      ></el-table-column>
      <el-table-column
        prop="deadline"
        label="截止日期"
        width="180"
        @click="viewDetails(assignment)"
      ></el-table-column>
      <el-table-column
        prop="submissionStatus"
        label="提交状态"
        @click="viewDetails(assignment)"
      ></el-table-column>
    </el-table>
  </div>
  <HomeWorkList />
</template>

<style lang="lcss" scoped></style>
