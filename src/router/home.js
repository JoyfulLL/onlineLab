/**
 * @fileName home.js
 * @description 对应的课程首页的路由
 * @author LJF
 * @date 2024/02/01 12:59
 */

const homeRouter = [
  {
    path: "/classroom/:courseid/home",
    name: "Home",
    component: () => import("../views/Home/Home.vue"),
    meta: {
      requireAuth: true,
      index: "1",
      role: ["admin", "teacher", "student"],
      title: "总览",
    },
  },
]

export default homeRouter
