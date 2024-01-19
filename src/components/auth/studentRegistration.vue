<script>
/**
 * @file  studentRegistration
 * @author ljf13
 * @description 用于注册学生
 * @date 2024/1/10
 */
import { regStu } from "@/api/userManagement/registerUser.js";
import { ElMessage } from "element-plus";

export default {
  props: {
    userData: {
      type: Object,
    },
    showPassword: {
      type: Boolean,
      default: true,
    },
  },
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
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码" },
          {
            validator: function (rule, value, callback) {
              if (!value) {
                return callback(new Error("请输入密码"));
              }
              if (value.length < 8) {
                return callback(new Error("密码长度必须大于8位"));
              }
              if (!/[0-9]/.test(value)) {
                return callback(new Error("密码必须包含1个数字"));
              }
              if (!/[a-z]/.test(value)) {
                return callback(new Error("密码必须包含1个小写字母"));
              }
              if (!/[A-Z]/.test(value)) {
                return callback(new Error("密码必须包含1个大写字母"));
              }
              callback();
            },
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        realName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
        ],
        userSchoollD: [
          {
            required: true,
            validator: function (rule, value, callback) {
              // 检查是否为空
              if (!value) {
                return callback(new Error("请输入学生学号"));
              }
              // 检查是否全为数字
              var pattern = /^[0-9]+$/;
              if (!pattern.test(value)) {
                return callback(new Error("学生学号必须全为数字"));
              }
              callback(); // 验证通过
            },
            trigger: "blur",
          },
        ],
        schoolCode: [
          { required: true, message: "请输入学校代码", trigger: "blur" },
        ],
        class: [{ required: true, message: "请输入学生班级", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
      },
    };
  },
  //用于侦听 编辑 按钮的数据变化
  watch: {
    userData: {
      immediate: true,
      handler: function (newVal) {
        this.$nextTick;
        this.userForm = newVal;
      },
      deep: true,
    },
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
        this.userForm.sex,
      )
        .then((res) => {
          if (res.data.status == 0) {
            //判断status是否为0
            ElMessage({
              message: "注册成功",
              type: "success",
              duration: 3000,
            });
            //注册成功，跳转至登录界面
            this.$router.push("/");
          }
        })
        .catch((e) => {
          let errorMessage = "登录失败";
          switch (e.response.data.status) {
            case 1:
              errorMessage = "内部错误";
              break;
            case 2:
              errorMessage = "登录令牌错误";
              break;
            case 3:
              errorMessage = "参数错误";
              break;
            case 4:
              errorMessage = "用户已存在";
              break;
            case 5:
              errorMessage = "用户不存在";
              break;
            case 6:
              errorMessage = "密码错误";
              break;
            case 7:
              errorMessage = "无权限访问";
              break;
            case 8:
              errorMessage = "班级错误";
              break;
            case 9:
              errorMessage = "性别错误";
              break;
            case 10:
              errorMessage = "用户名已存在";
              break;
            case 11:
              errorMessage = "邮箱格式错误";
              break;
            case 12:
              errorMessage = "真实姓名错误";
              break;
            case 13:
              errorMessage = "学校信息错误";
              break;
            case 14:
              errorMessage = "密码强度不够";
              break;
            default:
              errorMessage = "未知错误";
          }
          ElMessage({
            message: errorMessage,
            type: "error",
            duration: 3000,
          });
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {},
};
</script>

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
      <el-form-item label="密码" prop="password" v-if="showPassword">
        <el-input v-model="userForm.password" type="password" show-password />
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
        <div class="button-container" style="text-align: center">
          <el-button type="primary" @click="handleSubmit('userForm')"
            >提交
          </el-button>
          <el-button @click="resetForm('userForm')">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less">
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.centered-form {
  width: 350px;
}

.button-container {
  text-align: center;

  .el-button {
    margin: 0 10px;
  }
}
</style>
