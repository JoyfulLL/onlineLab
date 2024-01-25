/**
* @fileName index.js 
* @description 管理员管理班级的API接口
* @author LJF
* @date 2024/01/25 21:22
*/
import service from "@/utils/axios.js";
export function adminAddStudentToClass(studentid ,classname){
    return service.post("/authrequired/admin/student/class/new",{studentid :studentid ,classname:classname});
}