<script>
/**

 */

import { login } from "@/api"
import { useAuthStore } from "@/stores/tokenStore"
import { ElMessage } from "element-plus"

export default {
  name: "LoginPage",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rememberMe: false,
      isPasswordVisible: false,
    }
  },

  methods: {
    onSubmit() {
      login(this.loginForm.username, this.loginForm.password).then(res => {
        if (res.data.status === 0) {
          ElMessage({
            message: "登录成功",
            type: "success",
            duration: 3000,
          })
          const authStore = useAuthStore()
          authStore.setData(res.data.data)
          //将token存储到cookies
          // const token = res.data.data.token
          // document.cookie = `token=${token}; path=/;`
          this.$router.push({ path: "/" })
        }
      })
    },
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible
    },
  },

  computed: {
    canSubmit() {
      const { username, password } = this.loginForm
      return Boolean(username && password)
    },
  },
}
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
                  <el-link type="info" href="#">手机/邮箱</el-link>
                </div>
                <div class="right">
                  <el-link type="info" href="#" style="font-size: 11px"
                    >扫码登录<img src="../../assets/loginOrReg/qrCode.png"
                  /></el-link>
                </div>
              </div>
              <!-- 分割线 -->
              <el-divider />

              <div class="input-group">
                <input
                  type="text"
                  placeholder=" "
                  v-model="loginForm.username"
                  style="margin-bottom: 20px"
                  prop="username"
                />
                <label class="placeholder">
                  用户名
                </label>
              </div>

              <div class="input-group">
                <input
                  :type="isPasswordVisible ? 'text' : 'password'"
                  placeholder=" "
                  v-model="loginForm.password"
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
                      <View />
                    </template>
                    <template v-else>
                      <Hide />
                    </template>
                  </el-icon>
                </div>
              </div>

              <div class="remember-row">
                <el-checkbox v-model="rememberMe">一周内免登录</el-checkbox>
                <router-link to="/stuForgetPassword" class="forgot-password"
                  >忘记密码
                </router-link>
              </div>
              <el-button
                type="primary"
                @click="onSubmit"
                class="login-button"
                :disabled="!canSubmit"
                >登录
              </el-button>
            </el-form>
          </div>
        </div>
        <!-- 右边的底部栏，用于第三方API -->
        <div class="bottom-section">
          <div class="signup">
            <el-link
              type="primary"
              href="/signup"
              style="font-size: 15px;"
              target="_blank"
              >注册</el-link
            >
          </div>
          <div class="other-login">
            <p type="default" style="font-size: 15px;">其它登录方式</p>
            <div class="icon-container">
              <a href="#"><img src="../../assets/loginOrReg/qq.png"/></a>
              <a href="#"><img src="../../assets/loginOrReg/wechat.png"/></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 在这里添加样式 */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.center-container {
  display: flex;
  justify-content: center;
  /* align-items: center; */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  /* 边框光芒效果 */
  border-radius: 15px;
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
  justify-content: space-between;
  align-items: center;
}

.signup {
  order: 1; /* 显示在左边 */
}

.other-login {
  order: 2; /* 显示在右边 */
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
  background-color: #ffffff;
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
.input-group {
  position: relative;
}
input {
  padding: 10px;
  border-radius: 5px;
  outline: none;
  color: #444444;
  border: 1px solid #0da2ff;
  width: 90%;
  font-size: 14px;
}
.placeholder {
  position: absolute;
  top: 10px;
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
