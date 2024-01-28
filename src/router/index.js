import { checkToken } from "@/api"
import homeRouter from "@/router/home"
import userManagementRouters from "@/router/userManagement"
import { useElMenuActiveStore } from "@/stores/menu.js"
import LoginPage from "@/views/LoginPage.vue"
import { createRouter, createWebHistory } from "vue-router"
import classRoutes from "./classManagement"
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
      path: "/:pathMatch(.*)",
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
      path: "/",
      component: () => import("../layout/basicLayout.vue"),
      meta: { requireAuth: true },
      name: "Home",
      redirect: "/Home",
      children: [...classRoutes, ...homeRouter, ...userManagementRouters],
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
  if (
    to.name === "Login" ||
    to.name === "Signup" ||
    to.name === "StuForgetPassword"
  ) {
    next() // 如果是登录页面，直接放行 不需要校验
  } else {
    try {
      let isAuthenticated = await checkToken(true) // 需要校验 token
      useElMenuActiveStore().elMenuActive = to.path
      if (to.meta.requireAuth && !isAuthenticated) {
        // 重定向到登录页面
        next({ name: "Login" })
      } else if (to.meta.showErrorPage && to.matched.length === 0) {
        next("/404")
      } else {
        // 已登录状态 允许访问
        next()
      }
    } catch (error) {
      console.error("Token 校验失败", error)
      next({ name: "Login" })
    }
  }
})

export default router
