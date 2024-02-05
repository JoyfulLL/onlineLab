/**
 * @file  editUserInfo.js
 * @author ljf13
 * @description
 * @date 2024/1/19
 */
import service from "@/utils/axios"

export function EditPassword(url) {
  return function(id, name, newPassword) {
    return service.patch(url, {
      id: id,
      name: name,
      password: newPassword,
    })
  }
}

export function editTeacherInfo(
  id,
  name,
  email,
  realName,
  userSchoollD,
  schoolCode,
  studentClass,
  sex
) {
  return service.patch("/authrequired/admin/teacher", {
    id: id,
    name: name,
    email: email,
    realName: realName,
    userSchoollD: userSchoollD,
    schoolCode: schoolCode,
    class: studentClass,
    sex: sex,
  })
}

// @管理员修改指定学生信息
export function editStuInfo(
  id,
  name,
  email,
  realName,
  userSchoollD,
  schoolCode,
  studentClass,
  sex
) {
  return service.patch("/authrequired/admin/student", {
    id: id,
    name: name,
    email: email,
    realName: realName,
    userSchoollD: userSchoollD,
    schoolCode: schoolCode,
    class: studentClass,
    sex: sex,
  })
}

// 教师修改自己的信息
export function teacherEditUserInfo(email, schoolCode, sex) {
  return service.patch("/authrequired/teacher/", {
    email: email,
    schoolCode: schoolCode,
    sex: sex,
  })
}
// 学生修改自己的信息
export function stuEditUserInfo(email, userSchoollD, schoolCode, sex) {
  return service.patch("/authrequired/student/{action}", {
    email: email,
    userSchoollD: userSchoollD,
    schoolCode: schoolCode,
    sex: sex,
  })
}
