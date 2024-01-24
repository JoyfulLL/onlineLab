/**
 * @file  index.js
 * @author ljf13
 * @description
 * @date 2024/1/24
 */
import service from "@/utils/axios";

// 教师离开班级
export function teacherLeaveClass(className){
    return service.delete("/authrequired/teacher/class/leave",{data:{classname: className}})
}

export function teacherJoinClass(className){
    return service.post("/authrequired/teacher/class/join",{classname: className})
}

// 教师添加学生到指定班级
export function addStudentsToClass(studentId , className){
    return service.post("/authrequired/teacher/class/students/join", {
        studentid : studentId ,
        classname: className
    })
}

// 教师依据信息检索，获得指定学生的信息
export function teacherGetStudentInfo(params) {
    return service.post("/authrequired/teacher/student",  params );
}