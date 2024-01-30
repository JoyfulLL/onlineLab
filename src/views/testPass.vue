<script setup>
import axios from "axios"
import { onMounted, ref } from "vue"
onMounted(() => {
  updatePagedData()
})
const mockStulist = ref([])

const pageSize = ref(18)
const currentPage = ref(1)
const total = ref(1000)

const pagedData = ref([])

const handleSizeChange = val => {
  pageSize.value = val
  currentPage.value = 1
  updatePagedData()
}

const handleCurrentChange = val => {
  currentPage.value = val
  updatePagedData()
}

const updatePagedData = async () => {
  const response = await axios.get(
    "https://www.fastmock.site/mock/2a5ecbdc32432d0c06d1e08c6e250731/api/authrequired/admin/students"
  )
  mockStulist.value = response.data.data.mocklist
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  pagedData.value = mockStulist.value.slice(start, end)
}
</script>

<template>
  <el-table :data="pagedData" style="width: 100%">
    <el-table-column prop="id" label="ID"> </el-table-column>
    <el-table-column prop="class" label="Class"> </el-table-column>
    <el-table-column prop="email" label="Email"> </el-table-column>
    <el-table-column prop="name" label="Name"> </el-table-column>
    <el-table-column prop="realName" label="Real Name"> </el-table-column>
    <el-table-column prop="schoolCode" label="School Code"> </el-table-column>
  </el-table>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[10, 20, 30, 40]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  >
  </el-pagination>
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
