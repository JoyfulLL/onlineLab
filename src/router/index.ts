import { createRouter, createWebHistory } from "vue-router";
import LoginPage from '@/views/LoginPage.vue';
import {checkToken} from "@/api/manager";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: LoginPage,
    },
    {
      path: "/Zhuce",
      name: "Zhuce",
      component: () => import("../views/zhuce.vue"),
    },
    {
      path:'/',
      component:()=>import("../layout/basicLayout.vue"),
      meta: { requireAuth: true },
      redirect:'/Home',
      children:[
        {
          path:"/Home",
          name:"Home",
          component:()=>import('../views/Home/Home.vue')
        },
        {
          path:"/userManagement/teacherManagement",
          name:"teacherManagement",
          component:()=>import('../views/admin/userManagement/teacherManagement.vue')
        },
        {
          path:"/userManagement/adminSelf",
          name:"adminSelf",
          component:()=>import('../views/admin/userManagement/adminSelf.vue')
        },
        {
          path:"/classManagement/homework",
          name:"homework",
          component:()=>import('../views/classManagement/homework.vue')
        },
        {
          path:"/classManagement/experimentTaskManagement",
          name:"experimentTaskManagement",
          component:()=>import('../views/classManagement/experimentTaskManagement.vue')
        },
        {
          path:"/classManagement/fileShare",
          name:"fileShare",
          component:()=>import('../views/classManagement/fileShare.vue')
        },
        {
          path:"/classManagement/studentManagement",
          name:"studentManagement",
          component:()=>import('../views/classManagement/studentManagement.vue')
        },
        {
          path:"/classManagement/algorithmExercises",
          name:"algorithmExercises",
          component:()=>import('../views/classManagement/algorithmExercises.vue')
        },
      ]
    }
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.name !== "Login" && !token) next({ name: "Login" });
  else next();
});

export default router;
