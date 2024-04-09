// classRoutes .ts
/*
@   role代表用户角色,其它组件通过tokenStore
    里面的方法获得scope，将scope赋值给role
 */
/**
 * 动态路由
 * 用来放置有权限（roles 属性）的路由
 * 必须带有 name 属性
 */
// 每个课程的路由
const courseRoutes = [
  {
    path: "/courseroom/:courseid/",
    name: "classManagement",
    meta: {
      requireAuth: true,
      role: ["admin", "teacher", "student"],
      title: "学习空间",
      index: "4",
    },
    children: [
      {
        path: "homework",
        name: "homework",
        component: () =>
          import("../views/classManagement/homeWork/Home-Work.vue"),
        meta: {
          requireAuth: true,
          role: ["admin", "teacher", "student"],
          title: "作业",
          index: "4-1",
        },
      },
      {
        path: "experimentTaskManagement",
        name: "experimentTaskManagement",
        component: () =>
          import("../views/classManagement/experimentTaskManagement.vue"),
        meta: {
          requireAuth: true,
          visiable: true,
          role: ["admin", "teacher", "student"],
          title: "实验任务",
          index: "4-2",
        },
      },
      {
        path: "fileShare",
        name: "fileShare",
        component: () => import("../views/classManagement/fileShare.vue"),
        meta: {
          requireAuth: true,
          role: ["admin", "teacher", "student"],
          title: "资料共享",
          index: "4-3",
        },
      },
      {
        path: "algorithmExercises",
        name: "algorithmExercises",
        component: () =>
          import("../views/classManagement/algorithmExercises.vue"),
        meta: {
          requireAuth: true,
          role: ["admin", "teacher", "student"],
          title: "算法练习",
          index: "4-4",
        },
      },
    ],
  },
]

export default courseRoutes
