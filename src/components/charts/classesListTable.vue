<script setup>
/**
 * @file  classesListTable.vue
 * @author ljf13
 * @description 班级列表组件
 * @可以传递keyword来检索对应的班级
 * @date 2024/1/22
 * classesList用于父组件传递Object列表
 */
import { adminAddStudentToClass } from "@/api/classManagement/admin/index.js"
import {
  addStudentsToClass,
  teacherJoinClass,
  teacherLeaveClass,
} from "@/api/classManagement/teacher/index.js"
import { basicClassesStore } from "@/stores"
import { teacherJoinedClassStore } from "@/stores/classData.js"
import { useAuthStore } from "@/stores/tokenStore"
import { ElMessage, ElTableColumn } from "element-plus"
import { defineProps, inject, ref } from "vue"

// 所有班级
const useAllClassInfoList = basicClassesStore()
// 教师加入的班级
const useClassList = teacherJoinedClassStore()
const reload = inject("reload")

/**
 * 参数传递说明
 * keyword：搜索用的关键词，需要搜索功能才需要传递
 * classList：班级列表——可以传递不同的班级列表
 * customStyle：自定义样式用
 * useMultipleSelection：是否使用多选框，默认否
 * showOperation：是否需要对表格进行操作，默认否
 * showLeaveButton：是否需要使用“离开班级”按钮，默认否
 * isUserInfo：当前页面是否为个人主页，默认为否
 * studensId：学生id列表，教师用于批量添加学生至班级
 * studentID：单个学生的id
 * canAddStudens：决定“添加学生”按钮能否使用
 */
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
  isUserInfo: {
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
  canAddStudens: {
    type: Boolean,
    default: false,
  },
})

const useScope = useAuthStore()
// 读取当前用户的scope角色并存储
const userScope = useScope.getScope() //获取到的scope

//单选
const currentRow = ref()
const classname = ref()
const selectClassid = ref()
const handelSingleSelection = val => {
  currentRow.value = val
  // console.log(currentRow.value)
  // console.log(currentRow.value.classname)
  classname.value = currentRow.value.classname
  selectClassid.value = currentRow.value.classid
}

// props.classesList
const filteredData = computed(() => {
  if (props.keyword && Array.isArray(props.classesList)) {
    const keywordWithoutSpaces = props.keyword.trim()
    return props.classesList.filter(classItem => {
      return (
        classItem &&
        classItem.classname &&
        classItem.classname
          .toLowerCase()
          .includes(keywordWithoutSpaces.toLowerCase())
      )
    })
  } else {
    return props.classesList
  }
})

// 教师自己加入班级
const onSubMitTeacherJoinClass = async () => {
  ElMessageBox.confirm("确定要加入班级吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await teacherJoinClass(classname.value).then(res => {
        if (res.data.status === 0) {
          //状态码为0，提交成功，关闭当前对话框
          reload()
          useAllClassInfoList.storeClassesList()
          ElMessage({
            message: "加入班级成功",
            type: "success",
          })
        }
      })
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消加入",
      })
    })
}

// 教师将学生加入班级
const onSubmitStuToClass = async () => {
  ElMessageBox.confirm("确定要将学生加入班级吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      if (userScope === "admin") {
        await adminAddStudentToClass(props.studentID, classname.value).then(
          res => {
            if (res.data.status === 0) {
              //状态码为0，提交成功，关闭当前对话框
              reload()
              ElMessage({
                message: "操作成功",
                type: "success",
              })
            }
          }
        )
      } else {
        await addStudentsToClass(props.studensId, classname.value).then(res => {
          if (res.data.status === 0) {
            //状态码为0，提交成功，关闭当前对话框
            reload()
            ElMessage({
              message: "操作成功",
              type: "success",
            })
          }
        })
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消操作",
      })
    })
}

//教师退出班级
const onSubmitTeacherLeaveClass = async () => {
  ElMessageBox.confirm("确定要退出班级吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await teacherLeaveClass(classname.value).then(res => {
        if (res.data.status === 0) {
          reload()
          ElMessage({
            message: "成功退出班级",
            type: "success",
          })
        }
      })
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消退出",
      })
    })
}
</script>

<template>
  <div class="class-table" :style="customStyle">
    <el-table
      :data="filteredData"
      style="width: auto"
      highlight-current-row
      border
      max-height="280px"
      :margin-top="props.marginTop"
      @current-change="handelSingleSelection"
    >
      <el-table-column prop="classid" label="班级ID" width="70" />
      <el-table-column prop="classname" label="班级名称" width="180" />
      <el-table-column prop="teachername" label="教师姓名" width="150" />
      <el-table-column prop="teacherid" label="教师ID" width="180" />
      <el-table-column label="操作" v-if="props.showLeaveButton">
        <template #default="scope">
          <el-button
            type="danger"
            size="default"
            :disabled="scope.row.classid !== selectClassid"
            @click="onSubmitTeacherLeaveClass()"
          >
            退出此班级
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" v-if="props.showOperation">
        <template #default="scope">
          <el-button
            type="success"
            size="default"
            :disabled="scope.row.classid !== selectClassid"
            @click="onSubMitTeacherJoinClass()"
          >
            教师加入班级
          </el-button>
          <el-button
            v-if="!props.isUserInfo"
            type="primary"
            size="default"
            @click="onSubmitStuToClass"
            :disabled="
              scope.row.classid !== selectClassid && props.canAddStudens
            "
          >
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
