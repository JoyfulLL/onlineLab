/**
 * @file  getUserData.js
 * @author ljf13
 * @description 用于获取用户的数据
 * @date 2024/1/19
 */
import service from "@/utils/axios";
import { teacherJoinedClassStore } from "@/stores/classData.js";

// 根据用户权限选择API
// 教师只能获取自己班级的学生条目——待开发
// 管理员可以获取所有学生条目
export function getStuInfo(scope) {
  const url = "/authrequired/teacher/class/students/";
  const classesNames = teacherJoinedClassStore();
  const classNamesString = classesNames.classesName.join(",");
  const fullUrl = `${url}${classNamesString}`;
  console.log(fullUrl)
  if (scope === "admin") {
    return service.get("/authrequired/admin/students/{action}");
  } else {
    return service.get(fullUrl);
  }
}

// @获取所有教师信息
export function getTeachersInfo() {
  return service.get("/authrequired/admin/teachers/{action}");
}

// 教师依据信息检索，获得指定学生的信息
export function teacherGetStudentInfo(params) {
  return service.post("/authrequired/teacher/student",  params );
}
