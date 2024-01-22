<script setup lang="ts">
import forgetPassword from "@/components/auth/forgetPassword.vue";
import { EditPassword } from "@/api/userManagement/editUserInfo.js";
import classesList from "@/components/charts/classesListTable.vue"
const editStunPasswd = EditPassword("/authrequired/admin/student/password");
</script>

<template>
  <forget-password :editPasswordApi="editStunPasswd" />
  <classes-list/>
</template>

<style scoped lang="less"></style>
