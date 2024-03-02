<script setup>
/**
 * @此页面数据表的增删查改功能已完成
 * @file  studentManagement
 * @author ljf13
 * @description 用于学生管理——展示学生信息，注册新学生，修改学生信息
 * @date 2024/1/8
 @@@ 代码结构
 数据段data 建议新增数据都放在新增的方法前面
 @避免出现无法找到数据的错误
 方法段method

 @当前已有功能：✔获取所有学生信息，✔新增学生，✔修改指定学生信息，
 @待做功能：
 @ 1、✔将指定学生移出班级
 @ 2、依据信息获取对应的学生
 @ 3、✔页面的数据用pinia做状态管理，实现数据无感更新
 */
import {
  deleteStudent,
  removeStudentFromClass,
} from "@/api/userManagement/removeUser"
import addStudentsFromClass from "@/components/addStudentsFromClass.vue"
import studentRegistration from "@/components/auth/studentRegistration.vue"
import { basicClassesStore } from "@/stores"
import { teacherJoinedClassStore } from "@/stores/classData"
import { useAuthStore } from "@/stores/tokenStore"
import { useTableDataStore } from "@/stores/userData/storeUserData"
import { errorMessages } from "@/utils/errorMessagesCode"

// @界面初始化，校验token合法后，再获取用户数据
onMounted(() => {
  fetchData()
  fetchClassList()
  calculateDialogWidth() // 初始化计算一次
  window.addEventListener("resize", calculateDialogWidth) // 监听窗口大小变化，实时更新宽度
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", calculateDialogWidth) // 移除窗口大小变化的事件监听器
})

// @注入APP.vue提供的刷新方法
// @用于在新增用户/编辑用户后刷新表格
const reload = inject("reload"),
  loading = ref(true)
// @注册信息的表单
let userForm = reactive({
  id: "",
  name: "",
  email: "",
  realName: "",
  userSchoollD: "",
  schoolCode: "",
  class: "",
  sex: "",
})
const useScope = useAuthStore(),
  // 读取当前用户的scope角色并存储
  userScope = useScope.getScope(), // 获取到的scope
  studentDataTable = useTableDataStore(),
  useAllClassInfoList = basicClassesStore(),
  useClassList = teacherJoinedClassStore(),
  fetchClassList = () => {
    if (userScope === "teacher") {
      useClassList.storeTeacherList()
    }
    // console.log(useClassList.teacherClassList)
  }

/**
 *
 * @param {*} classData
 */
function processClassData(classData) {
  return Object.keys(classData).map(classid => ({
    classid: classData[classid].classid,
    classname: classData[classid].classname,
    teacherid: classData[classid].teacherid,
  }))
}

// 创建ref
const filtersClassData = ref(processClassData(useAllClassInfoList.classList)),
  // 创建computed
  classFilters = computed(() => {
    return filtersClassData.value.map(item => ({
      text: item.classname,
      value: item.classname,
    }))
  }),
  // 根据班级筛选出学生
  filterClasses = (value, row) => {
    return row.class === value
  },
  // 数据获取
  fetchData = async () => {
    await studentDataTable.showStuInfo()
    /**
     * When the data starts to load, loading is displayed
     * and the loading animation ends after the loading is completed.
     */
    // Loading should be closed asynchronously
    loading.value = false

    // 数据获取完成后，可以执行其他操作或访问Store中的数据
    //console.log(studentDataTable.stuList.map(student => student?.name))
  },
  // @以下代码用于 学生管理
  // @添加学生按钮——仅用于展示会话框
  // @编辑学生按钮——展示会话框以及获取到的表单数据
  // @表单信息的提交动作（注册学生，修改学生）都在handleSubmit

  // 用于编辑学生
  dialogVisibleEditStudent = ref(false),
  // 用于右上角添加学生
  dialogVisibleSearchStu = ref(false),
  // 用于查看学生
  dialogVisibleViewStu = ref(false),
  // @显示密码框与否 编辑模式没有密码框
  showPassword = ref(),
  MyEditAction = ref("edit"),
  // @用于在编辑模式禁用相关选项的修改
  // @目前除了realName，email，class外，全都禁用
  IsDisabled = ref(false),
  // @关闭会话框
  handleClose = done => {
    ElMessageBox.confirm("确定关闭？")
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
  },
  // 此函数仅用于调出会话框，并不是用于提交表单
  // 提交表单的函数为handleSubmit
  // 用于调出添加学生的界面
  addStudent = async () => {
    dialogVisibleSearchStu.value = true
  },
  // @用于”编辑按钮“，函数实际用途为查看用户信息
  // @将用户信息显示在表单中
  // 老师只能查看，不能编辑，管理员可以编辑
  editStudent = row => {
    dialogVisibleEditStudent.value = true
    userForm = { ...row }
    showPassword.value = false
    IsDisabled.value = false
  },
  viewStudent = row => {
    dialogVisibleViewStu.value = true
    userForm = { ...row }
    showPassword.value = false
    IsDisabled.value = true
  },
  handleButtonClick = row => {
    if (userScope === "admin") {
      editStudent(row)
    } else {
      viewStudent(row)
    }
  },
  // 用于编辑成功后，关闭会话框并且刷新界面
  closeEditDialog = value => {
    dialogVisibleEditStudent.value = value
    reload()
  },
  // @以下代码用于分页
  // 页面显示数据量 默认为20条
  pageSize = ref(20),
  // 当前页面，默认为1
  currentPage = ref(1)

// 用于更换页面
function changePage(page) {
  currentPage.value = page
}
const totalData = ref(studentDataTable.studentsDataCount)

// 用于更换页大小
function handleSizeChange(val) {
  pageSize.value = val // 更新每页显示个数
  currentPage.value = 1 // 切换每页显示个数时，回到第一页
}

// 多选
const multipleSelection = ref([]),
  isAnyStudentSelected = ref(false),
  selectStudents = ref([]),
  // 多选框
  handleSelectionChange = val => {
    multipleSelection.value = val
    selectStudents.value = multipleSelection.value
    isAnyStudentSelected.value = selectStudents.value.length > 0
  },
  // 一键移出班级 即批量
  removeSelectedStudents = async () => {
    if (selectStudents.value.length === 0) {
      return // 如果没有选中的学生，直接返回
    }
    const student = selectStudents.value.pop() // 从选中的学生数组中取出最后一个学生
    try {
      await removeStudentFromClass(student.id, userScope) // 删除这个学生
      if (selectStudents.value.length > 0) {
        // 如果还有选中的学生，继续递归删除下一个学生
        await removeSelectedStudents()
      } else {
        reload() // 如果所有学生都被删除了，进行页面刷新
        ElMessage({
          message: "批量移出成功",
          type: "success",
        })
      }
    } catch (e) {
      let errorMessage = "失败"
      if (e.response && e.response.data && e.response.data.status) {
        errorMessage = errorMessages[e.response.data.status] || "未知错误"
      } else {
        errorMessage = "未知错误"
      }
      ElNotification({
        title: "错误",
        message: errorMessage,
        type: "error",
        duration: 3500,
      })
    }
  },
  // use to remove students from class
  handleRemoveClick = () => {
    ElMessageBox.confirm("确定要移出所选学生的班级", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "error",
    })
      .then(async () => {
        await removeSelectedStudents()
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消",
        })
      })
  },
  // 将一个学生移出班级的按钮方法
  removeFromClass = async row => {
    const { id } = row
    ElMessageBox.confirm("确定将所选学生移出班级吗？", "Warning", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        await removeStudentFromClass(id, userScope).then(() => {
          ElMessage({
            message: "移出成功",
            type: "success",
          })
        })
        reload()
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消",
        })
      })
  },
  // for administrator to delete stundent
  handleDelete = row => {
    ElMessageBox.confirm(
      "确定要永久删除此学生吗？注意此操作不可逆！！！",
      "警告",
      {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "error",
      }
    )
      .then(async () => {
        await deleteStudent(row.id).then(() => {
          reload()
          ElMessage({
            message: "删除成功",
            type: "success",
            duration: 3500,
          })
        })
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消",
        })
      })
  }
// Used for search function
const queryInfo = ref(""),
  // The data traversed by the form is the data that can be divided and retrieved
  filteredData = ref(
    computed(() => {
      const query = queryInfo.value.toLowerCase().trim()
      let filtered = studentDataTable.stuList
      if (query) {
        filtered = filtered.filter(item => {
          return (
            (item?.name &&
              typeof item.name === "string" &&
              item.name.toLowerCase().includes(query)) ||
            (item?.realName &&
              typeof item.realName === "string" &&
              item.realName.toLowerCase().includes(query)) ||
            (item?.class &&
              typeof item.class === "string" &&
              item.class.toLowerCase().includes(query))
          )
        })
        totalData.value = Math.ceil(filtered.length / pageSize.value)
      } else {
        totalData.value = studentDataTable.studentsDataCount // 恢复原始总页数
      }
      // 当用户检索完成后，将当前页码重置为1
      if (query && currentPage.value !== 1) {
        currentPage.value = 1
      }

      const startIndex = (currentPage.value - 1) * pageSize.value,
        endIndex = startIndex + pageSize.value
      return filtered.slice(startIndex, endIndex)
    })
  )
// Used to control the width of the conversation box
const state = reactive({
  dialogWidth: "", // 存储对话框宽度
})
const calculateDialogWidth = () => {
  const deviceWidth = window.innerWidth // 获取窗口宽度
  let width

  // 根据设备宽度设置对话框宽度
  if (deviceWidth <= 500) {
    width = "60%"
  } else {
    width = "40%"
  }

  state.dialogWidth = width // 更新对话框宽度
}
</script>

<template>
  <div class="user-header">
    <el-form :inline="true">
      <el-form-item>
        <!--      移出班级的 按钮-->
        <el-button
          type="danger"
          size="default"
          :disabled="!isAnyStudentSelected"
          @click="handleRemoveClick"
        >
          批量移出班级
        </el-button>
      </el-form-item>
    </el-form>

    <!--    老师：用于搜索学生 并且将学生拉入班级-->
    <el-dialog
      v-model="dialogVisibleSearchStu"
      :before-close="handleClose"
      align-center
    >
      <add-students-from-class />
    </el-dialog>
    <!--    用于老师查看学生的信息 教师无权限编辑-->
    <el-dialog
      v-model="dialogVisibleViewStu"
      title="查看学生"
      :width="state.dialogWidth"
      :before-close="handleClose"
      draggable
    >
      <!-- 查看学生信息用-->
      <student-registration
        :show-password="false"
        :is-disabled="true"
        :user-data="userForm"
      />
    </el-dialog>

    <!--    用于管理员编辑学生信息-->
    <el-dialog
      v-model="dialogVisibleEditStudent"
      align-center
      title="编辑学生"
      :width="state.dialogWidth"
      :before-close="handleClose"
      draggable
    >
      <student-registration
        :show-password="false"
        :user-data="userForm"
        :action="MyEditAction"
        @edit-success="closeEditDialog"
      />
    </el-dialog>

    <!--    搜索框-->
    <el-form :inline="true">
      <el-form-item>
        <el-input
          v-model="queryInfo"
          class="w-50 m-2"
          placeholder="搜索学生姓名/班级"
          clearable
        >
          <template #prefix>
            <el-icon class="el-input__icon">
              <unicon name="search" fill="royalblue"></unicon>
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addStudent()">+添加学生</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table
      v-loading="loading"
      :data="filteredData"
      style="width: 100%"
      border
      stripe
      max-height="650"
      element-loading-text="数据加载中"
      @selection-change="handleSelectionChange"
    >
      <el-table-column fixed type="selection" width="50" />
      <el-table-column fixed prop="userSchoollD" label="学号" width="180" />
      <el-table-column prop="realName" label="姓名" width="150" />
      <el-table-column
        prop="class"
        label="班级"
        width="150"
        :filters="classFilters"
        :filter-method="filterClasses"
        filter-placement="bottom-end"
      >
        <template #default="scope">
          {{ scope.row && scope.row.class ? scope.row.class : "" }}
        </template>
      </el-table-column>
      <el-table-column prop="schoolCode" label="学校" width="180" />
      <el-table-column prop="name" label="用户名" width="auto" />
      <el-table-column prop="email" label="邮箱" width="auto" />
      <el-table-column prop="sex" label="性别" width="55" />
      <el-table-column fixed="right" label="操作" min-width="100">
        <template #default="scope">
          <el-button size="default" @click="handleButtonClick(scope.row)">
            {{ userScope === "admin" ? "编辑" : "查看" }}
          </el-button>
          <el-button
            type="danger"
            size="default"
            @click="removeFromClass(scope.row)"
            >移出班级
          </el-button>
          <el-button
            v-if="userScope === 'admin'"
            type="danger"
            size="default"
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 分页 -->
  <el-pagination
    :page-size="pageSize"
    :page-sizes="[20, 30, 50, 100, 200]"
    background
    default
    layout="total,prev, pager, next, sizes"
    :total="totalData"
    @current-change="changePage"
    @size-change="handleSizeChange"
  />
</template>

<style scoped lang="less">
\ .button-container {
  text-align: center;

  .el-button {
    margin: 0 10px;
  }
}

.table {
  position: relative;
  height: auto;
  border-radius: 10px; // 添加圆角
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); // 添加阴影
  overflow: hidden; // 防止遮挡样式
  @media (max-width: 768px) {
    // 在小于等于768px的设备上，表格宽度为100%
    height: 1080px; // 在小于等于768px的设备上，表格高度为自动
  }

  .pager {
    position: absolute;
    right: 0;
    bottom: -20px;
  }
}

.user-header {
  display: flex;
  justify-content: space-between;

  .el-button {
    margin-right: 5px; // 调整右侧间距为5px
  }
}

.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px; // 调整上边距
}
</style>
