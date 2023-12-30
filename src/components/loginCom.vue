<template>
  <div class="login-page">
    <!-- 整个登录表单 -->
    <div class="center-container">
      <!-- 左半部分，存放图片 -->
      <div class="left-section">
        <img src="../assets/loginOrReg/灯泡图案.png" alt="Image" />
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
                    >扫码登录<img src="../assets/loginOrReg/qrCode.png"
                  /></el-link>
                </div>
              </div>
              <!-- 分割线 -->
              <el-divider />

              <el-input
                placeholder="用户名"
                v-model="loginForm.username"
                style="margin-bottom: 20px"
                prop="username"
              ></el-input>
              <el-input
                type="password"
                placeholder="密码"
                v-model="loginForm.password"
                show-password
                style="margin-bottom: 10px"
                prop="password"
              >
              </el-input>
              <div class="remember-row">
                <el-checkbox v-model="rememberMe">一周内免登录</el-checkbox>
                <a href="#" class="forgot-password">忘记密码</a>
              </div>
              <el-button
                type="primary"
                @click="onSubmit"
                class="login-button"
                :disabled="!canSubmit"
                >登录</el-button
              >
            </el-form>
          </div>
        </div>
        <!-- 右边的底部栏，用于第三方API -->
        <div class="bottom-section">
          <div class="other-login">
            <el-link type="primary" href="#">其它登录方式</el-link>
            <div class="icon-container">
              <a href="#"><img src="../assets/loginOrReg/qq.png" /></a>
              <a href="#"><img src="../assets/loginOrReg/wechat.png" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/manager.js";
import { ElNotification } from "element-plus";

export default {
  name: "LoginPage",
  data() {
    return {
      loginForm: {
        username: "testadmin",
        password: "Tueu38p5hhraeg95",
      },
      rememberMe: false,
    };
  },

  methods: {
    onSubmit() {
      login(this.loginForm.username, this.loginForm.password)
        .then((res) => {
          // checkToken();
          if (res.data.status == 0) {
            //判断status是否为0
            ElNotification({
              message: "登录成功",
              type: "success",
              duration: 3000,
            });
            // console.log(res.data.data.token);
            // 将token储存到localStorage
            const { token } = res.data.data.token;
            localStorage.setItem("token", res.data.data.token);
          } else {
            ElNotification({
              title: "Warning",
              message: "失败",
              type: "warning",
              duration: 3000,
            });
          }
        })
        .catch((err) => {
          ElNotification({
            title: "Error",
            message: "请求失败",
            type: "error",
            duration: 3000,
          });
        });
    },

    toReg() {
      //跳转去注册
      this.$router.push("/Zhuce");
    },
  },

  computed: {
    canSubmit() {
      const { username, password } = this.loginForm;
      return Boolean(username && password);
    },
  },
};
</script>

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
  /* 下半部分样式 */
  flex: 1;
}

.other-login {
  display: flex;
  margin-bottom: 20px;
  justify-content: flex-end;
  /* 将内容向右对齐 */
}

.other-login-link {
  font-size: 14px;
  margin-left: 10px;
  /* 调整链接与图标的间距 */
  text-decoration: none;
  color: #333;
}

.icon-container {
  margin-left: 20px;
  /* 添加左侧间距 */
}

.icon-container img {
  /* 图片大小 */
  width: 35px;
  height: 35px;
  margin-right: 20px;
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
</style>
