import { defineStore } from 'pinia'

export const useSidebarStore = defineStore({
  id:"sidebar",
  state: () => ({
    //初始默认为false，即为展开状态
    isCollapse: false,
  }),
  actions: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
  },
})

