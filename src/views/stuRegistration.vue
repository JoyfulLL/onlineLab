<script setup>
import { regStu } from "@/api/userManagement/registerUser.js"
import { rules } from "@/utils/formRules.js"
import { basicClassesStore } from "@/stores"
import router from "@/router/index.js"
import { useToggle } from "@vueuse/shared"
import { useDark } from "@vueuse/core"
import universitiesList from "@/assets/static/schoolLists.json"
onMounted(() => {
  restaurants.value = universitiesList.map(item => {
    return {
      value: item["学校名称"],
    }
  })
  restaurantsClass.value = classList.map(item => {
    return {
      value: item["classname"],
    }
  })
})
const isDark = useDark({
  disableTransition: false,
  valueDark: "dark",
  valueLight: "light",
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const toggleDark = useToggle(isDark)

// 班级列表
const useClassesList = basicClassesStore()
const classList = useClassesList.classList
// 注册表单
const userForm = reactive({
  name: "",
  password: "",
  email: "",
  realName: "",
  userSchoollD: "",
  schoolCode: "",
  class: "",
  sex: "",
})

const isDisabled = computed(() => {
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
})
// 清空表单
const form = ref(null)
const resetForm = () => {
  form.value.resetFields()
}
// when user reFocus,clearValidate message
function handleFocus(field) {
  form.value.clearValidate(field)
}

const restaurants = ref([])
const restaurantsClass = ref([])
const querySearch = (queryString, cb) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  // call callback function to return suggestions
  cb(results)
}

const querySearchClass = (queryClassString, cb) => {
  const results = queryClassString
    ? restaurantsClass.value.filter(createClassFilter(queryClassString))
    : restaurantsClass.value
  // call callback function to return suggestions
  cb(results)
}

const createFilter = queryString => {
  return restaurant => {
    const value = restaurant.value || "" // 获取对象的值
    return value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  }
}
const createClassFilter = queryClassString => {
  return restaurantsClass => {
    const value = restaurantsClass.value || "" // 获取对象的值
    return value.toLowerCase().indexOf(queryClassString.toLowerCase()) === 0
  }
}
// 学生注册提交
const handleSubmit = () => {
  ElMessageBox.confirm("注册之后，用户名不可更改。确定提交吗？", "info", {
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
    .catch(error => {
      console.log(error)
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
              placeholder="输入用户名"
              clearable
              @focus="handleFocus('name')"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="userForm.password"
              placeholder="输入密码"
              type="password"
              show-password
              @focus="handleFocus('password')"
            />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realName">
            <el-input
              v-model="userForm.realName"
              placeholder="输入真实姓名"
              clearable
              @focus="handleFocus('realName')"
            ></el-input>
          </el-form-item>
          <el-form-item label="学生学号" prop="userSchoollD">
            <el-input
              v-model="userForm.userSchoollD"
              placeholder="输入学号"
              clearable
              @focus="handleFocus('userSchoollD')"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="userForm.email"
              clearable
              placeholder="输入邮箱"
              @focus="handleFocus('email')"
            ></el-input>
          </el-form-item>
          <el-form-item label="学校" prop="schoolCode">
            <el-autocomplete
              v-model="userForm.schoolCode"
              :fetch-suggestions="querySearch"
              :trigger-on-focus="false"
              clearable
              style="width:280px;"
              placeholder="输入学校名称"
              @focus="handleFocus('schoolCode')"
            />
          </el-form-item>
          <el-form-item label="班级" prop="class">
            <el-autocomplete
              v-model="userForm.class"
              :fetch-suggestions="querySearchClass"
              :trigger-on-focus="false"
              clearable
              style="width:280px;"
              placeholder="输入班级"
              @focus="handleFocus('schoolCode')"
            />
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
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 将容器高度设置为视口高度 */
  background-color: var(--primary-bg);
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
