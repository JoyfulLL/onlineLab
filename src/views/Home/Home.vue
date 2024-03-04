<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { basicClassesStore } from "@/stores"
import { teacherJoinedClassStore } from "@/stores/classData"
import { useAuthStore } from "@/stores/tokenStore.js"
const useClassList = teacherJoinedClassStore(),
  useScope = useAuthStore(),
  userScope = useScope.getScope(),
  classesStore = basicClassesStore()
onMounted(() => {
  fetchAllClassInfo()
  if (userScope === "teacher") {
    useClassList.storeTeacherList()
  }
})

const fetchAllClassInfo = () => {
  classesStore.storeClassesList(useScope.data.scope)
}
</script>

<template>
  <div class="demo-progress">
    <el-progress type="circle" :percentage="0" />
    <el-progress type="circle" :percentage="28" />
    <el-progress type="circle" :percentage="100" status="success" />
    <el-progress type="circle" :percentage="70" status="warning" />
    <el-progress type="circle" :percentage="50" status="exception" />
  </div>
  待开发... ...
</template>

<style scoped lang="less">
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 18px;
}

.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 500px;
}
</style>
