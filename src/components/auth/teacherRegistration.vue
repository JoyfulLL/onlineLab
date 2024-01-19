<script setup lang="ts">
/**
 * @file  teacherRegistration
 * @author ljf13
 * @description 用于管理员注册教师
 * @date 2024/1/18
 */
import { regTeacher } from "@/api/userManagement/registerUser.js";

interface Teacher {
  name: string;
  email: string;
  realName: string;
  sex: string;
  password: string;
}

const teacher = ref<Teacher>({
  name: "",
  email: "",
  realName: "",
  sex: "male",
  password: "",
});

const rules = {
  name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
  realName: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
  sex: [{ required: true, message: "请选择性别", trigger: "change" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

const teacherForm = ref<any>(null);

const submitForm = () => {
  teacherForm.value.validate((valid: boolean) => {
    if (valid) {
      // 提交表单的逻辑
      console.log(teacher.value.name);
      regTeacher(
        teacher.value.name,
        teacher.value.email,
        teacher.value.realName,
        teacher.value.password,
        teacher.value.sex,
      ).then((res) => {
        console.log(res);
      });
    } else {
      return false;
    }
  });
};
</script>

<template>
  <el-form
    :model="teacher"
    :rules="rules"
    ref="teacherForm"
    label-width="100px"
    @submit.native.prevent="submitForm"
  >
    <el-form-item label="用户名" prop="name">
      <el-input v-model="teacher.name"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="teacher.email"></el-input>
    </el-form-item>
    <el-form-item label="真实姓名" prop="realName">
      <el-input v-model="teacher.realName"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        v-model="teacher.password"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-select v-model="teacher.sex">
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="less"></style>
