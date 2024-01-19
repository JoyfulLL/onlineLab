/**
 * @file  getUserData.js
 * @author ljf13
 * @description 用于获取用户的数据
 * @date 2024/1/19
 */
import service from "@/utils/axios";

// @获取所有学生信息
// action：查询过滤器，如果没有默认查询所以信息
export function getStuInfo() {
  return service.get("/authrequired/admin/students/{action}");
}
// @获取所有教师信息
export function getTeachersInfo() {
  return service.get("/authrequired/admin/teachers/{action}");
}
