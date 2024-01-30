<template>
  <test-pass />
</template>

<script setup>
import { basicClassesStore } from "@/stores"
import { teacherJoinedClassStore } from "@/stores/classData"
import { useAuthStore } from "@/stores/tokenStore.js"
import testPass from "@/views/testPass.vue"
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
