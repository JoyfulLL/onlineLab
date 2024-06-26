<script setup>
/**
 * @file  teacherManagement
 * @author ljf13
 * @description 用于教师管理
 * @date 2024/1/19
 */

import { editTeacherInfo } from "@/api/userManagement/editUserInfo.js"
import { deleteTeacher } from "@/api/userManagement/removeUser.js"
import { regTeacher } from "@/api/userManagement/registerUser.js"
import { useTableDataStore } from "@/stores/userData/storeUserData"
import { rules } from "@/utils/formRules.js"
import { ElMessage } from "element-plus"
import { inject, onMounted, reactive, ref } from "vue"

onMounted(() => {
  fetchData()
})

const teacherDataTable = useTableDataStore(),
  loading = ref(true),
  // Fetching data
  fetchData = async () => {
    teacherDataTable.showTeachersInfo()
    /**
     * When the data starts to load, loading is displayed
     * and the loading animation ends after the loading is completed.
     */
    loading.value = false
  },
  // @注册信息的表单
  userForm = reactive({
    id: "",
    name: "",
    password: "",
    email: "",
    realName: "",
    userSchoollD: "",
    schoolCode: "",
    class: "",
    sex: "",
  }),
  // 用于控制会话框显示
  dialogVisible = ref(false),
  // @用于判断当前动作
  // @区分当前是添加还是编辑
  action = ref("add"),
  // @显示密码框与否 编辑模式没有密码框
  showPassword = ref(),
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
  addTeacher = async () => {
    action.value = "add"
    dialogVisible.value = true
    // 清空表单信息
    // @因为先点击编辑按钮，查看的信息会遗留在当前的表单
    // @因为不懂更新DOM的方法（nextTick），所以只能先强制删除表单的信息
    // @删除的仅仅是显示的信息，不波及数据库
    for (const key in userForm) {
      delete userForm[key]
    }
    showPassword.value = true
    IsDisabled.value = false
  },
  // @用于”编辑按钮“，函数实际用途为查看用户信息
  // @将用户信息显示在表单中
  editTeacher = row => {
    action.value = "edit"
    dialogVisible.value = true
    // console.log(row)
    nextTick(() => {
      Object.assign(userForm, row)
    })
    showPassword.value = false
    IsDisabled.value = true
  },
  reload = inject("reload"),
  // @此函数用于提交表单
  // @判断动作的值，为add则调用新增用户接口
  // @否则调用的是修改用户的接口
  handleSubmit = async () => {
    if (action.value === "add") {
      await regTeacher(
        userForm.name,
        userForm.email,
        userForm.realName,
        userForm.password,
        userForm.sex
      ).then(res => {
        if (res.data.status === 0) {
          // 状态码为0，提交成功，关闭当前对话框
          dialogVisible.value = false
          reload()
          ElMessage({
            message: "用户添加完毕",
            type: "success",
          })
        }
      })
    } else {
      // @ 在此处调用修改学生参数的接口
      // console.log('用户名',(newUserForm.value.name))
      ElMessageBox.confirm("确定要修改吗？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonClass: "btnConfirm",
      })
        .then(async () => {
          await editTeacherInfo(
            userForm.id,
            userForm.name,
            userForm.email,
            userForm.realName,
            userForm.userSchoollD,
            userForm.schoolCode,
            userForm.class,
            userForm.sex
          ).then(res => {
            if (res.data.status == 0) {
              dialogVisible.value = false
              reload()
              ElMessage({
                message: "编辑成功",
                type: "success",
              })
            }
            // console.log(newUserForm.value.id);
          })
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消",
          })
        })
    }
  }
// for admin to delete teacher
const handleDeleteTeacher = row => {
  ElMessageBox.confirm(
    "确定要永久删除此教师吗？注意此操作不可逆！！！",
    "警告",
    {
      confirmButtonText: "确定删除",
      cancelButtonText: "取消操作",
      confirmButtonClass: "btnConfirm",
      type: "error",
    }
  )
    .then(async () => {
      await deleteTeacher(row.id).then(() => {
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

// @以下代码用于分页
// 页面显示数据量 默认为20条
const pageSize = ref(20)
// 当前页面，默认为1
const currentPage = ref(1)

// 用于更换页面
function changePage(page) {
  currentPage.value = page
  // console.log(currentPage.value);
}

// 用于更换页大小
function handleSizeChange(val) {
  pageSize.value = val // 更新每页显示个数
  currentPage.value = 1 // 切换每页显示个数时，回到第一页
}

/**
 * author: LJF
 * description: This function is used for implementing search functionality and pagination.
 * lastUpdated: 2024/3/10
 */
const queryInfo = ref("")
const totalData = ref(teacherDataTable.teachersDataCount)
const filteredData = ref(
  computed(() => {
    const query = queryInfo.value.toLowerCase().trim()
    let filtered = teacherDataTable.teachersList

    if (query) {
      filtered = filtered.filter(item => {
        /**
         * User can search the table by using these fields
         * "name"
         * "realName"
         * "class"
         */
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
      totalData.value = Math.ceil(filtered.length)
    } else {
      // If the query is empty, it also means the user cleared the input.
      totalData.value = teacherDataTable.teachersDataCount // 恢复原始总页数
    }
    // Calculate startIndex and endIndex based on currentPage and pageSize
    const startIndex = (currentPage.value - 1) * pageSize.value
    const endIndex = startIndex + pageSize.value
    return filtered.slice(startIndex, endIndex)
  })
)
</script>

<template>
  <div class="user-header">
    <!--    新增用户-->
    <el-button type="success" @click="addTeacher()">+注册教师</el-button>
    <el-dialog
      v-model="dialogVisible"
      :title="action == 'add' ? '添加教师' : '编辑教师'"
      width="30%"
      :before-close="handleClose"
    >
      <!--      教师注册组件表单-->
      <div class="form-container">
        <el-form
          :model="userForm"
          class="centered-form"
          label-width="80px"
          :rules="rules"
        >
          <el-form-item v-if="!showPassword" label="ID号" prop="id">
            <el-input v-model="userForm.id" :disabled="IsDisabled"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="name">
            <el-input v-model="userForm.name" :disabled="IsDisabled"></el-input>
          </el-form-item>
          <el-form-item v-if="showPassword" label="密码" prop="password">
            <el-input
              v-model="userForm.password"
              type="password"
              show-password
            />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userForm.email"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="realName">
            <el-input v-model="userForm.realName"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="userForm.sex" :disabled="IsDisabled">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <div class="button-container">
              <el-button type="primary" @click="handleSubmit('userForm')">
                {{ action == "add" ? "添加" : "确认修改" }}
              </el-button>
              <el-button @click="dialogVisible = false">取消</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!--    搜索框-->
    <el-form :inline="true">
      <el-form-item>
        <el-input
          v-model="queryInfo"
          class="w-50 m-2"
          placeholder="输入姓名"
          clearable
        >
          <template #prefix>
            <CustomUserCenterSvg icon-name="search" class="el-input__icon"/>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table
      v-loading="loading"
      :data="filteredData"
      style="width: 100%"
      border
      max-height="600"
      element-loading-text="数据加载中"
    >
      <el-table-column fixed prop="id" label="ID号" width="180" />
      <el-table-column prop="realName" label="姓名" width="120" />
      <!--      <el-table-column prop="class" label="班级" width="150" />-->
      <!--      <el-table-column prop="schoolCode" label="学校" width="180" />-->
      <el-table-column prop="name" label="用户名" width="auto" />
      <el-table-column prop="email" label="邮箱" width="auto" />
      <el-table-column prop="sex" label="性别" width="55" />
      <el-table-column fixed="right" label="操作" min-width="100">
        <template #default="scope">
          <el-button size="default" @click="editTeacher(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="default"
            @click="handleDeleteTeacher(scope.row)"
            >删除教师</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-pagination
    :page-size="pageSize"
    :page-sizes="[20, 50, 100]"
    background
    default
    layout="total,prev, pager, next, sizes"
    :total="totalData"
    @current-change="changePage"
    @size-change="handleSizeChange"
  />
</template>

<style scoped lang="less">
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.centered-form {
  width: 300px;
}

.button-container {
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

  .pager {
    position: absolute;
    right: 0;
    bottom: -20px;
  }
}

.user-header {
  display: flex;
  justify-content: space-between;
}

.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px; // 调整上边距
}

.btnConfirm {
  background: #fff;
  color: #67c23a;
}
</style>
