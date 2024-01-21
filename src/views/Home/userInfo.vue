<script setup lang="ts">
import { checkToken, showUserInfo } from "@/api/index.js";
import { useAuthStore } from "@/stores/tokenStore.js";
import { computed, ref } from "vue";
import { onMounted } from "vue";

onMounted(() => {
  checkToken();
  getUserInfoData();
});

const useAuth = useAuthStore();
const userInfo = ref({ id: "", name: "", email: "", sex: "" });

const getUserInfoData = () => {
  userInfo.value = useAuth.userInfoArray;
  //console.log(userInfo.value);
};
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>个人中心</span>
        <el-button class="button" text>编辑</el-button>
      </div>
    </template>
    <el-descriptions :column="2" border>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <unicon name="adjust-circle" fill="royalblue"></unicon>
            用户ID
          </div>
        </template>
        {{ userInfo.id }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <unicon name="user" fill="royalblue"></unicon>
            用户名
          </div>
        </template>
        {{ userInfo.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <unicon name="envelope" fill="royalblue"></unicon>
            邮箱
          </div>
        </template>
        {{ userInfo.email }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <unicon name="mars" fill="royalblue"></unicon>
            性别
          </div>
        </template>
        {{ userInfo.sex }}
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<style scoped>
.cell-item {
  display: flex;
  align-items: center;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 500px;
}
</style>
