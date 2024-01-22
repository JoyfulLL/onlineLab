/**
 * @file  getUserData.js
 * @author ljf13
 * @description 用于获取用户的数据
 * @date 2024/1/19
 */
import service from "@/utils/axios";

// 根据用户权限选择API
// 教师只能获取自己班级的学生条目——待开发
// 管理员可以获取所有学生条目
export function getStuInfo(scope) {
  if (scope === "admin") {
    return service.get("/authrequired/admin/students/{action}");
  } else {
    return service.get("/authrequired/teacher/class/students/");
  }
}

// @获取所有教师信息
export function getTeachersInfo() {
  return service.get("/authrequired/admin/teachers/{action}");
}
