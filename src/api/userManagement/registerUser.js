/**
 * @file  registerUser.js
 * @author ljf13
 * @description 用于注册用户
 * @date 2024/1/19
 */
import service from "@/utils/axios";
//@ 学生注册
export function regStu(
  name,
  password,
  email,
  realName,
  userSchoollD,
  schoolCode,
  studentClass,
  sex,
) {
  return service.post("/register", {
    name: name,
    password: password,
    email: email,
    realName: realName,
    userSchoollD: userSchoollD,
    schoolCode: schoolCode,
    class: studentClass,
    sex: sex,
  });
}

// 管理员注册教师
export function regTeacher(name, email, realName, password, sex) {
  return service.post("/authrequired/admin/teacher/new", {
    name: name,
    email: email,
    realName: realName,
    password: password,
    sex: sex,
  });
}





