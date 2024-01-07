import { createRouter, createWebHistory } from "vue-router";
import LoginPage from '@/views/LoginPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/1",
      name: "Login",
      component: LoginPage,
    },
    {
      path: "/Zhuce",
      name: "Zhuce",
      component: () => import("../views/zhuce.vue"),
    },
    {
      path: "/Home",
      name: "Home",
      meta: { requireAuth: true },
      component: () => import("../views/Home/Home.vue"),
    },
    {
      path:'/',
      component:()=>import("../layout/basicLayout.vue"),
      children:[
        {
          path:"/Home",
          name:"header",
          component:()=>import('../views/Home/Home.vue')
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
