/**
 * @fileName userInfo.js
 * @description 个人中心路由 展示个人信息以及名下课程
 * @author LJF
 * @date 2024/02/01 12:59
 */

const userInfoRouter = [
  {
    path: "/userInfo",
    name: "userInfo",
    meta: {
      requireAuth: true,
      role: ["admin", "teacher", "student"],
    },
    children: [
      {
        path: "/userInfo",
        name: "userInfo",
        component: () => import("../views/Home/userInfo.vue"),
        meta: { title: "个人中心", requireAuth: true, index: "1" },
      },
      {
        path: "Home",
        name: "Home",
        component: () => import("../views/Home/Home.vue"),
        meta: { requireAuth: true, index: "1" },
      },
    ],
  },
]

export default userInfoRouter
