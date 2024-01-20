<script setup>
import { onMounted, ref, watch } from "vue";
import { useSidebarStore } from "@/stores/index";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/tokenStore";
import { useMenuStore } from "@/stores/menu";

const useScope = useAuthStore();
// 读取当前用户的scope角色并存储
const userScope = useScope.getScope(); //获取到的scope

onMounted(() => {});
// 侧边栏折叠
const useToCollapse = useSidebarStore();
// 菜单
const menuStore = useMenuStore();

const router = useRouter();

//一般用户菜单树——学生，老师
//无用户管理菜单
const commonMenuTree = ref([
  {
    index: "1",
    icon: "PieChart",
    title: "总览",
    name: "Home",
    scope: ["admin", "teacher", "student"], // 适用于所有权限
  },
  {
    index: "3",
    icon: "DataBoard",
    title: "学习空间",
    subMenu: [
      {
        subIndex: "3-1",
        subIcon: "Notebook",
        title: "作业",
        name: "homework",
        subScope: ["admin", "teacher", "student"],
      },
      {
        subIndex: "3-2",
        subIcon: "Tools",
        title: "实验任务",
        name: "experimentTaskManagement",
        subScope: ["admin", "teacher", "student"],
      },
      {
        subIndex: "3-3",
        subIcon: "UploadFilled",
        title: "资料共享",
        name: "fileShare",
        subScope: ["admin", "teacher", "student"],
      },
      {
        subIndex: "3-4",
        subIcon: "UserFilled",
        title: "学生管理",
        name: "studentManagement",
        subScope: ["admin", "teacher"],
      },
      {
        subIndex: "3-5",
        subIcon: "EditPen",
        title: "算法练习题",
        name: "algorithmExercises",
        subScope: ["admin", "teacher", "student"],
      },
    ],
    scope: ["admin", "teacher", "student"],
  },
]);

//管理员独有菜单树
//拥有所有菜单选项
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
        subIcon: "teacher",
        title: "教师管理",
        name: "teacherManagement",
        subScope: "admin",
      },
      {
        subIndex: "2-2",
        subIcon: "admin",
        title: "管理员",
        name: "adminSelf",
        subScope: "admin",
      },
    ],
    scope: ["admin"],
  },
  {
    index: "3",
    icon: "DataBoard",
    title: "学习空间",
    subMenu: [
      {
        subIndex: "3-1",
        subIcon: "Notebook",
        title: "作业",
        name: "homework",
        subScope: ["admin", "teacher", "student"],
      },
      {
        subIndex: "3-2",
        subIcon: "Tools",
        title: "实验任务",
        name: "experimentTaskManagement",
        subScope: ["admin", "teacher", "student"],
      },
      {
        subIndex: "3-3",
        subIcon: "UploadFilled",
        title: "资料共享",
        name: "fileShare",
        subScope: ["admin", "teacher", "student"],
      },
      {
        subIndex: "3-4",
        subIcon: "UserFilled",
        title: "学生管理",
        name: "studentManagement",
        subScope: ["admin", "teacher"],
      },
      {
        subIndex: "3-5",
        subIcon: "EditPen",
        title: "算法练习题",
        name: "algorithmExercises",
        subScope: ["admin", "teacher", "student"],
      },
    ],
    scope: ["admin", "teacher", "student"],
  },
]);

//依据当前用户身份，获取到对应的menuTree
menuStore.getMenuTreeByUserRole(userScope, adminMenuTree, commonMenuTree);

// 用于路由跳转
const clickMenu = (item) => {
  router.push({
    name: item.name,
  });
};

// 用于页面刷新后保持侧边菜单对应项展开
const activePath = ref("");
activePath.value = router.currentRoute._value.meta.index;
</script>

<template>
  <el-aside :width="useToCollapse.isCollapse ? '63px' : '180px'">
    <div
      class="menu-item"
      :class="{
        collapsed: useToCollapse.isCollapse,
        expanded: !useToCollapse.isCollapse,
      }"
    >
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
          :index="item.index"
          v-if="!item.subMenu && item.scope.includes(userScope)"
          :key="item.index"
          @click="clickMenu(item)"
        >
          <component class="icons" :is="item.icon"></component>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
        <!--        如果为假，即存在二级菜单-->
        <el-sub-menu :index="item.index" v-else>
          <template #title>
            <!--            二级菜单的 图标与标题-->
            <component class="icons" :is="item.icon"></component>
            <span>{{ item.title }}</span>
          </template>
          <template v-for="subItem in item.subMenu">
            <el-menu-item
              v-if="subItem.subScope && subItem.subScope.includes(userScope)"
              :index="subItem.subIndex"
              :key="subItem.subIndex"
              @click="clickMenu(subItem)"
            >
              <!-- 二级菜单列表 -->
              <component class="icons" :is="subItem.subIcon"></component>
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

.el-sub-menu.is-active {
  background-color: #d9ecff !important; /* 背景使用淡蓝色 */
  border-radius: 8px;
  span {
    color: #409eff;
  }
}

// logo距离顶部的边距
.el-menu-vertical-demo {
  margin-top: 22px;
}

.el-menu-item.is-active {
  position: relative; /* 设置相对定位 */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0; /* 将竖线位置设置在右边 */
    width: 3px; /* 设置竖线宽度 */
    height: 100%; /* 设置竖线高度 */
    background-color: #409eff; /* 设置竖线颜色为蓝色 */
    border-radius: 2px; /* 设置竖线的圆角 */
  }
  background-color: #f5f7fa !important;
  color: #409eff; /* 字体颜色蓝色 */
  border-radius: 8px; /* 添加圆角 */
  overflow: hidden;
}

.el-menu-item {
  &:hover {
    background-color: #eeeeee; /* 鼠标悬停时的背景颜色为浅灰色 */
    border-radius: 8px; /* 添加圆角 */
  }
}
</style>
