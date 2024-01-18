import { defineStore } from "pinia";

export const useMenuStore = defineStore({
  id: "menu",
  state: () => ({
    menuTree: [], // 初始为空，将在后续设置中更新
  }),
  actions: {
    setMenuTree(menuTree) {
      this.menuTree = menuTree;
    },
    //依据用户角色返回对应菜单，二级菜单在下面判断
    getMenuTreeByUserRole(userRole, adminMenuTree, commonMenuTree) {
      if (userRole === "admin") {
        this.setMenuTree(adminMenuTree.value);
      } else {
        this.setMenuTree(commonMenuTree.value);
      }
    },
  },
});
