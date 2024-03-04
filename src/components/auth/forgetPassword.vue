<script setup lang="ts">
/**
 * @file  forgetPassword
 * @author ljf13
 * @date 2024/1/17
 * @description
 * @此组件可用于管理员修改指定用户的密码
 * @如果传入的API地址为教师以及学生，那就只能修改自己的密码
 * @!!必须登录获取了TOKEN才能够使用这个组件
 * @学生修改自身密码 待开发！！！
 * @教师修改自身密码的API地址 /authrequired/teacher/password
 * @管理员修改教师密码 /authrequired/admin/teacher/password
 * @管理员修改学生密码的API地址 /authrequired/admin/student/password
 *
 * @组件复用参考
 * import forgetPassword from "@/components/auth/forgetPassword.vue";
 * import { adminEditPassword } from "@/api/manager";
 *
 * const editStunPasswd = adminEditPassword(
 *   "/authrequired/admin/student/password",
 * );
 *
 * <template>
 *   <forget-password :editPasswordApi="editStunPasswd" />
 * </template>
 */
import { ref, defineProps } from "vue"

interface UserFormData {
  id: string
  name: string
  password: string
}

const props = defineProps({
  editPasswordApi: {
    type: Function,
    required: true,
  },
})
const formData = ref<UserFormData>({
  id: "",
  name: "",
  password: "",
})

const submitForm = () => {
  props.editPasswordApi(
    formData.value.id,
    formData.value.name,
    formData.value.password
  )
}
</script>

<template>
  <el-form :model="formData" label-width="80px" @click="submitForm">
    <el-form-item label="ID">
      <el-input v-model="formData.id"></el-input>
    </el-form-item>
    <el-form-item label="Name" prop="name">
      <el-input v-model="formData.name" required></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input v-model="formData.password" type="password" required></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">Submit</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="less"></style>
