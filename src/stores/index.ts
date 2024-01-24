import { defineStore } from "pinia";
import service from "@/utils/axios";
export const useSidebarStore = defineStore({
  id: "sidebar",
  state: () => ({
    //初始默认为false，即为展开状态
    isCollapse: false,
  }),
  actions: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
});



interface Class {
  classid: string;
  classname: string;
  teacherid: string;
}

//获取所有的班级，用于存储所有的班级信息
export const basicClassesStore = defineStore({
  id: "classesList",
  state: () => ({
    classList: [] as Class[],
  }),
  actions: {
    async storeClassesList(scope: string) {
      try {
        console.log(scope)
        const response = await service.get("/authrequired/classes");
        this.classList = response.data.data; // 将获取的班级列表存储在 classList 中
      } catch (error) {
        console.error("Failed to fetch class list:", error);
      }
    },
  },
  persist: true,
});

