const homeRouter = [
  {
    path: "/Home",
    name: "Home",
    meta: {
      requireAuth: true,
      role: ["admin", "teacher", "student"],
      title: "总览",
      index: "1",
    },
    children: [
      {
        path: "/Home",
        name: "Home",
        component: () => import("../views/Home/Home.vue"),
        meta: { requireAuth: true, index: "1" },
      },
      {
        path: "userInfo",
        name: "userInfo",
        component: () => import("../views/Home/userInfo.vue"),
        meta: { title: "个人中心", requireAuth: true, index: "1" },
      },
    ],
  },
];

export default homeRouter;
