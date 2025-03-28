<script setup>
/**
 * @fileName loginCom.vue
 * @description 登录组件
 * @author LJF
 */

import { login } from "@/api"
import { useAuthStore } from "@/stores/tokenStore"
import router from "@/router/index.js"
import { ElLoading } from "element-plus"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { checkToken } from "@/api/index.js"
import CommonSvg from "../SvgOrIcon/CommonSvg.vue"
const loginForm = ref({
  username: "",
  email: "",
  password: "",
})
const rememberMe = ref(false)
const isPasswordVisible = ref(false)

/**
 * For full screen loading indicator.
 */

let loadingInstance = null
const openFullScreen = () => {
  const themeBackground = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--loading-bg")
  loadingInstance = ElLoading.service({
    lock: true,
    text: "登录中...",
    background: themeBackground,
  })
}
/**
 * Close full screen loading indicator.
 */
const closeFullScreen = () => {
  if (loadingInstance) {
    loadingInstance.close()
  }
}

// 因为在登录的API处已经做了传递参数的处理，故不需要在此区分name或者Email
const onSubmitWithName = async () => {
  // 开启 loading
  openFullScreen()

  try {
    const res = await login(loginForm.value.username, loginForm.value.password)

    if (res.data.status === 0) {
      ElMessage({
        message: "登录成功",
        type: "success",
        duration: 3000,
      })
      // 如果用户选择了7天免登录，则设置定时任务在expiredAt到期之前刷新token
      if (rememberMe) {
        localStorage.setItem("rememberMe", rememberMe.value)
      }
      const authStore = useAuthStore()
      authStore.setData(res.data.data)
      // 将token存储到cookies
      // const token = res.data.data.token
      // document.cookie = `token=${token}; path=/;`
      router.push({ path: "/" })
      ElNotification({
        title: "温馨提示",
        message: "此网站处于测试阶段，并非最终效果；所有数据仅用于测试",
        type: "warning",
        duration: 1500,
      })
      //checkToken()
    }
  } catch (error) {
    if (error.response && error.response.data) {
    console.error(error.response.data.reason)
    if (error.response.data.status === 1) {
      ElNotification({
        title: "错误",
        message: error.response.data.reason,
        type: "error",
        duration: 3000,
      })
    }
  }else{
     console.error("Unexpected error:", error)
  } 
  }
}

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}
const canSubmit = computed(() => {
  const { username, password } = loginForm.value
  return Boolean(username && password)
})
</script>

<template>
  <div class="login-page">
    <!-- 整个登录表单 -->
    <div class="center-container">
      <!-- 左半部分，存放图片 -->
      <div class="left-section">
        <img src="../../assets/loginOrReg/lampBulb.png" alt="Image" />
      </div>

      <!-- 右半部分 -->
      <div class="right-section">
        <!-- 右边的上半部分，用于登录表单 -->

        <div class="top-section">
          <div class="form-container">
            <!-- 新增的div -->
            <el-form class="login-form">
              <div class="form-top">
                <div class="title">
                  统一身份认证
                </div>
                <div class="right">
                  <!-- 扫码登录暂未开发  -->
                  <el-link type="info" href="#" style="font-size: 11px" disabled
                    >扫码登录<img src="../../assets/loginOrReg/qrCode.png"
                  /></el-link>
                </div>
              </div>
              <!-- 分割线 -->
              <el-divider />
              <div class="input-container">
                <div class="input-group">
                  <input
                    v-model="loginForm.username"
                    type="text"
                    placeholder=" "
                    style="margin-bottom: 20px"
                    prop="username"
                  />
                  <label class="placeholder">
                    用户名/邮箱
                  </label>
                </div>

                <div class="input-group">
                  <input
                    v-model="loginForm.password"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    placeholder=" "
                    style="margin-bottom: 10px"
                    prop="password"
                    autocomplete="on"
                  />
                  <label class="placeholder">
                    密码
                  </label>
                  <div class="password-toggle">
                    <el-icon @click="togglePasswordVisibility">
                      <template v-if="isPasswordVisible">
                        <CommonSvg icon-name="view"/>
                      </template>
                      <template v-else>
                        <CommonSvg icon-name="hide"/>
                      </template>
                    </el-icon>
                  </div>
                </div>
              </div>

              <div class="remember-row">
                <el-checkbox v-model="rememberMe">一周内免登录</el-checkbox>
                <!-- 学生找回密码暂未开发 -->
                <el-link
                  href="/stuForgetPassword"
                  class="forgot-password"
                  disabled
                  >忘记密码
                </el-link>
              </div>
              <el-button
                type="primary"
                class="login-button"
                :disabled="!canSubmit"
                @click="onSubmitWithName"
                >登录
              </el-button>
              <!-- 分割线 -->
            </el-form>
          </div>
        </div>
        <!-- 右边的底部栏，用于第三方API -->
        <div class="bottom-section">
          <div class="other-login">
            <!-- <p type="default" style="font-size: 12px;">其它登录方式</p> -->
            <div class="icon-container">
              <a href="#"><img src="../../assets/loginOrReg/qq.png"/></a>
              <a href="#"><img src="../../assets/loginOrReg/wechat.png"/></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="signup">
      还没有账号？
      <el-link
        type="primary"
        href="/signup"
        style="font-size: 18px ;text-decoration: underline; "
        >去注册
      </el-link>
    </div>
  </div>
</template>

<style scoped>
/* 在这里添加样式 */
.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* backgroundimg setting */
#building {
  /* background: url("/src/assets/img/BackgroundImg/loginBg-min.png"); */
  /* background-color: #b3e19d; */
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}

.center-container {
  display: flex;
  justify-content: center;
  background-color: var(--primary-bg);
  /* align-items: center; */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  /* 边框光芒效果 */
  border-radius: 10px;
  /* 圆角边框 */
  padding: 0px;
  /* 内边距 */
  width: 610px;
  /* 宽度 */
  height: 400px;
  /* 高度 */
}

.left-section {
  /* 左侧部分样式 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.left-section img {
  /* 左侧的图片大小*/
  /* max-width: 360px; */
  max-height: 250px;
}

.right-section {
  /* 右侧部分样式 */
  display: flex;
  flex-direction: column;
  /* background-color: #a35d5d; */
}

.top-section {
  /* 上半部分样式 */
  flex: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #a35d5d; */
}

.bottom-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.signup {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}

.other-login {
  order: 2;
  /* 显示在右边 */
  display: flex;
  align-items: center;
}

.icon-container {
  display: flex;
}

.icon-container img {
  /* 图片大小 */
  width: 35px;
  height: 35px;
  margin-right: 10px;
}

.form-container {
  background-color: var(--login-bg-form);
  /* 登录表单的外层DIV的灰色背景 */
  padding: 15px;
  border-radius: 5px;
}

.login-form {
  /* 登录表单样式 */
  /* display: flex; */
  /* flex-direction: column; */
  align-items: center;
}

.login-form .form-row {
  margin-bottom: 20px;
}

.login-form .form-row label {
  width: 100px;
}

/* 登录按钮的样式 */
.login-button {
  width: 325px;
  /* 调整按钮高度 */
  height: 45px;
  margin-bottom: 15px;
  font-size: large;
}

.form-top {
  text-align: left;
  font-size: 18px;
  color: #3271ad;
  letter-spacing: 1px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.title {
  flex: 1;
  font-weight: bold;
}

.right {
  display: flex;
  justify-content: flex-end;
}

.right img {
  width: 40px;
}

.remember-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.forgot-password {
  font-size: 12px;
  float: left;
}

/**
登录表单输入框样式
*/

.input-container {
  margin-top: 15px;
}
.input-group {
  position: relative;
}

input {
  padding: 10px;
  border-radius: 5px;
  outline: none;
  color: var(--input-color);
  border: 1px solid #0da2ff;
  width: 90%;
  font-size: 14px;
}

.placeholder {
  position: absolute;
  top: 12px;
  left: 8px;
  font-size: 14px;
  padding: 0px 5px;
  color: #0da2ff;
  transition: 0.3s;
  pointer-events: none;
}

input:focus + .placeholder,
input:not(:placeholder-shown) + .placeholder {
  top: -15px;
}

/**
password input icon stytle
*/
.password-toggle {
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
  right: 20px;
  cursor: pointer;
}

.toggle-icon {
  font-size: 18px;
  color: #0da2ff;
}

.hide-icon::before {
  content: "\f070";
}

.show-icon::before {
  content: "\f06e";
}
</style>
