<template>
  <el-header>
    <div class="l-content">
      <!-- 图标的展示 -->
      <div
        class="icons"
        style="width: 30px; height: 30px"
        @click="handleCollapse"
      >
        <component
          :is="useToCollapse.isCollapse ? 'Expand' : 'Fold'"
        ></component>
      </div>

      <el-breadcrumb :separator-icon="ArrowRight" class="bread">
        <!-- 首页是一定存在的所以直接写死 -->
        <el-breadcrumb-item
          v-for="item in routers"
          :key="item.path"
          :to="{ path: item?.path }"
        >
          {{ item?.meta?.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-badge :value="1" class="item">
        <el-icon class="icon"><Bell /></el-icon>
      </el-badge>
      <el-dropdown>
        <el-avatar :icon="UserFilled" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-icon class="icon">
                <Setting />
              </el-icon>
              <span>个人中心</span>
            </el-dropdown-item>
            <el-dropdown-item @click="handleLoginOut">
              <el-icon class="icon" style="color: red">
                <SwitchButton />
              </el-icon>
              <span>退出账号</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import { useSidebarStore } from "@/stores";
import { useMenuStore } from "@/stores/menu";
import { useAuthStore } from "@/stores/tokenStore";
import { useRouter } from "vue-router";
import {
  ArrowRight,
  Setting,
  SwitchButton,
  User,
  UserFilled,
} from "@element-plus/icons-vue";

const useToCollapse = useSidebarStore();
let handleCollapse = () => {
  useToCollapse.toggleCollapse();
};
const menuStore = useMenuStore();
const router = useRouter();
const authStore = useAuthStore();
//登出函数
const handleLoginOut = () => {
  authStore.deleteToken();
  router.push("/login");
};
console.log(router.currentRoute.value.matched);
const routers = computed(() => {
  // 过滤掉没有meta的
  return router.currentRoute.value.matched.filter((item) => item.meta.title);
});
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #d4d7de;
}

.r-content {
  display: flex; // 使用Flexbox布局
  align-items: center; // 垂直居中对齐
  .el-badge {
    margin-right: 10px; // 设置el-badge的右边距
  }

  .el-dropdown {
    margin-left: 10px; // 设置el-dropdown的左边距
  }

  .icon {
    font-size: 24px; // 设置图标的大小
  }

  .el-avatar {
    outline: none; // 用于去除黑边框
  }
}

.l-content {
  color: #333333; // 设置文本颜色
  display: flex; // 使用Flexbox布局
  align-items: center; // 垂直居中对齐

  .icons {
    margin-right: 10px; // 设置右边距
    width: 30px;
    height: 30px;
  }

  .bread {
    margin-left: 10px; // 设置左边距
  }
}

// .bread /deep/ span {
//   color: #fff !important;
//   cursor: pointer !important;
// }
:deep(.bread span) {
  color: #000000 !important;
  cursor: pointer !important;
}
</style>
