/**
 * @file  storeUserData
 * @author ljf13
 * @description
 * @重要说明
 * @如果教师加入了一个空的班级，后端返回的学生数据中
 * @students数组为null且排在最前面，即classes[0]的位置
 * @则每刷新一次界面，学生的数量就会翻一倍。
 * @如果空数组在其他位置则无影响
 * @date 2024/1/11
 */
import { defineStore } from "pinia"
import { openDB } from "idb"
import {
  getStuInfo,
  getTeachersInfo,
} from "@/api/userManagement/getUserData.js"
import { useAuthStore } from "@/stores/tokenStore"

export const useTableDataStore = defineStore("TableData", {
  state: () => ({
    studentsDataCount: 0,
    stuList: [],
    teachersDataCount: 0,
    teachersList: [],
  }),
  getters: {},
  actions: {
    async showStuInfo() {
      const useScope = useAuthStore()
      const userScope = useScope.getScope()
      const res = await getStuInfo(userScope)

      if (userScope === "teacher") {
        let students = []
        res.data.data.classes.forEach(classItem => {
          students = students.concat(classItem.students)
        })
        this.stuList = students
        this.studentsDataCount = this.stuList.length
      } else {
        this.stuList = res.data.data
        this.studentsDataCount = this.stuList.length
      }

      // 存储到 IndexedDB
      try {
        const db = await openDB("UserManagement", 1, {
          upgrade(db) {
            db.createObjectStore("students", {
              keyPath: "id",
            })
          },
        })

        const tx = db.transaction("students", "readwrite")
        const store = tx.objectStore("students")

        // 检查是否已经存在数据
        const existingData = await store.getAll()
        if (!existingData.length) {
          // 将新数据存储到 IndexedDB
          for (const item of this.stuList) {
            // 确保存储的对象是可以序列化的
            const serializableItem = { ...item }

            try {
              await store.add(serializableItem)
            } catch (error) {
              console.error("Failed ", error)
            }
          }

          console.log("Data stored successfully in IndexedDB!")
        } else {
          console.log("Data already exists in IndexedDB.")
        }

        await tx.done
      } catch (error) {
        console.error("Failed  IndexedDB:", error)
      }
    },
    async showTeachersInfo() {
      const res = await getTeachersInfo()
      this.teachersList = res.data.data
      this.teachersDataCount = this.teachersList.length
    },
  },
  //   persist: {
  //     enable: false,
  //   },
})
