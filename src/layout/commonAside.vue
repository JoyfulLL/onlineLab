<script setup>
import { onMounted, ref } from "vue";
import { useSidebarStore } from "@/stores/index";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/tokenStore";
import { useMenuStore } from "@/stores/menu";
import { ElCollapseTransition } from "element-plus";

const useScope = useAuthStore();
// 读取当前用户的scope角色并存储
const userScope = useScope.getScope(); //获取到的scope
//空菜单数组，用于存放需要遍历的菜单信息
const menuItems = ref([]);

onMounted(() => {});

const useToCollapse = useSidebarStore();
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
        subIndex: "2-2",
        subIcon: "teacher",
        title: "教师管理",
        name: "teacherManagement",
        subScope: "admin",
      },
      {
        subIndex: "2-3",
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
    title: "班级管理",
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

menuStore.getMenuTreeByUserRole(userScope, adminMenuTree, commonMenuTree);

const clickMenu = (item) => {
  router.push({
    name: item.name,
  });
};
</script>

<template>
  <el-aside :width="useToCollapse.isCollapse ? '65px' : '180px'">
    <div class="menu-item" :class="{ collapsed: useToCollapse.isCollapse }">
      <div v-if="!useToCollapse.isCollapse">
        <img style="width: 180px" src="@/assets/logo.png" alt="Expanded Logo" />
      </div>
      <div v-else>
        <img
          style="width: 35px; max-height: 36px"
          src="@/assets/favicon.ico"
          alt="Collapsed Logo"
        />
      </div>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="useToCollapse.isCollapse"
      :collapse-transition="false"
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
          <!--
          下面为二级菜单展开的列表
          依据官网的解释，v-if 比 v-for 的优先级更高。
          这意味着 v-if 的条件将无法访问到 v-for 作用域内定义的变量别名
          官网给出的解决方法为：在外新包装一层 <template> 再在其上使用 v-for 可以解决这个问题
          如果不使用下面的方法，浏览器将会报出错误，无法找到subScope这个变量
          @下面给出我一开始的错误代码
          <el-menu-item v-if="subItem.subScope && subItem.subScope.includes(userScope)"
                        v-for="subItem in item.subMenu"
          </el-menu-item>
          -->
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

.el-menu {
  border-right: none;

  h3 {
    line-height: 48px;
    color: #fff;
    text-align: center;
  }
}
.menu-item {
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    background-color: #467724;
  }

  &.collapsed img {
    background-color: transparent;
  }

  &.no-padding {
    padding: 0;
  }
}
</style>
