<template>
  <el-card class="card-container">
    <el-button
      @click="toggleViewMode"
      type="primary"
      style="margin-bottom: 15px;"
      >切换视图</el-button
    >
    <el-row :gutter="20" v-if="isCardView">
      <el-col
        :xs="24"
        :sm="12"
        :md="6"
        v-for="course in courses"
        :key="course.courseid"
      >
        <router-link
          :to="'/courseroom/' + course.courseid + '/home'"
          target="_blank"
        >
          <el-card
            :body-style="{ padding: '0px' }"
            style="margin-bottom: 20px;"
          >
            <img src="../assets/img/courseDefault.jpg" class="image" />
            <div style="padding: 14px">
              <span>{{ course.title }}</span>
              <div class="bottom">教师姓名：{{ course.teachername }}</div>
              <div class="bottom">
                {{ course.description }}
              </div>
            </div>
          </el-card>
        </router-link>
      </el-col>
    </el-row>

    <el-table v-else :data="courses" border>
      <el-table-column prop="title" label="课程名" width="200" />
      <el-table-column prop="teachername" label="教师姓名" width="200" />
      <el-table-column prop="membersCount" label="人数" width="220" />
      <el-table-column prop="description" label="描述" width="220">
        <template #default="scope">
          <router-link
            :to="'/courseroom/' + scope.row.courseid + '/home'"
            target="_blank"
            >{{ scope.row.description }}</router-link
          >
        </template>
      </el-table-column>
      <!-- 其他表格列 -->
    </el-table>
  </el-card>
</template>

<script setup>
const props = defineProps({
  courses: {
    type: Array,
    required: true,
  },
})
// const courseid = ref(props.courses.courseid)
// console.log(courseid)
const isCardView = ref(true)

const toggleViewMode = () => {
  isCardView.value = !isCardView.value // 切换展示模式
}
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: row;
  margin-top: 13px;
  margin-right: 10px;
  margin-left: 10px;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.image {
  width: 100%;
  display: block;
}

.grid-container {
  display: flex;
  flex-wrap: wrap;
}

.grid-item {
  flex: 0 0 200px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
}
</style>
