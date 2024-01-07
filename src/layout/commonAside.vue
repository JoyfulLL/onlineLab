<script setup lang="ts">
import {ref} from 'vue'
import {isTeleport} from "@vue/test-utils/dist/vnodeTransformers/util";
import {Burger} from "@element-plus/icons-vue";

const isCollapse = ref(true)

const menuItems = ref([
  {
    index: '1',
    icon: 'PieChart',
    title: '总览'
  },
  {
    index: '2',
    icon: 'user',
    title: '用户管理',
    subMenu: [
      {subIndex: '2-2', subIcon: 'teacher', title: '教师管理'},
      {subIndex: '2-3', subIcon: 'admin', title: '管理员'}
    ]
  },
  {
    index: '3',
    icon: 'DataBoard',
    title: '班级管理',
    subMenu: [
      {subIndex: '3-1', subIcon: 'Notebook', title: '作业'},
      {subIndex: '3-2', subIcon: 'EditPen', title: '算法练习题'},
      {subIndex: '3-3', subIcon: 'Tools', title: '实验任务'},
      {subIndex: '3-4', subIcon: 'UploadFilled', title: '资料共享'},
      {subIndex: '3-5', subIcon: 'UserFilled', title: '学生管理'}
    ]
  }
]);

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};

const collapseList = ref(
    [
      {
        index: '1',
        icon: 'ArrowLeft',
      },
      {
        index: '2',
        icon: 'ArrowRight'
      }
    ]
)

// const noChildren=()=>{
//   return list.filter((item)=>!item.children);
// };
//
// const hasChildren = () => {
//   return list.filter((item) => item.children);
// };

</script>

<template>
  <el-aside width="180px">
    <el-menu class="el-menu-vertical-demo" :collapse="isCollapse">
      <template v-for="(item, index) in menuItems">
        <el-menu-item :index="item.index" v-if="!item.subMenu" :key="item.index">
          <component class="icons" :is="item.icon"></component>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
        <el-sub-menu :index="item.index" v-else :key="item.index">
          <template #title>
            <!--            第一级菜单-->
            <component class="icons" :is="item.icon"></component>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item v-for="(subItem, subIndex) in item.subMenu" :index="subItem.index" :key="subItem.subIndex">
            <!--            二级菜单列表-->
            <component class="icons" :is="subItem.subIcon"></component>
            <template #title>{{ subItem.title }}</template>
          </el-menu-item>
        </el-sub-menu>
      </template>
      <div @click="toggleCollapse" :class="{ 'centered': !isCollapse }">
        <component class="icons" :is="isCollapse ? 'ArrowLeft' : 'ArrowRight'"></component>
      </div>
    </el-menu>
  </el-aside>
</template>

<style>
.icons {
  width: 16px;
  height: 16px;
}

.centered {
  text-align: center;
}
</style>