import {defineStore} from "pinia"

export const useMenuStore = defineStore({
  id: "menu",
  state: () => ({
    menuTree: [], // 初始为空，将在后续设置中更新
  }),
  actions: {
    setMenuTree(menuTree) {
      this.menuTree = menuTree
    },
    // 依据用户角色返回对应菜单，二级菜单在下面判断
    getMenuTreeByUserRole(
      userScope,
      adminMenuTree,
      teacherMenuTree,
      commonMenuTree
    ) {
      if (userScope === "admin") {
        this.setMenuTree(adminMenuTree.value)
      } else if (userScope === "teacher") {
        this.setMenuTree(teacherMenuTree.value)
      } else {
        this.setMenuTree(commonMenuTree.value)
      }
    },
  },
})

export const useElMenuActiveStore = defineStore("elMenuActive", () => {
  const elMenuActive = ref("")

  return {elMenuActive}
})
