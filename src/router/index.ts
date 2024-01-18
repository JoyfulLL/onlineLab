import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/views/LoginPage.vue";
import classRoutes from "./classManagement";
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
      children: [...classRoutes],
    },
    {
      path: "/stuForgetPassword",
      name: "StuForgetPassword",
      component: () => import("@/components/auth/forgetPassword.vue"),
    },
  ],
});

//
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (
    !token &&
    to.name !== "Login" &&
    to.name !== "Signup" &&
    to.name !== "StuForgetPassword"
  ) {
    // 重定向到登录页面
    next({ name: "Login" });
  } else {
    // 已登录状态或访问登录/注册页面，允许访问
    next();
  }
});

export default router;
