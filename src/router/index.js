import { checkToken } from "@/api"
import homeRouter from "@/router/home"
import userInfoRouter from "@/router/userInfo"
import userManagementRouters from "@/router/userManagement"
import LoginPage from "@/views/LoginPage.vue"
import { createRouter, createWebHistory } from "vue-router"
import classRoutes from "./classManagement"
// 引入进度条
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
      component: () => import("../views/zhuce.vue"),
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
      meta: { requireAuth: true },
      children: [...userInfoRouter],
    },
    {
      /**
        Home是点击对应课程之后的首页，每个课程的首页展示的数据不一样
        但是首页结构一致，均用来展示完成的作业以及待做实验等数据
      */
      path: "/classroom",
      component: () => import("../layout/basicLayout.vue"),
      meta: { requireAuth: true },
      children: [
        ...homeRouter,
        ...classRoutes,
        ...userManagementRouters,
        {
          path: "/Contributors",
          name: "Contributors",
          component: () => import("@/views/ContributorsList.vue"),
          meta: { requireAuth: false, index: "4" },
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

//全局路由守卫
router.beforeEach(async (to, from, next) => {
  start()
  if (
    to.name === "Login" ||
    to.name === "Signup" ||
    to.name === "StuForgetPassword" ||
    to.name === "Contributors" ||
    to.name === "Success" ||
    to.name === "Forbidden" ||
    to.name === "ServerError" ||
    to.name === "NotFound"
  ) {
    next() // 如果是登录页面，直接放行 不需要校验
  } else {
    try {
      let isAuthenticated = await checkToken(true) // 需要校验 token
      if (to.meta.requireAuth && !isAuthenticated) {
        // 重定向到登录页面
        next({ name: "Login" })
      } else if (to.meta.showErrorPage && to.matched.length === 0) {
        next("/404")
      } else {
        close()
        // 已登录状态 允许访问
        next()
      }
    } catch (error) {
      console.error("Token 校验失败", error)
      next({ name: "Login" })
    }
  }
})

router.afterEach(() => {
  close()
})

export default router
