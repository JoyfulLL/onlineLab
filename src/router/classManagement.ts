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

const classRoutes = [
    {
        index: 1,
        icon: 'PieChart',
        title: '总览',
        path:"/Home",
        name:"Home",
        component:()=>import('../views/Home/Home.vue'),
        meta: {requireAuth: true,visiable:true,role: ['admin','teacher','student']}
    },
    {
        path:"/userManagement/teacherManagement",
        name:"teacherManagement",
        component:()=>import('../views/admin/userManagement/teacherManagement.vue'),
        meta: {requireAuth: true,visiable:true,role: ['admin']}
    },
    {
        path:"/userManagement/adminSelf",
        name:"adminSelf",
        component:()=>import('../views/admin/userManagement/adminSelf.vue'),
        meta: {requireAuth: true,visiable:true,role: ['admin']}
    },
    {
        path:"/classManagement/homework",
        name:"homework",
        component:()=>import('../views/classManagement/homework.vue'),
        meta: {requireAuth: true,visiable:true,role: ['admin','teacher','student']}
    },
    {
        path:"/classManagement/experimentTaskManagement",
        name:"experimentTaskManagement",
        component:()=>import('../views/classManagement/experimentTaskManagement.vue'),
        meta: {requireAuth: true,visiable:true,role: ['admin','teacher','student']}
    },
    {
        path:"/classManagement/fileShare",
        name:"fileShare",
        component:()=>import('../views/classManagement/fileShare.vue'),
        meta: {requireAuth: true,visiable:true,role: ['admin','teacher','student']}
    },
    {
        path:"/classManagement/studentManagement",
        name:"studentManagement",
        component:()=>import('../views/classManagement/studentManagement.vue'),
        meta: {requireAuth: true,visiable:true,role: ['admin','teacher']}
    },
    {
        path:"/classManagement/algorithmExercises",
        name:"algorithmExercises",
        component:()=>import('../views/classManagement/algorithmExercises.vue'),
        meta: {requireAuth: true,visiable:true,role: ['admin','teacher','student']}
    },
];

export default classRoutes ;
