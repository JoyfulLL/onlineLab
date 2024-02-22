<!--
* @description 贡献者榜单
* @fileName ContributionList.vue
* @author LJF
* @date 2024/01/30 12:58:45
!-->
<script setup>
const frontendContributors = ref([
  {
    id: 1,
    name: "JoyfulLL",
    realName: "梁俊枫",
    linesOfCode: 13999,
    commits: 63,
    description: "前端负责人，所有前端",
  },
  {
    id: 2,
    realName: "陈雅婷",
    linesOfCode: 0,
    commits: 0,
    description: "/login 界面UI设计",
  },
])
const backendContributors = ref([
  {
    id: 4,
    name: "MeteorsLiu",
    realName: "郭浩蓝",
    linesOfCode: 6203,
    commits: 33,
    description: "项目负责人，后端负责人",
  },
  {
    id: 5,
    name: "xzzzjy",
    realName: "许君耀",
    linesOfCode: 273,
    commits: 1,
    description: "",
  },
  {
    id: 6,
    name: "Jaynxe",
    realName: "谢家勇",
    linesOfCode: 0,
    commits: 0,
    description: "",
  },
])
const getGitHubProfileLink = username => {
  return `https://github.com/${username}`
}
</script>

<template>
  <div class="contributor-container">
    <div class="contributor-section frontend-section">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span
              ><img
                src="../assets/img/contribution/vuejs-icon.svg"
                class="icon"
              />前端贡献者</span
            >
          </div>
        </template>
        <el-card
          v-for="contributor in frontendContributors"
          :key="contributor.id"
          class="contributor-card"
          ><template #header>
            <div class="card-header">
              <img
                src="../assets/img/contribution/vuejs-icon.svg"
                class="icon"
              />
              <el-link
                :href="getGitHubProfileLink(contributor.name)"
                target="_blank"
              >
                {{ contributor.name }}
                <span class="spacer"></span>
                {{ contributor.realName }}
              </el-link>
            </div>
          </template>
          <p class="card-text">提交数：{{ contributor.commits }}</p>
          <p class="card-text">代码行数：{{ contributor.linesOfCode }}</p>
          <p class="card-description">贡献：{{ contributor.description }}</p>
        </el-card>
      </el-card>
    </div>

    <div class="contributor-section backend-section">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span
              ><img
                src="../assets/img/contribution/golang-icon.svg"
                class="icon"
              />后端贡献者</span
            >
          </div>
        </template>
        <el-card
          v-for="contributor in backendContributors"
          :key="contributor.id"
          class="contributor-card"
        >
          <template #header>
            <div class="card-header">
              <img
                src="../assets/img/contribution/golang-icon.svg"
                class="icon"
              />
              <el-link
                :href="getGitHubProfileLink(contributor.name)"
                target="_blank"
              >
                {{ contributor.name }}
                <span class="spacer"></span>
                {{ contributor.realName }}
              </el-link>
            </div>
          </template>
          <p class="card-text">提交数：{{ contributor.commits }}</p>
          <p class="card-text">代码行数：{{ contributor.linesOfCode }}</p>
          <p class="card-description">贡献：{{ contributor.description }}</p>
        </el-card>
      </el-card>
    </div>
  </div>
  <div class="footerCon">
    数据更新于：2024年2月9日
  </div>
</template>

<style lang="less" scoped>
.icon {
  width: 24px;
  height: 24px;
}

.card-header {
  display: flex;
  align-items: center;
}

.card-header img {
  vertical-align: middle;
}

.contributor-container {
  display: flex;
}

.contributor-section {
  flex: 1;
  margin-right: 20px;
  padding: 10px;
  border-radius: 5px;
}
.contributor-card {
  margin-bottom: 20px;
}

// .frontend-section {
//   background-color: #6fbf73;
// }

// .backend-section {
//   background-color: rgb(0, 125, 156, 0.75);
// }
.card-text {
  margin-bottom: 10px; /* 根据需求调整行间距大小 */
}
.card-description {
  color: rgb(241, 127, 40);
}
.spacer {
  margin-left: 5px; /* 根据需求调整间距大小 */
}

.contributor-section:last-child {
  margin-right: 0;
}

.el-link {
  font-size: 15px;
}

@media (max-width: 1080px) {
  .contributor-container {
    flex-direction: column;
  }

  .contributor-section {
    margin-right: 0;
    margin-bottom: 20px;
  }
}
</style>
