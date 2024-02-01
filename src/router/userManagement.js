const userManagementRouters = [
  // 用户管理
  {
    path: "/userManagement",
    name: "userManagement",
    meta: {
      requireAuth: true,
      role: ["admin"],
      title: "用户管理",
      index: "2",
    },
    children: [
      {
        path: "teacherManagement",
        name: "teacherManagement",
        component: () =>
          import("../views/admin/userManagement/teacherManagement.vue"),
        meta: {
          requireAuth: true,
          role: ["admin"],
          title: "教师管理",
          index: "2-1",
        },
      },
      {
        path: "adminSelf",
        name: "adminSelf",
        component: () => import("../views/admin/userManagement/adminSelf.vue"),
        meta: {
          requireAuth: true,
          role: ["admin"],
          title: "管理员",
          index: "2-2",
        },
      },
      {
        path: "studentManagement",
        name: "studentManagement",
        component: () =>
          import("../views/classManagement/studentManagement.vue"),
        meta: {
          requireAuth: true,
          role: ["admin", "teacher"],
          title: "学生管理",
          index: "2-3",
        },
      },
    ],
  },
]

export default userManagementRouters
