<!--
* @description 用于展示作业列表
* @fileName homeWorkList.vue
* @author LJF
* @date 2024/01/27 22:35:28
!-->
<script setup>
import { ref } from "vue"

const activeName = ref("first")
</script>

<template>
  <el-tabs
    v-model="activeName"
    class="demo-tabs"
    @tab-click="handleClick"
    type="border-card"
  >
    <el-tab-pane label="计算机科学与技术" name="first">User</el-tab-pane>
    <el-tab-pane label="Linux操作系统" name="second">Config</el-tab-pane>
    <el-tab-pane
      label="《网络应用开发》（Python Web开发从入门到实践）"
      name="third"
      >Role</el-tab-pane
    >
    <el-tab-pane
      label="《网络应用开发》（Python Web开发从入门到实践）"
      name="235"
      >Role</el-tab-pane
    >
    <el-tab-pane
      label="《网络应用开发》（Python Web开发从入门到实践）"
      name="thi235rd"
      >Role</el-tab-pane
    >
    <el-tab-pane
      label="《网络应用开发》（Python Web开发从入门到实践）"
      name="thi46rd"
      >Role</el-tab-pane
    >
    <el-tab-pane
      label="《网络应用开发》（Python Web开发从入门到实践）"
      name="thir23d"
      >Role</el-tab-pane
    >
    <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="less">
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
