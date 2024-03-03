import homeRouter from "@/router/home"
import { toRefreshToken } from "@/api"
import userInfoRouter from "@/router/userInfo"
import userManagementRouters from "@/router/userManagement"
import { useAuthStore } from "@/stores/tokenStore.js"
import LoginPage from "@/views/LoginPage.vue"
import { createRouter, createWebHistory } from "vue-router"
import classRoutes from "./adminClassesMan"
import courseRoutes from "./classManagement"
// 引入全局进度条
import { close, start } from "../utils/nprogress.js"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: LoginPage,
    },
    {
      path: "/signup",
      name: "Signup",
      component: () => import("../views/stuRegistration.vue"),
    },
    {
      path: "/success",
      name: "Success",
      component: () => import("../views/resultPages/success.vue"),
    },
    {
      path: "/403",
      name: "Forbidden",
      component: () => import("../views/resultPages/403.vue"),
      meta: { showErrorPage: true },
    },
    {
      path: "/500",
      name: "ServerError",
      component: () => import("../views/resultPages/500.vue"),
      meta: { showErrorPage: true },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/resultPages/404.vue"),
      meta: { showErrorPage: true },
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../views/testPass.vue"),
    },
    {
      /**
        登录成功后跳转到个人中心，个人中心展示自己的课程列表
      */
      path: "/",
      name: "userInfo",
      redirect: "/userInfo",
      component: () => import("../layout/homePageLayout.vue"),
      meta: { requireAuth: true, title: "个人中心" },
      children: [...userInfoRouter],
    },
    {
      /**
        Home是点击对应课程之后的首页，每个课程的首页展示的数据不一样
        但是首页结构一致，均用来展示完成的作业以及待做实验等数据
      */
      path: "/courseroom",
      component: () => import("../layout/basicLayout.vue"),
      meta: { requireAuth: true },
      children: [
        ...homeRouter,
        ...courseRoutes,
        ...userManagementRouters,
        ...classRoutes,
        {
          path: "/Contributors",
          name: "Contributors",
          component: () => import("@/views/ContributorsList.vue"),
          meta: {
            requireAuth: false,
            index: "99",
            title: "项目贡献者",
          },
        },
      ],
    },
    {
      path: "/stuForgetPassword",
      name: "StuForgetPassword",
      component: () => import("@/components/auth/forgetPassword.vue"),
    },
    {
      path: "/teacherReg",
      name: "teacherReg",
      component: () => import("@/views/teacherReg.vue"),
    },
  ],
})

// 全局路由守卫,跳转前校验token是否存在
router.beforeEach((to, from, next) => {
  start()
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 如果跳转到需要验证的界面，则校验初步校验token
  // 跳转之后，requireAuth的界面都会请求数据
  // 请求拦截器会添加token至header，校验失败则返回403
  if (to.meta.requireAuth) {
    const useAuth = useAuthStore()
    const token = useAuth.data.token
    // token为空，则没有登录，跳转到登录
    if (!token) {
      next({ name: "Login" })
    } else {
      next()
    }
  } else {
    next()
  }
})
// 刷新token的方法
function refreshToken() {
  const authObject = JSON.parse(localStorage.getItem("auth"))
  const refreshToken = authObject.data["refreshtoken"]
  toRefreshToken(refreshToken).then(res => {
    const authStore = useAuthStore()
    authStore.setData(res.data.data)
    // console.log(`刷新输出->`, res.data.data)
    localStorage.setItem("successRefresh", 1)
  })
}

// 解析守卫
router.beforeResolve((to, from, next) => {
  if (localStorage.getItem("rememberMe") === "true") {
    // 从 localStorage 中获取 auth 对象
    const authObject = JSON.parse(localStorage.getItem("auth"))
    const currentTime = Math.floor(Date.now() / 1000) // 当前时间的 UNIX 时间戳（秒）
    console.log(`当前时间->`, currentTime)
    const expiredAt = authObject.data["expiredAt"] // 过期时间的 UNIX 时间戳（秒）
    console.log(`过期时间->`, expiredAt)
    const remainingTime = (expiredAt - currentTime - 5 * 60) * 1000 // 剩余时间（毫秒）
    console.log(`剩余时间->`, remainingTime)
    // 如果剩余时间大于0，则设置定时器，在剩余时间结束之前刷新 token
    if (remainingTime > 0) {
      const timerId = setTimeout(refreshToken, remainingTime)
      console.log(`output->`, timerId)
    }
  }
  next()
})

router.afterEach(() => {
  close()
})

export default router
