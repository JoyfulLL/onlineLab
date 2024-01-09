<script setup>
import {ref} from 'vue'
import {useSidebarStore} from '@/stores/index'
import {useRouter} from "vue-router";

const useToCollapse = useSidebarStore()

const menuItems = ref([
  {
    index: '1',
    icon: 'PieChart',
    title: '总览',
    name:'Home'
  },
  {
    index: '2',
    icon: 'user',
    title: '用户管理',
    subMenu: [
      {subIndex: '2-2', subIcon: 'teacher', title: '教师管理',name:'teacherManagement'},
      {subIndex: '2-3', subIcon: 'admin', title: '管理员',name:'adminSelf'}
    ]
  },
  {
    index: '3',
    icon: 'DataBoard',
    title: '班级管理',
    subMenu: [
      {subIndex: '3-1', subIcon: 'Notebook', title: '作业',name:'homework'},
      {subIndex: '3-2', subIcon: 'Tools', title: '实验任务',name:'experimentTaskManagement'},
      {subIndex: '3-3', subIcon: 'UploadFilled', title: '资料共享',name:'fileShare'},
      {subIndex: '3-4', subIcon: 'UserFilled', title: '学生管理',name:'studentManagement'},
      {subIndex: '3-5', subIcon: 'EditPen', title: '算法练习题',name:'algorithmExercises'},
    ]
  },
]);


const router =useRouter();
const clickMenu = (item)=>{
  // console.log("点击了菜单")
  router.push({
    name:item.name,
  })
}

let handleCollapse = () => {
  useToCollapse.toggleCollapse()
}


</script>

<template>
  <el-aside :width="useToCollapse.isCollapse ? '65px' : '180px'">
    <el-menu
        class="el-menu-vertical-demo"
        :collapse="useToCollapse.isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse-transition="false"
    >
      <template v-for="(item, index) in menuItems">
        <el-menu-item :index="item.index" v-if="!item.subMenu" :key="item.index" @click="clickMenu(item)">
          <component class="icons" :is="item.icon"></component>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
        <el-sub-menu :index="item.index" v-else :key="item.index" >
          <template #title>
            <!--            第一级菜单-->
            <component class="icons" :is="item.icon"></component>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item v-for="(subItem, subIndex) in item.subMenu" :index="subItem.subIndex" :key="subItem.subIndex" @click="clickMenu(subItem)">
            <!--            二级菜单列表-->
            <component class="icons" :is="subItem.subIcon"></component>
            <template #title>{{ subItem.title }}</template>
          </el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
<!--    <div @click="handleCollapse" :class="{ 'centered': useToCollapse.isCollapse }">-->
<!--      <component class="icons" :is="useToCollapse.isCollapse ? 'ArrowRight' : 'ArrowLeft'"></component>-->
<!--    </div>-->
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
</style>