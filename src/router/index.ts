import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import classRoutes from './classManagement'
import userManagementRouters from '@/router/userManagement'
import homeRouter from '@/router/home'
import { useElMenuActiveStore } from '@/stores/menu.js'
import { useAuthStore } from '@/stores/tokenStore.js'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/zhuce.vue'),
    },
    {
      path: '/success',
      name: 'Success',
      component: () => import('../views/resultPages/success.vue'),
    },
    {
      path: '/403',
      name: 'Forbidden',
      component: () => import('../views/resultPages/403.vue'),
      meta: { showErrorPage: true },
    },
    {
      path: '/500',
      name: 'ServerError',
      component: () => import('../views/resultPages/500.vue'),
      meta: { showErrorPage: true },
    },
    {
      path: '/:pathMatch(.*)',
      name: 'NotFound',
      component: () => import('../views/resultPages/404.vue'),
      meta: { showErrorPage: true },
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/testPass.vue'),
    },
    {
      path: '/',
      component: () => import('../layout/basicLayout.vue'),
      meta: { requireAuth: false },
      name: 'Home',
      redirect: '/Home',
      children: [...classRoutes, ...homeRouter, ...userManagementRouters],
    },
    {
      path: '/stuForgetPassword',
      name: 'StuForgetPassword',
      component: () => import('@/components/auth/forgetPassword.vue'),
    },
    {
      path: '/teacherReg',
      name: 'teacherReg',
      component: () => import('@/views/teacherReg.vue'),
    },
  ],
})

//
// router.beforeEach((to, from, next) => {
//   const useAuth = useAuthStore()
//   const token = useAuth.data.token
//   useElMenuActiveStore().elMenuActive = to.path
//   if (!token && to.name !== 'Login' && to.name !== 'Signup' && to.name !== 'StuForgetPassword') {
//     // 重定向到登录页面
//     next({ name: 'Login' })
//   } else {
//     // 已登录状态或访问登录/注册页面，允许访问
//     next()
//   }
// })

router.beforeEach((to, from, next) => {
  const useAuth = useAuthStore()
  const token = useAuth.data.token
  useElMenuActiveStore().elMenuActive = to.path
  if (!token && to.name !== 'Login' && to.name !== 'Signup' && to.name !== 'StuForgetPassword') {
    // 重定向到登录页面
    next({ name: 'Login' })
  } else {
    // 已登录状态或访问登录/注册页面，允许访问
    next()
  }
})

// router.beforeEach((to, from, next) => {
//   const useAuth = useAuthStore()
//   useElMenuActiveStore().elMenuActive = to.path
//   // const isAuthenticated = useAuth.data.token
//   if (to.meta.requireAuth && to.name !== 'Login' && to.name !== 'Signup' && to.name !== 'StuForgetPassword') {
//     next({ name: 'Login' }) // 重定向到登录页面
//   } else if (to.meta.showErrorPage && to.matched.length === 0) {
//     next('/404') // 重定向到404页面
//   } else {
//     next() // 其他情况正常导航
//   }
// })

export default router
