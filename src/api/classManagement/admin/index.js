/**
 * @fileName index.js
 * @description 管理员管理班级的API接口
 * @author LJF
 * @date 2024/01/25 21:22
 */
import service from "@/utils/axios.js"

// Add user to class
export function adminAddStudentToClass(studentid, classname) {
  return service.post("/authrequired/admin/student/class/new", {
    studentid: studentid,
    classname: classname,
  })
}

export function adminAddTeacherToClass(teacherid, classname) {
  return (
    service.post("/authrequired/admin/teacher/class/new"),
    {
      teacherid: teacherid,
      classname: classname,
    }
  )
}

// admin use to creating a new class
export function adminCreatANewClass(classname) {
  return service.post("/authrequired/admin/class/new", { classname: classname })
}
// admin used to show specific class's students
export function adminShowClassStudents(classname) {
  return service.post("/authrequired/admin/class/students", {
    classname: classname,
  })
}
// admin used to show the teacher of a given class
export function adminShowTeacherOfClass(classid) {
  return service.post("/authrequired/admin/class/teachers", {
    classid: classid,
  })
}

// The administrator lists all the students of the designated teacher
export function adminShowTeacherClassStudents(teacherid) {
  return service.post("/authrequired/admin/teacher/students", {
    teacherid: teacherid,
  })
}

// The administrator modifies the student's class
export function adminModifiesStuClass(studentid, classname) {
  return service.patch("/authrequired/admin/student/class", {
    studentid: studentid,
    classname: classname,
  })
}

// The administrator delete class
export function adminDeleteClass(classname) {
  return service.delete("/authrequired/admin/student/class", {
    classname: classname,
  })
}

// The administrator removed the teacher from the class
export function adminRemoveTeacherFromClass(teacherid, classname) {
  return service.delete("/authrequired/admin/teacher/class", {
    teacherid: teacherid,
    classname: classname,
  })
}

// The administrator removed the student from the class was defined
// /src/api/userManagemant/removeUser.js
// export function adminRemoveStuFromClass() {}
