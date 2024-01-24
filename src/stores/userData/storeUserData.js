/**
 * @file  storeUserData
 * @author ljf13
 * @description
 * @重要说明
 * @如果教师加入了一个空的班级，后端返回的学生数据中
 * @students数组为null且排在最前面，即classes[0]的位置
 * @则每刷新一次界面，学生的数量就会翻一倍。
 * @如果空数组在其他位置则无影响
 * @date 2024/1/11
 */

import { defineStore } from "pinia";

import {
  getStuInfo,
  getTeachersInfo,
} from "@/api/userManagement/getUserData.js";
import { useAuthStore } from "@/stores/tokenStore";

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
      //this.stuList = [];
      const useScope = useAuthStore();
      // 读取当前用户的scope角色并存储
      const userScope = useScope.getScope(); //获取到的scope
      let res = await getStuInfo(userScope);
      if (userScope === "teacher") {
        // res.data.data.classes.forEach((classItem) => {
        //   if (classItem.students !== null) {
        //     this.stuList = this.stuList.concat(classItem.students);
        //   }
        // });
        // this.studentsDataCount = this.stuList.length;
        this.stuList = [].concat(...res.data.data.classes.map(classItem => classItem.students));
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
