/**
 * @file  removeUser.js
 * @author ljf13
 * @description 待后端开发移除功能
 * @date 2024/1/19
 */

import service from "@/utils/axios"

// 教师拥有将学生批量移出班级的功能，管理员没有
export function removeStudentFromClass(studentid, scope) {
  if (scope === "admin") {
    return service.delete("/authrequired/admin/student/class", {
      data: { studentid: studentid },
    })
  } else {
    return service.delete("/authrequired/teacher/class/students/leave", {
      data: { studentid: [studentid] },
    })
  }
}

// Administrator deletes specified student
export function deleteStudent(studentid) {
  return service.delete("/authrequired/admin/student", {
    data: { id: studentid },
  })
}

// Administrator deletes specified teacher
export function deleteTeacher(teacherid) {
  return service.delete("/authrequired/admin/teacher", {
    data: { id: teacherid },
  })
}
