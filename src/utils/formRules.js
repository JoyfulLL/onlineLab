/**
 * @file  formRules.js
 * @author ljf13
 * @description 表单输入的规则
 * @date 2024/1/22
 */

// rules.js

const userForm = reactive({
  name: "",
  password: "",
  confirmPassword: "",
  email: "",
  realName: "",
  userSchoollD: "",
  schoolCode: "",
  class: "",
  sex: "",
})

export const rules = {
  name: [{required: true, message: "请输入用户名", trigger: "blur"}],
  password: [
    {required: true, message: "请输入密码"},
    {
      validator: (rule, value, callback) => {
        if (!value) {
          return callback(new Error("请输入密码"))
        }
        if (value.length < 8) {
          return callback(new Error("密码长度必须大于8位"))
        }
        if (!/[0-9]/.test(value)) {
          return callback(new Error("密码必须包含1个数字"))
        }
        if (!/[a-z]/.test(value)) {
          return callback(new Error("密码必须包含1个小写字母"))
        }
        if (!/[A-Z]/.test(value)) {
          return callback(new Error("密码必须包含1个大写字母"))
        }
        callback()
      },
      trigger: "blur",
    },
  ],
  email: [
    {required: true, message: "请输入邮箱", trigger: "blur"},
    {
      type: "email",
      message: "请输入正确的邮箱地址",
      trigger: ["blur", "change"],
    },
  ],
  realName: [{required: true, message: "请输入真实姓名", trigger: "blur"}],
  userSchoollD: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (!value) {
          return callback(new Error("请输入学生学号"))
        }
        const pattern = /^[0-9]+$/
        if (!pattern.test(value)) {
          return callback(new Error("学生学号必须全为数字"))
        }
        callback()
      },
      trigger: "blur",
    },
  ],
  schoolCode: [{required: true, message: "请输入学校代码", trigger: "blur"}],
  class: [{required: true, message: "请输入学生班级", trigger: "blur"}],
  sex: [{required: true, message: "请选择性别", trigger: "change"}],
}
