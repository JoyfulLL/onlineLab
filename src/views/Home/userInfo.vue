<script setup>
import { checkToken } from '@/api/index.js'
import { useAuthStore } from '@/stores/tokenStore.js'
import { computed, ref } from 'vue'
import { onMounted } from 'vue'
import classesList from '@/components/charts/classesListTable.vue'
import { teacherJoinedClassStore } from '@/stores/classData.js'

const useAuth = useAuthStore()
const userScope = useAuth.getScope()
const userInfo = ref({ id: '', name: '', email: '', sex: '' })
const useClassList = teacherJoinedClassStore()
onMounted(() => {
  checkToken()
  getUserInfoData()
  if (userScope === 'student') {
    console.log('userScope')
  } else {
    // 如果当前用户不是学生，获取老师加入的班级列表
    useClassList.storeTeacherList()
  }
})

const getUserInfoData = () => {
  userInfo.value = useAuth.userInfoArray
  //console.log(userInfo.value);
}
</script>

<template>
  <div class="card-container">
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
              <unicon name="medal" fill="royalblue"></unicon>
              班级
            </div>
          </template>
          {{ userInfo.class }}
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
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>当前加入的班级</span>
          <el-button class="button" text>编辑</el-button>
        </div>
      </template>
      <classes-list :classesList="useClassList.teacherClassList" :showLeaveButton="true" />
    </el-card>
  </div>
</template>

<style scoped>
.cell-item {
  display: flex;
  align-items: center;
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
  width: 100%;
  margin-right: 10px;
  /* 可以添加一些右侧间距 */
}
</style>
