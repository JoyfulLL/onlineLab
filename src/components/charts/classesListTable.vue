<script setup>
/**
 * @file  classesListTable.vue
 * @author ljf13
 * @description 班级列表组件
 * @可以传递keyword来检索对应的班级
 * @date 2024/1/22
 * classesList用于父组件传递Object列表
 */
import { ref, defineProps, inject } from 'vue'
import { teacherJoinedClassStore } from '@/stores/classData.js'
import { ElMessage, ElNotification, ElTableColumn } from 'element-plus'
import { addStudentsToClass, teacherJoinClass, teacherLeaveClass } from '@/api/classManagement/teacher/index.js'
import { errorMessages } from '@/utils/errorMessagesCode'
import { useAuthStore } from '@/stores/tokenStore'
import { adminAddStudentToClass } from '@/api/classManagement/admin/index.js'

const useClassList = teacherJoinedClassStore()
const reload = inject('reload')
const props = defineProps({
  keyword: {
    type: String,
  },
  classesList: {
    type: Object,
    default: () => ({}),
  },
  customStyle: {
    type: Object,
    default: () => ({}),
  },
  useMultipleSelection: {
    type: Boolean,
    default: false,
  },
  showOperation: {
    type: Boolean,
    default: false,
  },
  showLeaveButton: {
    type: Boolean,
    default: false,
  },
  studensId: {
    type: Array,
    default: [],
  },
  studentID: {
    type: Number,
  },
})

const useScope = useAuthStore()
// 读取当前用户的scope角色并存储
const userScope = useScope.getScope() //获取到的scope

// 多选
const multipleSelection = ref([])
const isAnyStudentSelected = ref(false)
const selectStudents = ref([])
const classname = ref()
// 多选框
const handleSelectionChange = (val) => {
  multipleSelection.value = val
  selectStudents.value = multipleSelection.value
  classname.value = selectStudents.value.map((student) => student.classname).join(', ')
  console.log(classname.value)
  isAnyStudentSelected.value = selectStudents.value.length > 0
}

// props.classesList
const filteredData = computed(() => {
  if (props.keyword && Array.isArray(props.classesList)) {
    const keywordWithoutSpaces = props.keyword.trim()
    return props.classesList.filter((classItem) => {
      return (
        classItem &&
        classItem.classname &&
        classItem.classname.toLowerCase().includes(keywordWithoutSpaces.toLowerCase())
      )
    })
  } else {
    return props.classesList
  }
})

// 教师自己加入班级
const onSubMitTeacherJoinClass = async () => {
  console.log('教师加入班级按钮点击')
  await teacherJoinClass(classname.value)
    .then((res) => {
      if (res.data.status === 0) {
        //状态码为0，提交成功，关闭当前对话框
        reload()
        ElMessage({
          message: '加入班级成功',
          type: 'success',
        })
      }
    })
}

// 教师将学生加入班级
const onSubmitStuToClass = async () => {
  console.log('加入学生进班级按钮点击')
  if (userScope === 'admin') {
    await adminAddStudentToClass(props.studentID, classname.value).then((res) => {
      if (res.data.status === 0) {
        //状态码为0，提交成功，关闭当前对话框
        reload()
        ElMessage({
          message: '操作成功',
          type: 'success',
        })
      }
    })
  } else {
    await addStudentsToClass(props.studensId, classname.value).then((res) => {
      if (res.data.status === 0) {
        //状态码为0，提交成功，关闭当前对话框
        reload()
        ElMessage({
          message: '操作成功',
          type: 'success',
        })
      }
    })
  }
}

//教师退出班级
const onSubmitTeacherLeaveClass = async () => {
  await teacherLeaveClass(classname.value).then((res) => {
    if (res.data.status === 0) {
      //状态码为0，提交成功，关闭当前对话框
      reload()
      ElMessage({
        message: '成功退出班级',
        type: 'success',
      })
    }
  })
}
</script>

<template>
  <div class="class-table" :style="customStyle">
    <el-table :data="filteredData" style="width: auto" border max-height="280px" :margin-top="props.marginTop"
      @selection-change="handleSelectionChange">
      <el-table-column fixed type="selection" width="50" v-if="props.useMultipleSelection" />
      <el-table-column prop="classid" label="班级ID" width="70" />
      <el-table-column prop="classname" label="班级名称" width="180" />
      <el-table-column prop="teachername" label="教师姓名" width="150" />
      <el-table-column prop="teacherid" label="教师ID" width="180" />
      <el-table-column label="操作" v-if="props.showLeaveButton">
        <template #default="scope">
          <el-button type="danger" size="default" @click="onSubmitTeacherLeaveClass"> 退出此班级 </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" v-if="props.showOperation">
        <template #default="scope">
          <el-button type="primary" size="default" :disabled="!isAnyStudentSelected" @click="onSubMitTeacherJoinClass">
            教师加入班级
          </el-button>
          <el-button type="primary" size="default" @click="onSubmitStuToClass" :disabled="!isAnyStudentSelected">
            将学生移入班级
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped lang="less">
.class-table {
  //margin-top: 30px;
  position: relative;
  height: auto;
  border-radius: 10px; // 添加圆角
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); // 添加阴影
  overflow: hidden; // 防止遮挡样式

  .pager {
    position: absolute;
    right: 0;
    bottom: 20px;
  }

  .table-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
    margin-top: 5px;
    margin-left: 5px;
  }
}
</style>
