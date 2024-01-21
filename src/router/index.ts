import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/views/LoginPage.vue";
import classRoutes from "./classManagement";
import userManagementRouters from "@/router/userManagement";
import homeRouter from "@/router/home";
import { useElMenuActiveStore } from "@/stores/menu.js";
import { useAuthStore } from "@/stores/tokenStore.js";
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
      meta: { requireAuth: false },
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
});

//
router.beforeEach((to, from, next) => {
  const useAuth = useAuthStore();
  const token = useAuth.data.token;
  useElMenuActiveStore().elMenuActive = to.path;
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
