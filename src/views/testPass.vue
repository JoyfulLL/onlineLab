<script setup lang="ts">
import forgetPassword from "@/components/auth/forgetPassword.vue";
import { EditPassword } from "@/api/userManagement/editUserInfo.js";

const editStunPasswd = EditPassword("/authrequired/admin/student/password");
</script>

<template>
  <forget-password :editPasswordApi="editStunPasswd" />
</template>

<style scoped lang="less"></style>
