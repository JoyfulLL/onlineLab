<script setup>
import { regStu } from "@/api/userManagement/registerUser.js"
import { rules } from "@/utils/formRules.js"
import { basicClassesStore } from "@/stores"
import { useRouter } from "vue-router"
const router = useRouter(),
  // 班级列表
  useClassesList = basicClassesStore(),
  classList = useClassesList.classList,
  // 注册表单
  userForm = reactive({
    name: "",
    password: "",
    email: "",
    realName: "",
    userSchoollD: "",
    schoolCode: "",
    class: "",
    sex: "",
  }),
  isDisabled = computed(() => {
    return (
      !userForm.name ||
      !userForm.password ||
      !userForm.realName ||
      !userForm.userSchoollD ||
      !userForm.email ||
      !userForm.schoolCode ||
      !userForm.class ||
      !userForm.sex
    )
  }),
  // 清空表单
  form = ref(null),
  resetForm = () => {
    form.value.resetFields()
  }
// when user reFocus,clearValidate message
function handleFocus(field) {
  form.value.clearValidate(field)
}
// 学生注册提交
const handleSubmit = () => {
  ElMessageBox.confirm("注册之后，班级不可以修改。确定提交吗？", "Warning", {
    confirmButtonText: "确定",
    confirmButtonClass: "btnConfirm",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await regStu(
        userForm.name,
        userForm.password,
        userForm.email,
        userForm.realName,
        userForm.userSchoollD,
        userForm.schoolCode,
        userForm.class,
        userForm.sex
      ).then(res => {
        if (res.data.status == 0) {
          // 判断status是否为0
          ElMessage({
            message: "注册成功",
            type: "success",
            duration: 3000,
          })
          // 注册成功，跳转到成功的界面
          router.push("/success")
        }
      })
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消",
      })
    })
}
</script>

<template>
  <div id="building">
    <div class="card-container">
      <el-card class="form-card" shadow="hover">
        <a class="back-link" href="/login"
          ><el-icon color="#409EFC" size="20"><Back /></el-icon
        ></a>
        <h2 class="form-title">学生注册</h2>
        <el-form
          ref="form"
          :model="userForm"
          label-width="80px"
          :rules="rules"
          class="centered-form"
          @submit="handleSubmit"
        >
          <el-form-item label="用户名" prop="name">
            <el-input
              v-model="userForm.name"
              @focus="handleFocus('name')"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="userForm.password"
              type="password"
              show-password
              @focus="handleFocus('password')"
            />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realName">
            <el-input
              v-model="userForm.realName"
              @focus="handleFocus('realName')"
            ></el-input>
          </el-form-item>
          <el-form-item label="学生学号" prop="userSchoollD">
            <el-input
              v-model="userForm.userSchoollD"
              @focus="handleFocus('userSchoollD')"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="userForm.email"
              @focus="handleFocus('email')"
            ></el-input>
          </el-form-item>
          <el-form-item label="学校代码" prop="schoolCode">
            <el-input
              v-model="userForm.schoolCode"
              @focus="handleFocus('schoolCode')"
            ></el-input>
          </el-form-item>
          <el-form-item label="班级" prop="class">
            <el-select v-model="userForm.class" placeholder="请选择班级">
              <el-option
                v-for="item in classList"
                :key="item.classid"
                :label="item.classname"
                :value="item.classname"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <div class="centered-radio">
              <el-radio-group v-model="userForm.sex">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="button-container" style="text-align: center">
              <el-button
                type="primary"
                :disabled="isDisabled"
                @click="handleSubmit('userForm')"
                >提交
              </el-button>
              <el-button type="warning" @click="resetForm">重置</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
  <div class="footer">
    <el-link
      href="https://beian.miit.gov.cn/"
      target="_blank"
      type="primary"
      style="font-size: medium;color: gray;"
    >
      粤ICP备2024184954号-1
    </el-link>
  </div>
</template>

<style scoped lang="less">
#building {
  background: url("/src/assets/img/BackgroundImg/SignupBg-min.png");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 将容器高度设置为视口高度 */
}

.form-card {
  width: 400px;
  border: none;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.form-title {
  text-align: center;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 15px;
  font-size: 20px;
}

.el-form-item__label {
  color: #333;
  font-weight: bold;
}

.el-input {
  width: 100%;
}

.el-select {
  width: 100%;
}

// .el-radio-group {
//   display: flex;
//   flex-direction: row;
// }

.centered-radio {
  display: flex;
  justify-content: center;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.el-button {
  width: 100px;
}
</style>
