<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!--
* @description 管理员的班级管理页面
* @fileName adminManageClasses.vue
* @author LJF
* @date 2024/02/04 15:34:17
!-->
<script setup>
import {basicClassesStore} from "@/stores"
import {
  adminAddStudentToClass,
  adminAddTeacherToClass,
  adminCreatANewClass,
  adminDeleteClass,
  adminModifiesStuClass,
  adminRemoveTeacherFromClass,
  adminShowClassStudents,
  adminShowTeacherClassStudents,
  adminShowTeacherOfClass,
} from "@/api/classManagement/admin/index"
const useAllClassInfoList = basicClassesStore()
onMounted(() => {})
const newClassname = ref(""),
 newClass = () => {
  adminCreatANewClass(newClassname)
},

 fetchClassStudents = () => {
  adminShowClassStudents("21网络工程B").then(res => {
    console.log(res.data.data)
  })
},
 fetchTeacherClasses = () => {
  adminShowTeacherOfClass("5433951652941831").then(res => {
    console.log(res.data.data)
  })
},
 fetchTeacherStudents = () => {
  adminShowTeacherClassStudents(5433951652941831).then(res => {
    console.log(res.data.data)
  })
}
</script>

<template>
  <el-button @click="newClass" disabled="true">
    创建新班级
  </el-button>
  <el-button @click="fetchClassStudents">
    展示特定班级下的学生
  </el-button>
  <el-button @click="fetchTeacherClasses">
    展示指定老师名下的所有班级
  </el-button>
  <el-button @click="fetchTeacherStudents">
    展示指定老师名下的所有学生
  </el-button>
</template>

<style lang="less" scoped></style>
