<template>
  <el-header>
    <div class="l-content">
      <!-- 图标的展示 -->
      <div size="small" plain @click="handleCollapse" :class="useToCollapse.isCollapse" style="width: 25px; border-radius: 5px; border: 1px solid black;">
        <component class="icons" :is="useToCollapse.isCollapse ? 'ArrowRight' : 'ArrowLeft'"></component>
      </div>

      <el-breadcrumb separator=">" class="bread">
        <!-- 首页是一定存在的所以直接写死 -->
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLoginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <button @click="handleLoginOut">退出登录</button>
  </el-header>
</template>


<script setup>
import {useSidebarStore} from "@/stores";
import {useAuthStore} from "@/stores/tokenStore"
import {useRouter} from "vue-router";

const useToCollapse = useSidebarStore()
let handleCollapse = () => {
  useToCollapse.toggleCollapse()
}

const router =useRouter();
const authStore = useAuthStore();
//登出函数
const handleLoginOut = () => {
  authStore.deleteToken();
  router.push('/login');
};

</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #a0cfff;
}
.r-content {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
  h3 {
    color: #fff;
  }
}
// .bread /deep/ span {
//   color: #fff !important;
//   cursor: pointer !important;
// }
:deep(.bread span) {
  color: #fff !important;
  cursor: pointer !important;
}
</style>




