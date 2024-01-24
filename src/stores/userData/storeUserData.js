/**
 * @file  storeUserData
 * @author ljf13
 * @description
 * @date 2024/1/11
 */

import { defineStore } from "pinia";

import {
  getStuInfo,
  getTeachersInfo,
} from "@/api/userManagement/getUserData.js";
import { useAuthStore } from "@/stores/tokenStore";
// 定义学生存储库
// 数据字段说明
// studentsDataCount:数据总量
// pageNum:当前页面
// pageSize:每页最多显示多少条数据
// stuList：存放学生信息的数组

export const useTableDataStore = defineStore("TableData", {
  state: () => ({
    studentsDataCount: 0,
    stuList: [],
    teachersDataCount: 0,
    teachersList: [],
  }),
  getters: {},
  actions: {
    async showStuInfo() {
      this.stuList = [];
      const useScope = useAuthStore();
      // 读取当前用户的scope角色并存储
      const userScope = useScope.getScope(); //获取到的scope
      let res = await getStuInfo(userScope);
      //console.log(userScope)
      if (userScope === "teacher") {
        // res.data.data.classes.forEach(classItem => {
        //   if (classItem.students === null) {
        //     this.stuList.push({ class: classItem.classname });
        //   } else {
        //     this.stuList = this.stuList.concat(classItem.students);
        //   }
        // });
        res.data.data.classes.forEach((classItem) => {
          if (classItem.students !== null) {
            this.stuList = this.stuList.concat(classItem.students);
          }
        });
        this.studentsDataCount = this.stuList.length;
      } else {
        this.stuList = res.data.data;
        this.studentsDataCount = this.stuList.length;
      }
    },
    async showTeachersInfo() {
      let res = await getTeachersInfo();
      this.teachersList = res.data.data;
      this.teachersDataCount = this.teachersList.length;
    },
  },
  persist: {
    enable: true,
  },
});
