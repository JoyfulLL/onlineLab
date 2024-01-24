/**
 * @file  classData.js
 * @author ljf13
 * @description
 * @date 2024/1/22
 */

//用于教师获取已经加入的班级
import { defineStore } from "pinia";
import service from "@/utils/axios";

export const teacherJoinedClassStore = defineStore({
  id: "teacherJoinedClass",
  state: () => ({
    teacherClassList: [{}],
    classesName: [],
  }),
  actions: {
    async storeTeacherList(scope) {
      const res = await service.get("/authrequired/teacher/class");
      this.teacherClassList = res.data.data;
      this.classesName = this.teacherClassList.map((item) => item.classname);
    },
  },
  persist: true,
});
