<template>
  <el-header>
    <div class="l-content">
      <!-- 图标的展示 -->
      <div
        class="icons"
        style="width: 30px; height: 30px"
        @click="handleCollapse"
        v-if="!props.isHomePgae"
      >
        <component
          :is="useToCollapse.isCollapse ? 'Expand' : 'Fold'"
        ></component>
      </div>
      <!-- 顶部LOGO -->
      <img
        style="max-width: 180px; max-height: 60px"
        src="@/assets/logo.png"
        v-if="props.isHomePgae"
      />
      <el-breadcrumb
        :separator-icon="ArrowRight"
        class="bread"
        v-if="!props.isHomePgae"
      >
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
        <el-icon class="icon">
          <Bell />
        </el-icon>
      </el-badge>
      <el-dropdown>
        <div>
          <unicon
            name="user-circle"
            fill="royalblue"
            width="33"
            height="33"
          ></unicon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <router-link to="/userInfo">
                <el-icon class="icon">
                  <Setting />
                </el-icon>
                <span>个人中心</span>
              </router-link>
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
import { useSidebarStore } from "@/stores"
import { useMenuStore } from "@/stores/menu"
import { useAuthStore } from "@/stores/tokenStore"
import { ArrowRight, Setting, SwitchButton } from "@element-plus/icons-vue"
import { useRouter } from "vue-router"

const props = defineProps({
  isHomePgae: {
    type: Boolean,
    default: false,
  },
})

const useToCollapse = useSidebarStore()
let handleCollapse = () => {
  useToCollapse.toggleCollapse()
}
const menuStore = useMenuStore()
const router = useRouter()
const authStore = useAuthStore()
//登出函数
const handleLoginOut = () => {
  authStore.deleteToken()
  router.push("/login")
}
// console.log(router.currentRoute.value.matched);
// 用于面包屑
const routers = computed(() => {
  // 过滤掉没有meta的
  return router.currentRoute.value.matched.filter(item => item.meta.title)
})
</script>

<style lang="less" scoped>
header {
  //background-color: #eae8e8;
  position: sticky;
  height: 60px;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  backdrop-filter: saturate(50%) blur(4px);
  background-image: radial-gradient(transparent 1px, #ffffff 1px);
  background-size: 4px 4px;
  border-bottom: 1px solid #ccc;
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

  div {
    outline: none; // 用于去除黑边框
    .large-icon {
      font-size: 50px;
    }
  }
}

.l-content {
  color: #333333; // 设置文本颜色
  display: flex; // 使用Flexbox布局
  align-items: center; // 垂直居中对齐

  .icons {
    cursor: pointer;
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
