<template>
  <div class="demo-progress">
    <el-progress type="circle" :percentage="0" />
    <el-progress type="circle" :percentage="28" />
    <el-progress type="circle" :percentage="100" status="success" />
    <el-progress type="circle" :percentage="70" status="warning" />
    <el-progress type="circle" :percentage="50" status="exception" />
  </div>
  <el-card class="box-card">
    <div class="demo-progress">
      <span>实验已完成</span>
      <el-progress :stroke-width="26" :percentage="70"> </el-progress>
      <span>作业完成量</span>
      <el-progress :stroke-width="24" :percentage="100" status="success">
      </el-progress>
      <span>算法练习次数</span>
      <el-progress :stroke-width="22" :percentage="80" status="warning">
      </el-progress>
      <el-progress :stroke-width="20" :percentage="50" status="exception" />
    </div>
  </el-card>
  <el-progress type="circle" :percentage="100" status="success">
    <template #default="{ percentage }">
      <span><el-button type="success" :icon="Check" circle/></span>
      <span class="percentage-label">出勤</span>
    </template>
  </el-progress>
  <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :timestamp="activity.timestamp"
    >
      {{ activity.content }}
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
import { basicClassesStore } from "@/stores"
import { teacherJoinedClassStore } from "@/stores/classData"
import { useAuthStore } from "@/stores/tokenStore.js"
import { onMounted } from "vue"
const useClassList = teacherJoinedClassStore()
const useScope = useAuthStore()
const userScope = useScope.getScope()
const classesStore = basicClassesStore()
onMounted(() => {
  fetchAllClassInfo()
  if (userScope === "teacher") {
    useClassList.storeTeacherList()
  } else {
  }
})

const fetchAllClassInfo = () => {
  classesStore.storeClassesList(useScope.data.scope)
}

const activities = [
  {
    content: "Event start",
    timestamp: "2018-04-15",
  },
  {
    content: "Approved",
    timestamp: "2018-04-13",
  },
  {
    content: "Success",
    timestamp: "2018-04-11",
  },
]
</script>

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
