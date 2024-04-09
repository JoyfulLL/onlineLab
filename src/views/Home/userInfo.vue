<!-- eslint-disable import/no-unresolved -->
<!--
* @description This is the first page when user login
* @fileName userInfo.vue
* @author LJF
* @date 2024/02/05 14:06:44
!-->

<script setup>
import classesList from "@/components/charts/classesListTable.vue"
import { basicClassesStore } from "@/stores"
import { teacherJoinedClassStore } from "@/stores/classData.js"
import { useAuthStore } from "@/stores/tokenStore.js"
import { Edit } from "@element-plus/icons-vue"
import { checkToken } from "@/api/index.js"
import {
  stuEditUserInfo,
  teacherEditUserInfo,
} from "@/api/userManagement/editUserInfo.js"
import UserCenterSvg from "@/components/SvgOrIcon/CustomUserCenterSvg.vue"
import AsideMenuSvg from "@/components/SvgOrIcon/CustomAsideMenuSvg.vue"

const reload = inject("reload")
const useAuth = useAuthStore()
const userScope = useAuth.getScope()
const classesStore = basicClassesStore()
const userInfo = ref({
  id: "",
  name: "",
  email: "",
  sex: "",
  realName: "",
  schoolCode: "",
  userSchoollD: "",
  studentClass: "",
})
const useClassList = teacherJoinedClassStore()
onMounted(() => {
  checkToken()
  getUserInfoData()
  fetchAllClassInfo()
  if (userScope === "teacher") {
    useClassList.storeTeacherList()
  }
})
const loading = ref(true)

const initialUserInfo = ref([])
const getUserInfoData = () => {
  userInfo.value = useAuth.userInfoArray
  initialUserInfo.value = { ...userInfo.value }
  loading.value = false
}

const fetchAllClassInfo = () => {
  classesStore.storeClassesList(useAuth.data.scope)
}
/**
 * 教师用于加入班级
 */
const teacherJoinNewClassDia = ref(false)
const teacherJoinNewClass = () => {
  teacherJoinNewClassDia.value = true
}

// 搜索班级的关键字
const searchKeyword = ref("")
const useAllClassInfoList = basicClassesStore()
const handleClose = done => {
  ElMessageBox.confirm("确定关闭？")
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}


// edit user info {data function compute}
const editMode = ref(false)
const cancelEditMode = () => {
  editMode.value = false
}
// const toggleEditMode = () => {
//   editMode.value = !editMode.value
//   if (!editMode.value) {
//     if (isFormDirty.value) {
//       saveUserInfo()
//     }
//   }
//   console.log(initialUserInfo.value)
// }

const toggleEditMode = () => {
  editMode.value = !editMode.value
  if (!editMode.value) {
    if (JSON.stringify(userInfo) !== JSON.stringify(initialUserInfo)) {
      saveUserInfo()
    }
  }
}

const saveUserInfo = () => {
  ElMessageBox.confirm("确定保存修改的信息？", "Warning", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      const { email, userSchoollD, schoolCode, sex } = userInfo.value

      // Determine the appropriate API function based on the user's scope

      if (userScope === "teacher") {
        teacherEditUserInfo(email, schoolCode, sex)
          .then(reload())
          .catch(error => {
            console.error(error)
          })
      } else {
        stuEditUserInfo(email, userSchoollD, schoolCode, sex).then(reload())
      }

      ElMessage({
        type: "success",
        message: "修改成功",
      })
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消",
      })
    })
}
</script>

<template>
  <el-dialog
    v-model="teacherJoinNewClassDia"
    width="50%"
    :before-close="handleClose"
    class="search-container"
  >
    <div class="search-title">依据班级名称检索班级</div>
    <el-form-item>
      <el-input
        v-model="searchKeyword"
        class="search-input"
        :style="{ width: '200px' }"
        placeholder="搜索班级列表"
        clearable
      >
        <template #prefix>
          <el-icon class="el-input__icon">
            <unicon name="search" fill="royalblue"></unicon>
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <classes-list
      :keyword="searchKeyword"
      :classes-list="useAllClassInfoList.classList"
      :show-operation="true"
      :is-user-info="true"
    />
  </el-dialog>
  <div class="card-container">
    <div>
      <el-card v-loading="loading" class="box-card">
        <template #header>
          <div class="card-header">
            <span>个人信息</span>
            <el-button
              v-show="editMode"
              class="button"
              type="warning"
              @click="cancelEditMode"
            >
              取消
            </el-button>
            <el-button
              v-if="userScope !== 'admin'"
              class="button"
              type="primary"
              :icon="Edit"
              @click="toggleEditMode"
            >
              <template v-if="loading">
                <i class="el-icon-loading"></i> 正在提交...
              </template>
              <template v-else>
                {{ editMode ? "保存" : "编辑" }}
              </template>
            </el-button>
          </div>
        </template>
        <el-descriptions :column="2" border>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <UserCenterSvg icon-name="id" />
                用户ID
              </div>
            </template>
            {{ userInfo.id }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <UserCenterSvg icon-name="userName" />
                用户名
              </div>
            </template>
            {{ userInfo.name }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <UserCenterSvg icon-name="name" />
                姓名
              </div>
            </template>
            {{ userInfo.realName }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <UserCenterSvg icon-name="studentNum" />
                学号
              </div>
            </template>
            <template v-if="editMode">
              <el-input
                v-model="userInfo.userSchoollD"
                :disabled="!editMode || userScope === 'teacher'"
              ></el-input>
            </template>
            <template v-else>
              {{ userInfo.userSchoollD }}
            </template>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <UserCenterSvg icon-name="userClass" />
                班级
              </div>
            </template>
            {{ userInfo.class }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <UserCenterSvg icon-name="school" />
                学校
              </div>
            </template>
            <template v-if="editMode">
              <el-input
                v-model="userInfo.schoolCode"
                :disabled="!editMode"
              ></el-input>
            </template>
            <template v-else>
              {{ userInfo.schoolCode }}
            </template>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <UserCenterSvg icon-name="email" />
                邮箱
              </div>
            </template>
            <template v-if="editMode">
              <el-input
                v-model="userInfo.email"
                :disabled="!editMode"
              ></el-input>
            </template>
            <template v-else>
              {{ userInfo.email }}
            </template>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <UserCenterSvg icon-name="sex" />
                性别
              </div>
            </template>
            <template v-if="editMode">
              <el-input v-model="userInfo.sex" :disabled="!editMode"></el-input>
            </template>
            <template v-else>
              {{ userInfo.sex }}
            </template>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>
    <!--
      班级列表区域，管理员账号不需要显示，管理员可以在功能区进入班级管理
      学生仅能加入一个班级，因此也不需要显示
     -->
    <div v-if="userScope === 'teacher'">
      <el-card class="class-card">
        <template #header>
          <div class="card-header">
            <span>当前加入的班级</span>
            <el-button
              class="button"
              type="success"
              @click="teacherJoinNewClass"
              >加入班级</el-button
            >
          </div>
        </template>
        <classes-list
          :classes-list="useClassList.teacherClassList"
          :show-leave-button="true"
        />
      </el-card>
    </div>
    <!--
        根据平台的作用，功能管理区暂时不对教师开放
        教师管理学生以及班级，可以在对应的课程下管理
    -->
    <div>
      <el-card v-if="userScope === 'admin'" class="adminOperation">
        <template #header>
          <div class="card-header">
            <span>功能区</span>
          </div>
        </template>
        <div class="icon-container">
          <router-link class="icon-wrapper" to="/userManagement">
            <AsideMenuSvg icon-name="userManagement" />
            <span class="icon-label">用户管理</span>
          </router-link>
          <router-link class="icon-wrapper" to="/classRoomManagement">
            <AsideMenuSvg icon-name="classManagement" />
            <span class="icon-label">班级管理</span>
          </router-link>
          <div class="icon-wrapper">
            <AsideMenuSvg icon-name="CourseManagement"/>
            <span class="icon-label">课程管理</span>
          </div>
          <!-- 更多的功能 -->
        </div>
      </el-card>
    </div>
    <div>
      <!-- 底部的课程列表 -->
      <CourseList />
    </div>
  </div>
  <div class="footerCon">
    <el-link
      href="https://beian.miit.gov.cn/"
      target="_blank"
      type="default"
      class="footerLink"
      >粤ICP备2024184954号-1
    </el-link>
  </div>
</template>

<style scoped lang="less">
.footerCon {
  bottom: 5px;
  left: 0;
  width: 100%;
  background-color: transparent;
  padding: 10px 0;
  text-align: center;
}

.footerLink {
  text-align: center;
}
.search-container {
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.search-title {
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 20px;
  margin-left: 10px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.cell-item svg {
  vertical-align: middle;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card-container > div {
  width: 100%;
  margin-bottom: 20px;
}

@media (min-width: 1080px) {
  .card-container > div {
    width: 65%;
  }
}

.box-card {
  height: 100%;
}
.adminOperation {
  height: 100%;
}
.class-card {
  height: 100%;
}

@color-blue: royalblue;
@color-green: green;
@color-red: red;
@color-orange: orange;
@color-purple: purple;

.icon-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.icon-wrapper {
  flex-basis: calc(20% - 20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 2px solid royalblue;
  border-radius: 10px;
  padding: 10px;
  margin-right: 20px;
  margin-bottom: 20px;
}

.icon-wrapper .icon-label {
  margin-top: 10px;
}

.icon-wrapper:nth-child(1) {
  border-color: @color-blue;
}

.icon-wrapper:nth-child(2) {
  border-color: @color-green;
}

.icon-wrapper:nth-child(3) {
  border-color: @color-red;
}

.icon-wrapper:nth-child(4) {
  border-color: @color-orange;
}

.icon-wrapper:nth-child(5) {
  border-color: @color-purple;
}

/**
还可以往下定义更多的颜色
*/

@media screen and (max-width: 768px) {
  .icon-wrapper {
    flex-basis: calc(50% - 20px);
  }
}
</style>
