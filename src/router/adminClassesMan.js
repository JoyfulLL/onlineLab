/**
 * @fileName adminClassesMan.js
 * @description 管理员的班级管理
 * @author LJF
 * @date 2024/02/04 15:40
 */

const classRoutes = [
  {
    path: "/classRoomManagement",
    name: "classRoomManagement",
    component: () =>
      import("../views/admin/classesManagement/adminManageClasses.vue"),
    meta: {
      requireAuth: true,
      index: "3",
      role: ["admin"],
      title: "班级管理",
    },
  },
]

export default classRoutes
