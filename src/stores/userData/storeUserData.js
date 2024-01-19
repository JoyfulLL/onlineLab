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
  getters: {
    //分页后的数据
    // paginatedStuList() {
    //   const startIndex = (this.pageNum - 1) * this.pageSize;
    //   const endIndex = startIndex + this.pageSize;
    //   return this.stuList.slice(startIndex, endIndex);
    // },
  },
  actions: {
    async showStuInfo() {
      let res = await getStuInfo();
      this.stuList = res.data.data;
      this.studentsDataCount = this.stuList.length;
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
