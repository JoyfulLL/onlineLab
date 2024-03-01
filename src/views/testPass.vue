<script setup>
import axios from "axios"
import { onMounted, ref } from "vue"
onMounted(() => {
  updatePagedData()
})
const mockStulist = ref([]),
  pageSize = ref(18),
  currentPage = ref(1),
  handleSizeChange = val => {
    pageSize.value = val
    currentPage.value = 1
    updatePagedData()
  },
  handleCurrentChange = val => {
    currentPage.value = val
    updatePagedData()
  },
  updatePagedData = async () => {
    const response = await axios.get(
      "https://www.fastmock.site/mock/2a5ecbdc32432d0c06d1e08c6e250731/api/authrequired/admin/students"
    )
    mockStulist.value = response.data.data.mocklist
  }
</script>

<template>
  <el-table :data="mockStulist" style="width: 100%">
    <el-table-column prop="id" label="ID"> </el-table-column>
    <el-table-column prop="class" label="Class"> </el-table-column>
    <el-table-column prop="email" label="Email"> </el-table-column>
    <el-table-column prop="name" label="Name"> </el-table-column>
    <el-table-column prop="realName" label="Real Name"> </el-table-column>
    <el-table-column prop="schoolCode" label="School Code"> </el-table-column>
  </el-table>
</template>

<style scoped lang="less">
.course-container {
  margin: 0 px;
}
.box-card {
  width: auto;
  margin: 10px;
}
</style>
