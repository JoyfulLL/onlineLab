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

//获取所有班级
export const basicClassesStore = defineStore({
  id: "classesList",
  state: () => ({
    classList: [],
  }),
  actions: {
    async storeClassesList() {
      try {
        const response = await service.get("/authrequired/classes");
        this.classList = response.data.data; // 将获取的班级列表存储在 classList 中
      } catch (error) {
        console.error("Failed to fetch class list:", error);
      }
    },
  },
  persist: {
    enable: true,
  },
});
