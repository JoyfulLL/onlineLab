<script setup lang="ts">
import forgetPassword from "@/components/auth/forgetPassword.vue";
import { EditPassword } from "@/api/userManagement/editUserInfo.js";
import classesList from "@/components/charts/classesListTable.vue"
const editStunPasswd = EditPassword("/authrequired/admin/student/password");
import addStudentsFromClass from "@/components/addStudentsFromClass.vue"
</script>

<template>
  <add-students-from-class/>
</template>

<style scoped lang="less"></style>
