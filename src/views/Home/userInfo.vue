<script setup lang="ts">
import { showUserInfo } from "@/api/index.js";
import { useAuthStore } from "@/stores/tokenStore.js";
import { onMounted } from "vue";

onMounted(() => {
  getTeacherData();
});

const useScope = useAuthStore();
const getTeacherData = () => {
  showUserInfo(useScope).then((res) => {
    console.log(res.data);
  });
};

import { computed, ref } from "vue";
import {
  Iphone,
  Location,
  OfficeBuilding,
  Tickets,
  User,
} from "@element-plus/icons-vue";

const size = ref("");
const iconStyle = computed(() => {
  const marginMap = {
    large: "8px",
    default: "6px",
    small: "4px",
  };
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  };
});
const blockMargin = computed(() => {
  const marginMap = {
    large: "32px",
    default: "28px",
    small: "24px",
  };
  return {
    marginTop: marginMap[size.value] || marginMap.default,
  };
});
</script>

<template>
  <el-descriptions
    class="margin-top"
    title="个人中心"
    :column="3"
    :size="size"
    border
  >
    <template #extra>
      <el-button type="primary">Operation</el-button>
    </template>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <user />
          </el-icon>
          用户名
        </div>
      </template>
      那你
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <iphone />
          </el-icon>
          Telephone
        </div>
      </template>
      18100000000
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <tickets />
          </el-icon>
          Remarks
        </div>
      </template>
      <el-tag size="small">School</el-tag>
    </el-descriptions-item>
  </el-descriptions>
</template>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
</style>
