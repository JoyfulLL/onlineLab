<template>
  <div class="form-container">
    <el-form
        :model="userForm"
        label-width="80px"
        ref="form"
        :rules="rules"
        class="centered-form"
        @submit="handleSubmit"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="userForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
            v-model="userForm.password"
            type="password"
            show-password
        />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userForm.email"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="userForm.realName"></el-input>
      </el-form-item>
      <el-form-item label="学生学号" prop="userSchoollD">
        <el-input v-model="userForm.userSchoollD"></el-input>
      </el-form-item>
      <el-form-item label="学校代码" prop="schoolCode">
        <el-input v-model="userForm.schoolCode"></el-input>
      </el-form-item>
      <el-form-item label="学生班级" prop="class">
        <el-input v-model="userForm.class"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="userForm.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <div class="button-container">
          <el-button type="primary" @click="handleSubmit('userForm')"
          >提交
          </el-button
          >
          <el-button @click="resetForm('userForm')">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {regStu} from "@/api/manager.js";
import {ElMessage} from "element-plus";

export default {
  data() {
    return {
      userForm: {
        name: this.name,
        password: this.password,
        email: this.email,
        realName: this.realName,
        userSchoollD: this.userSchoollD,
        schoolCode: this.schoolCode,
        class: this.class,
        sex: this.sex,
      },
      rules: {
        name: [{required: true, message: "请输入用户名", trigger: "blur"}],
        password:
         [
          {required: true, message: "请输入密码"},
          {
            validator: function(rule, value, callback) {
              if (!value) {
                return callback(new Error('请输入密码'));
              }
              if (value.length < 8) {
                return callback(new Error('密码长度必须大于8位'));
              }
              if (!/[0-9]/.test(value)) {
                return callback(new Error('密码必须包含1个数字'));
              }
              if (!/[a-z]/.test(value)) {
                return callback(new Error('密码必须包含1个小写字母'));
              }
              if (!/[A-Z]/.test(value)) {
                return callback(new Error('密码必须包含1个大写字母'));
              }
              callback();
            },
            trigger: "blur"
          }
         ],
        email: [
          {required: true, message: "请输入邮箱", trigger: "blur"},
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        realName: [
          {required: true, message: "请输入真实姓名", trigger: "blur"},
        ],
        userSchoollD: [
          {
            required: true,
            validator: function(rule, value, callback) {
              // 检查是否为空
              if (!value) {
                return callback(new Error('请输入学生学号'));
              }
              // 检查是否全为数字
              var pattern = /^[0-9]+$/;
              if (!pattern.test(value)) {
                return callback(new Error('学生学号必须全为数字'));
              }
              callback(); // 验证通过
            },
            trigger: "blur"
          }
        ],
        schoolCode: [
          {required: true, message: "请输入学校代码", trigger: "blur"},
        ],
        class: [{required: true, message: "请输入学生班级", trigger: "blur"}],
        sex: [{required: true, message: "请选择性别", trigger: "change"}],
      },
    };
  },
  methods: {
    handleSubmit() {
      regStu(
          this.userForm.name,
          this.userForm.password,
          this.userForm.email,
          this.userForm.realName,
          this.userForm.userSchoollD,
          this.userForm.schoolCode,
          this.userForm.class,
          this.userForm.sex
      )
          .then((res) => {
            if (res.data.status == 0) {
              //判断status是否为0
              ElMessage ({
                message: "注册成功",
                type: "success",
                duration: 3000,
              });
              //注册成功，跳转至登录界面
              this.$router.push("/");
            } else {
              ElMessage ({
                title: "Warning",
                message: "错误",
                type: "warning",
                duration: 3000,
              });
            }
          })
          .catch((err) => {
            ElMessage ({
              title: "Error",
              message: "请求失败",
              type: "error",
              duration: 3000,
            });
          });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.centered-form {
  width: 350px;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px; /* 调整按钮与表单项的间距 */
}
</style>
