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
        <component :is="useToCollapse.isCollapse ? 'Expand' : 'Fold'" />
      </div>
      <!-- 顶部LOGO -->
      <!-- 测试阶段，使用vuelogo代替学校logo -->
      <!-- 学校logo地址：src="@/assets/logo.png" -->
      <img
        style="max-width: 180px; max-height: 60px"
        src="@/assets/demoLogo/favicon.ico"
        v-if="props.isHomePgae"
      />
      <el-breadcrumb
        :separator-icon="ArrowRight"
        class="bread"
        v-if="!props.isHomePgae"
        id="breadcrumb"
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
      <div aria-label="toggle dark mode">
        <el-switch
          :style="{ marginRight: '10px' }"
          v-model="isDark"
          :active-action-icon="Moon"
          :inactive-action-icon="Sunny"
          active-color="#6b6d71"
          @click="toggleTheme"
        />
      </div>
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
import { useToggle } from "@vueuse/shared"
import { useDark } from "@vueuse/core"
import { Moon, Sunny } from "@element-plus/icons-vue"
const props = defineProps({
  isHomePgae: {
    type: Boolean,
    default: false,
  },
})
// localStorage.setItem('vueuse-color-scheme', 'light')
const useToCollapse = useSidebarStore()
let handleCollapse = () => {
  useToCollapse.toggleCollapse()
}

const router = useRouter()
const authStore = useAuthStore()
//登出函数
const handleLoginOut = () => {
  authStore.deleteToken()
  router.push("/login")
  ElNotification({
    title: "退出成功",
    message: "账号退出成功",
    duration: 2000,
  })
}

// 用于面包屑
const routers = computed(() => {
  // 过滤掉没有meta的
  return router.currentRoute.value.matched.filter(item => item.meta.title)
})

/* start——暗黑模式 */

let isDark = useDark({
  disableTransition: false,
  valueDark: "dark",
  valueLight: "light",
})

const toggleDark = useToggle(isDark)
const toggleTheme = event => {
  // 浏览器兼容性检查
  if (!document.startViewTransition) {
    isDark.value = !isDark.value
    toggleDark()
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  )

  const transition = document.startViewTransition(async () => {
    const root = document.documentElement
    root.classList.add(isDark.value ? "light" : "dark")
    root.classList.remove(isDark.value ? "dark" : "light")
    toggleDark()

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]

      document.documentElement.animate(
        {
          clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 400,
          easing: "ease-in",
          pseudoElement: isDark.value
            ? "::view-transition-old(root)"
            : "::view-transition-new(root)",
        }
      )
    })
  })
  isDark.value = !isDark.value
}

/* End——暗黑模式 */
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
  //background-image: radial-gradient(transparent 1px, #ffffff 1px);
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

/* 不被选中时的颜色 */
// .el-breadcrumb__inner.is-link {
//   color: #9b9b9b!important;
// }

/* 被选中时的颜色 */
:deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
  color: #35c03e;
  font-weight: 800;
}
</style>
