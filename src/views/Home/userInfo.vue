<script setup>
import classesList from "@/components/charts/classesListTable.vue"
import { basicClassesStore } from "@/stores"
import { teacherJoinedClassStore } from "@/stores/classData.js"
import { useAuthStore } from "@/stores/tokenStore.js"
import { onMounted, ref } from "vue"

const useAuth = useAuthStore()
const userScope = useAuth.getScope()
const classesStore = basicClassesStore()
const userInfo = ref({ id: "", name: "", email: "", sex: "" })
const useClassList = teacherJoinedClassStore()
onMounted(() => {
  getUserInfoData()
  fetchAllClassInfo()
  if (userScope === "teacher") {
    useClassList.storeTeacherList()
  } else {
  }
})

const getUserInfoData = () => {
  userInfo.value = useAuth.userInfoArray
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
// 虚拟课程列表
const courses = ref([
  {
    courseid: 1,
    title: "计算机网络",
    description: "这是计算机网络",
    membersCount: 30,
    teachername: "张三",
  },
  {
    courseid: 2,
    title: "数据结构",
    description: "这是数据结构的描述",
    membersCount: 30,
    teachername: "里斯",
  },
  {
    courseid: 3,
    title: "高等数学1",
    description: "这是一个描述2",
    membersCount: 30,
    teachername: "芬奇",
  },
  {
    courseid: 4,
    title: "高等数学2",
    description: "这是一个描述2",
    membersCount: 30,
    teachername: "root",
  },
  {
    courseid: 5,
    title: "高等数学3",
    description: "这是一个描述3",
    membersCount: 30,
    teachername: "肖",
  },
])
</script>

<template>
  <el-dialog
    v-model="teacherJoinNewClassDia"
    width="50%"
    :beforeClose="handleClose"
    class="search-container"
  >
    <div class="search-title">依据班级名称检索班级</div>
    <el-form-item>
      <el-input
        class="search-input"
        :style="{ width: '200px' }"
        placeholder="搜索班级列表"
        clearable
        v-model="searchKeyword"
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
      :classesList="useAllClassInfoList.classList"
      :showOperation="true"
      :isUserInfo="true"
    />
  </el-dialog>
  <div class="card-container">
    <el-row class="card-row">
      <el-col>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
              <el-button class="button" text>编辑</el-button>
            </div>
          </template>
          <el-descriptions :column="2" border>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <unicon name="adjust-circle" fill="royalblue"></unicon>
                  用户ID
                </div>
              </template>
              {{ userInfo.id }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <unicon name="user" fill="royalblue"></unicon>
                  用户名
                </div>
              </template>
              {{ userInfo.name }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <unicon name="user-square" fill="royalblue"></unicon>
                  姓名
                </div>
              </template>
              {{ userInfo.realName }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <unicon name="info-circle" fill="royalblue"></unicon>
                  学号
                </div>
              </template>
              {{ userInfo.userSchoollD }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <unicon name="medal" fill="royalblue"></unicon>
                  班级
                </div>
              </template>
              {{ userInfo.class }}
            </el-descriptions-item>

            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <unicon name="book-open" fill="royalblue"></unicon>
                  学校
                </div>
              </template>
              {{ userInfo.schoolCode }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <unicon name="envelope" fill="royalblue"></unicon>
                  邮箱
                </div>
              </template>
              {{ userInfo.email }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <unicon name="mars" fill="royalblue"></unicon>
                  性别
                </div>
              </template>
              {{ userInfo.sex }}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
      <!-- 班级列表区域，管理员账号不需要显示，管理员可以在功能区进入班级管理 -->
      <el-col v-if="userScope !== 'admin'">
        <el-card class="class-card">
          <template #header>
            <div class="card-header">
              <span>当前加入的班级</span>
              <el-button
                class="button"
                type="primary"
                @click="teacherJoinNewClass"
                >加入班级</el-button
              >
            </div>
          </template>
          <classes-list
            :classesList="useClassList.teacherClassList"
            :showLeaveButton="true"
          />
        </el-card>
      </el-col>
      <!-- 
        根据平台的作用，功能管理区暂时不对教师开放
        教师管理学生以及班级，可以在对应的课程下管理 
      -->
      <el-col>
        <el-card class="adminOperation" v-if="userScope === 'admin'">
          <template #header>
            <div class="card-header">
              <span>功能区</span>
            </div>
          </template>
          <div class="icon-container">
            <router-link class="icon-wrapper" to="/userManagement">
              <unicon name="user" fill="royalblue"></unicon>
              <span class="icon-label">用户管理</span>
            </router-link>
            <router-link class="icon-wrapper" to="/classRoomManagement">
              <unicon name="book-reader" fill="royalblue"></unicon>
              <span class="icon-label">班级管理</span>
            </router-link>
            <div class="icon-wrapper">
              <unicon name="swatchbook" fill="royalblue"></unicon>
              <span class="icon-label">课程管理</span>
            </div>
            <!-- 更多的功能 -->
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <!-- 底部的课程列表 -->
  <CourseList :courses="courses" />
</template>

<style scoped lang="less">
@media (max-width: 767px) {
  .card-container {
    margin-top: 30px;
    .class-card {
      margin-top: 10px;
    }
  }
}

@media (min-width: 768px) and (max-width: 1199px) {
  .card-container {
    margin-top: 30px;
    .class-card {
      margin-top: 10px;
    }
  }
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
  justify-content: space-between;
}

.card-row {
  flex-wrap: wrap;
  margin: -10px;
}

.el-col {
  flex-basis: 100%;
  max-width: 100%;
  margin: 10px;
}

@media screen and (min-width: 768px) {
  .el-col {
    flex-basis: calc(50% - 20px);
    max-width: calc(50% - 20px);
  }
}

.box-card {
  width: 550px;
  height: 100%;
  margin-right: 10px;
  margin-left: 10px;
}
.adminOperation {
  margin-left: 20px;
  width: 500px;
  height: 100%;
}
.class-card {
  width: 768px;
  height: 100%;
  margin-right: 10px;
  margin-left: 10px;
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
