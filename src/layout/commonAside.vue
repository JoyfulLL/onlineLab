<script setup>
import { useSidebarStore } from "@/stores/index"
import { useMenuStore } from "@/stores/menu"
import { useAuthStore } from "@/stores/tokenStore"
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"

const useScope = useAuthStore()
// 读取当前用户的scope角色并存储
const userScope = useScope.getScope() // 获取到的scope
onMounted(() => {})
// 侧边栏折叠
const useToCollapse = useSidebarStore()
// 菜单
const menuStore = useMenuStore()
const router = useRouter()
// 课程列表
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const courses = ref([
  { courseid: 1, title: "计算机网络", description: "这是计算机网络" },
  { courseid: 2, title: "数据结构", description: "这是数据结构的描述" },
  { courseid: 3, title: "高等数学1", description: "这是一个描述2" },
  { courseid: 4, title: "高等数学2", description: "这是一个描述2" },
  { courseid: 5, title: "高等数学3", description: "这是一个描述3" },
])
// 一般用户菜单树——学生
// 无用户管理菜单
const commonMenuTree = ref([
  {
    index: "1",
    icon: "PieChart",
    title: "总览",
    name: "Home",
    scope: ["admin", "teacher", "student"], // 适用于所有权限
  },
  {
    index: "4-1",
    icon: "Notebook",
    title: "作业",
    name: "homework",
    scope: ["admin", "teacher", "student"],
  },
  {
    index: "4-2",
    icon: "Tools",
    title: "实验任务",
    name: "experimentTaskManagement",
    scope: ["admin", "teacher", "student"],
  },
  {
    index: "4-3",
    icon: "UploadFilled",
    title: "资料共享",
    name: "fileShare",
    scope: ["admin", "teacher", "student"],
  },
  {
    index: "4-4",
    icon: "EditPen",
    title: "算法练习题",
    name: "algorithmExercises",
    scope: ["admin", "teacher", "student"],
  },
  {
    index: "99",
    icon: "PieChart",
    title: "贡献者",
    name: "Contributors",
    scope: ["admin", "teacher", "student"], // 适用于所有权限
  },
])
// 教师菜单
const teacherMenuTree = ref([
  {
    index: "1",
    icon: "PieChart",
    title: "总览",
    name: "Home",
    scope: ["admin", "teacher", "student"], // 适用于所有权限
  },
  {
    index: "2-3",
    icon: "UserFilled",
    title: "学生管理",
    name: "studentManagement",
    scope: ["admin", "teacher"],
  },
  {
    index: "4-1",
    icon: "Notebook",
    title: "作业",
    name: "homework",
    scope: ["admin", "teacher", "student"],
  },
  {
    index: "4-2",
    icon: "Tools",
    title: "实验任务",
    name: "experimentTaskManagement",
    scope: ["admin", "teacher", "student"],
  },
  {
    index: "4-3",
    icon: "UploadFilled",
    title: "资料共享",
    name: "fileShare",
    scope: ["admin", "teacher", "student"],
  },
  {
    index: "4-4",
    icon: "EditPen",
    title: "算法练习题",
    name: "algorithmExercises",
    scope: ["admin", "teacher", "student"],
  },
  {
    index: "99",
    icon: "PieChart",
    title: "贡献者",
    name: "Contributors",
    scope: ["admin", "teacher", "student"], // 适用于所有权限
  },
])
// 管理员独有菜单树
// 拥有所有菜单选项
const adminMenuTree = ref([
  {
    index: "1",
    icon: "PieChart",
    title: "总览",
    name: "Home",
    scope: ["admin", "teacher", "student"], // 适用于所有权限
  },
  {
    index: "2",
    icon: "user",
    title: "用户管理",
    subMenu: [
      {
        subIndex: "2-1",
        subIcon: "admin",
        title: "管理员",
        name: "adminSelf",
        subScope: "admin",
      },
      {
        subIndex: "2-2",
        subIcon: "teacher",
        title: "教师管理",
        name: "teacherManagement",
        subScope: "admin",
      },
      {
        subIndex: "2-3",
        subIcon: "UserFilled",
        title: "学生管理",
        name: "studentManagement",
        subScope: ["admin", "teacher"],
      },
    ],
    scope: ["admin"],
  },
  {
    index: "3",
    icon: "Connection",
    title: "班级管理",
    name: "classRoomManagement",
    scope: ["admin"],
  },
  {
    index: "4",
    icon: "DataBoard",
    title: "学习空间",
    subMenu: [
      {
        subIndex: "4-1",
        subIcon: "Notebook",
        title: "作业",
        name: "homework",
        subScope: ["admin", "teacher", "student"],
      },
      {
        subIndex: "4-2",
        subIcon: "Tools",
        title: "实验任务",
        name: "experimentTaskManagement",
        subScope: ["admin", "teacher", "student"],
      },
      {
        subIndex: "4-3",
        subIcon: "UploadFilled",
        title: "资料共享",
        name: "fileShare",
        subScope: ["admin", "teacher", "student"],
      },
      {
        subIndex: "4-4",
        subIcon: "EditPen",
        title: "算法练习题",
        name: "algorithmExercises",
        subScope: ["admin", "teacher", "student"],
      },
    ],
    scope: ["admin", "teacher", "student"],
  },
  {
    index: "99",
    icon: "PieChart",
    title: "贡献者",
    name: "Contributors",
    scope: ["admin", "teacher", "student"], // 适用于所有权限
  },
])

// 依据当前用户身份，获取到对应的menuTree
menuStore.getMenuTreeByUserRole(
  userScope,
  adminMenuTree,
  teacherMenuTree,
  commonMenuTree
)

// 用于路由跳转
const clickMenu = item => {
    router.push({
      name: item.name,
      params: { courseid: 1 },
    })
  },
  // 用于页面刷新后保持侧边菜单对应项展开
  activePath = ref("")
activePath.value = router.currentRoute._value.meta.index
</script>

<template>
  <el-aside :width="useToCollapse.isCollapse ? '64px' : '180px'">
    <div
      class="menu-item"
      :class="{
        collapsed: useToCollapse.isCollapse,
        expanded: !useToCollapse.isCollapse,
      }"
    >
      <!--
      学校的名称以及logo仅能用于项目完成后，不能用于demo中，否则会违反备案！！！
      -->

      <div v-if="!useToCollapse.isCollapse">
        <img
          style="max-width: 180px; max-height: 55px"
          src="@/assets/logo.png"
          alt="Expanded Logo"
        />
      </div>
      <div v-else>
        <img
          style="width: 35px; max-height: 35px"
          src="@/assets/fav.png"
          alt="Collapsed Logo"
        />
      </div>


      <!-- 
        <div v-if="!useToCollapse.isCollapse">
        <img
          style="max-width: 180px; height: 55px"
          src="@/assets/demoLogo/vuejs.png"
          alt="Expanded Logo"
        />
      </div>
      <div v-else>
        <img
          style="width: 35px; max-height: 35px"
          src="@/assets/demoLogo/favicon.ico"
          alt="Collapsed Logo"
        />
      </div> -->
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="useToCollapse.isCollapse"
      :collapse-transition="true"
      :default-active="activePath"
    >
      <template v-for="item in menuStore.menuTree">
        <!--        如果不存在二级菜单，则运行下面的代码-->
        <!--        当subMenu不存在时，下方的v-if为真，运行-->
        <el-menu-item
          v-if="item.scope.includes(userScope) && !item.subMenu"
          :key="item.index"
          :index="item.index"
          @click="clickMenu(item)"
        >
          <component :is="item.icon" class="icons"></component>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
        <!--        如果为假，即存在二级菜单-->
        <!-- eslint-disable-next-line vue/valid-v-for -->
        <el-sub-menu v-else :index="item.index">
          <template #title>
            <!--            二级菜单的 图标与标题-->
            <component :is="item.icon" class="icons"></component>
            <span>{{ item.title }}</span>
          </template>

          <template v-for="subItem in item.subMenu">
            <el-menu-item
              v-if="subItem.subScope && subItem.subScope.includes(userScope)"
              :key="subItem.subIndex"
              :index="subItem.subIndex"
              @click="clickMenu(subItem)"
            >
              <!-- 二级菜单列表 -->
              <component :is="subItem.subIcon" class="icons"></component>
              <template #title>{{ subItem.title }}</template>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </el-aside>
</template>

<style scoped lang="less">
.icons {
  width: 16px;
  height: 16px;
}

// .icons.is-active {
//   color: #409eff;
// }

.centered {
  text-align: center;
}

/* 加过渡给侧边导航 */
.el-aside {
  transition: width 0.25s;
  -webkit-transition: width 0.25s;
  -moz-transition: width 0.25s;
  -o-transition: width 0.25s;
}

/* 加快侧边栏文字消失的速度 */
.el-menu {
  transition: all 0.01s; // 将10ms改为0.01s
  border-right: 0; // 去除右侧烦人的竖线
}

.menu-item {
  display: flex;
  justify-content: center;
  align-items: center;

  &.collapsed {
    margin-top: 22px;
  }

  &.expanded {
    margin-top: 24px;
  }
}

// logo距离顶部的边距
.el-menu-vertical-demo {
  margin-top: 22px;
}

.el-sub-menu.is-active {
  background-color: #d9ecff !important;
  /* 背景使用淡蓝色 */
  border-radius: 8px;

  span {
    color: #409eff;
  }

  .icons {
    // color: #409eff;
  }
}

.el-menu-item.is-active {
  position: relative;

  /* 设置相对定位 */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    /* 将竖线位置设置在右边 */
    width: 3px;
    /* 设置竖线宽度 */
    height: 100%;
    /* 设置竖线高度 */
    background-color: #409eff;
    /* 设置竖线颜色为蓝色 */
    border-radius: 2px;
    /* 设置竖线的圆角 */
  }

  background-color: #f5f7fa !important;
  color: #409eff;
  /* 字体颜色蓝色 */
  border-radius: 8px;
  /* 添加圆角 */
  overflow: hidden;
}

.el-menu-item {
  &:hover {
    background-color: #eeeeee;
    /* 鼠标悬停时的背景颜色为浅灰色 */
    border-radius: 8px;
    /* 添加圆角 */
  }
}
</style>
