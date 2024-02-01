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
    <el-row :gutter="20">
      <el-col :span="24" :md="12" :lg="12">
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
      <el-col :span="24" :md="12" :lg="12">
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
    </el-row>
  </div>
  <CourseList :courses="courses" />
</template>

<style scoped>
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
  flex-direction: row;
}

.box-card {
  width: auto;
  height: 100%;
  margin-right: 10px;
  margin-left: 10px;
}
.class-card {
  width: 768px;
  height: 100%;
  margin-right: 10px;
  margin-left: 10px;
}
</style>
