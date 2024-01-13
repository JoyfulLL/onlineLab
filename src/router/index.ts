import { createRouter, createWebHistory } from "vue-router";
import LoginPage from '@/views/LoginPage.vue';
import {checkToken} from "@/api/manager";
import classRoutes  from './classManagement';
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
      path:'/',
      component:()=>import("../layout/basicLayout.vue"),
      meta: { requireAuth: true},
      redirect:'/Home',
      children: [...classRoutes]
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.name !== "Login" && !token && to.name !== "Signup") next({ name: "Login" });
  else next();
});

export default router;
