/**
 * @file  getUserData.js
 * @author ljf13
 * @description 用于获取用户的数据
 * @date 2024/1/19
 */
import {teacherJoinedClassStore} from "@/stores/classData.js"
import service from "@/utils/axios"

// 根据用户权限选择API
// 管理员可以获取所有学生条目
export function getStuInfo(scope) {
  const url = "/authrequired/teacher/class/students/",
   classesNames = teacherJoinedClassStore(),
   classNamesString = classesNames.classesName.join(","),
   fullUrl = `${url}${classNamesString}`
  if (scope === "admin") {
    return service.get("/authrequired/admin/students/{action}")
  } else {
    return service.get(fullUrl)
  }
}

// @获取所有教师信息
export function getTeachersInfo() {
  return service.get("/authrequired/admin/teachers/{action}")
}
