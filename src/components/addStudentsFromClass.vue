<script setup lang="ts">
/**
 * @file  addStudentsFromClass.vue
 * @author ljf13
 * @description
 * @date 2024/1/23
 */
import { rules } from '@/utils/formRules.js'
import { ElMessage, ElNotification, ElMessageBox } from 'element-plus'
import { defineComponent, ref } from 'vue'
import { ElInput, ElButton, ElTable, ElTableColumn } from 'element-plus'
import { teacherGetStudentInfo } from '@/api/classManagement/teacher/index.js'
import { checkToken } from '@/api/index.js'
import classesList from '@/components/charts/classesListTable.vue'
import { basicClassesStore } from '@/stores'

interface FormData {
  queryRealname: string
  queryUserSchoollD: string
  name: string
  id: string
}

interface TableData {
  queryRealname: string
  queryUserSchoollD: string
  name: string
  id: string
}

const form = ref<FormData>({
  queryRealname: '',
  queryUserSchoollD: '',
  name: '',
  id: '',
})

const tableData = ref<TableData[]>([])

// 多选
const multipleSelection = ref([])
const isAnyStudentSelected = ref(false)
const selectStudents = ref([])
const toUseMultipleSelection = ref(true)
// 多选框
const ids = ref<number[]>([])
const studentID = ref<number>(0)
const handleSelectionChange = (val) => {
  multipleSelection.value = val
  selectStudents.value = multipleSelection.value
  ids.value = selectStudents.value.map((student) => student.id)
  //console.log(ids.value)
  if (ids.value.length === 1) {
    studentID.value = ids.value[0]
  }
  //console.log(studentID.value)
  isAnyStudentSelected.value = selectStudents.value.length > 0
}

// 搜索班级的关键字
const searchKeyword = ref('')
const useAllClassInfoList = basicClassesStore()
// 用于底部的班级列表的样式
const customStyle = ref({
  marginTop: '30px',
})
const search = () => {
  checkToken()
  // 发送信息给后端并处理返回的数据
  // 假设后端返回的数据是response
  // 将response赋值给tableData
  const params: {
    queryRealname?: string
    queryUserSchoollD?: string
    name?: string
    id?: number
  } = {}
  if (form.value.queryRealname) {
    params.queryRealname = form.value.queryRealname.trim()
  }
  if (form.value.queryUserSchoollD) {
    params.queryUserSchoollD = form.value.queryUserSchoollD.trim()
  }
  if (form.value.name) {
    params.name = form.value.name.trim()
  }
  if (form.value.id) {
    params.id = parseInt(form.value.id)
  }

  teacherGetStudentInfo(params)
    .then((res) => {
      //console.log(res);
      if (!res.data.data) {
        ElMessage.warning('没有数据')
      } else {
        const newTableData = res.data.data
        // 将新数据追加到旧数据后面
        tableData.value = [...newTableData, ...tableData.value]
        // 清空搜索框
        form.value.queryRealname = ''
        form.value.queryUserSchoollD = ''
        form.value.name = ''
        form.value.id = ''
      }
    })
    .catch((e) => {
      console.log(e)
    })
}
</script>

<template>
  <div class="search-container">
    <div class="search-title">检索学生 输入其中一项即可</div>
    <div class="search-box">
      <el-input v-model="form.queryRealname" placeholder="请输入姓名" class="search-input"></el-input>
      <el-input v-model="form.queryUserSchoollD" placeholder="请输入学号" class="search-input"></el-input>
      <el-input v-model="form.name" placeholder="请输入用户名" class="search-input"></el-input>
      <el-input v-model="form.id" placeholder="请输入用户ID" class="search-input"></el-input>
      <el-button type="primary" @click="search" class="search-button">搜索</el-button>
    </div>
    <el-table :data="tableData" border @selection-change="handleSelectionChange">
      <el-table-column fixed type="selection" width="50" />
      <el-table-column prop="realName" label="姓名"></el-table-column>
      <el-table-column prop="userSchoollD" label="学号"></el-table-column>
      <el-table-column prop="class" label="班级"></el-table-column>
      <el-table-column prop="id" label="用户ID"></el-table-column>
    </el-table>
  </div>

  <div class="search-container">
    <div class="search-title">依据班级名称检索班级</div>
    <el-form-item>
      <el-input
        class="search-input"
        :style="{ width: '200px' }"
        placeholder="搜索班级列表"
        clearable
        v-model="searchKeyword">
        <template #prefix>
          <el-icon class="el-input__icon">
            <unicon name="search" fill="royalblue"></unicon>
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <classes-list
      :keyword="searchKeyword"
      :classesList="useAllClassInfoList.classList"
      :customStyle="customStyle"
      :useMultipleSelection="toUseMultipleSelection"
      :studens-id="ids"
      :student-ID="studentID"
      :showOperation="true" />
  </div>
</template>

<style scoped lang="less">
.search-container {
  margin-bottom: 20px;
  border-radius: 10px; // 添加圆角
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); // 添加阴影
  overflow: hidden; // 防止遮挡样式
}

.search-title {
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 20px;
  margin-left: 10px;
}

.search-box {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  width: 200px;
  margin-left: 10px;
}

.search-button {
  margin-left: 10px;
}
</style>
