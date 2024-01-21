/**
 * @file  removeUser.js
 * @author ljf13
 * @description 待后端开发移除功能
 * @date 2024/1/19
 */

import service from "@/utils/axios";

export function removeStudentFromClass(studentid) {
  return service.delete("/authrequired/admin/student/class", {
    data: { studentid: studentid },
  });
}
