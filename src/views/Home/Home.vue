<template>
  <div class="chart-container">Home 组件的页面</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import { checkToken } from "@/api";
import { basicClassesStore } from "@/stores";

import { useAuthStore } from "@/stores/tokenStore.js";
import { teacherJoinedClassStore } from "@/stores/classData";

const useClassList = teacherJoinedClassStore();
onMounted(() => {
  checkToken();
  fetchAllClassInfo();
  fetchClassInfoList()
});
const classesStore = basicClassesStore();
const useScope = useAuthStore();
const fetchAllClassInfo = () => {
  classesStore.storeClassesList(useScope.data.scope);
};

const fetchClassInfoList = ()=>{
  useClassList.storeTeacherList()
  // console.log(useClassList.teacherClassList)
}

</script>

<style scoped lang="less">
.chart-container {
  display: flex;
}

.box-card {
  flex: 1;
  margin-right: 20px;
  height: 400px;

  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>
