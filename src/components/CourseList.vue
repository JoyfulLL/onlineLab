<script setup>
const props = defineProps({
  courses: {
    type: Array,
    required: true,
  },
}),
// const courseid = ref(props.courses.courseid)
// console.log(courseid)
 isCardView = ref(true),

 toggleViewMode = () => {
  isCardView.value = !isCardView.value // 切换展示模式
},

 activeName = ref("learning"),

 handleClick = (tab, event) => {
  console.log(tab, event)
}
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>我的课程</span>
        <el-button type="success">加入课程</el-button>
      </div>
    </template>

    <el-tabs
      v-model="activeName"
      type="card"
      class="demo-tabs"
      active-color="#409EFF"
      @tab-click="handleClick"
    >
      <el-button
        @click="toggleViewMode"
        type="primary"
        style="margin-bottom: 15px;"
        >切换视图</el-button
      >

      <el-tab-pane label="进行中" name="learning"
        ><el-row :gutter="20" v-if="isCardView">
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
          <el-table-column prop="title" label="课程名" width="200">
            <template #default="scope">
              <router-link
                :to="'/courseroom/' + scope.row.courseid + '/home'"
                target="_blank"
                >{{ scope.row.title }}</router-link
              >
            </template>
          </el-table-column>
          <el-table-column prop="teachername" label="教师姓名" width="200">
            <template #default="scope">
              <router-link
                :to="'/courseroom/' + scope.row.courseid + '/home'"
                target="_blank"
                >{{ scope.row.teachername }}</router-link
              >
            </template>
          </el-table-column>
          <el-table-column prop="membersCount" label="人数" width="220">
            <template #default="scope">
              <router-link
                :to="'/courseroom/' + scope.row.courseid + '/home'"
                target="_blank"
                >{{ scope.row.membersCount }}</router-link
              >
            </template>
          </el-table-column>
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
        </el-table></el-tab-pane
      >
      <el-tab-pane label="已结束" name="ended">
        <div class="empty-div">
          已经结束的课程列表
        </div>
      </el-tab-pane>

      <el-tab-pane label="收藏夹" name="favourites">
        <div class="empty-div">
          收藏的课程列表
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
}
.card-header span {
  font-size: large;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
  width: 100%;
  display: flex;
  flex-direction: row;
}
:deep(.el-tabs__item:hover) {
  color: #00177f;
}
:deep(.el-tabs__item.is-active) {
  color: #ffffff;
  background-color: #79bbff;
}
:deep(.el-tabs__active-bar) {
  background-color: #00177f;
}

.bottom {
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.image {
  width: 100%;
  display: block;
}

.grid-container {
  display: flex;
  flex-wrap: wrap;
}

.el-table {
  width: 100%;
}

.el-table__body-wrapper {
  overflow-x: auto;
}

.el-table__body {
  white-space: nowrap;
}

.empty-div {
  height: 500px; /* Set the desired height */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #555;
}
</style>
