<template>
  <div class="user-header">
    <!--    新增用户-->
    <el-button type="primary" @click="dialogVisible = true">+新增</el-button>
    <el-dialog
      v-model="dialogVisible"
      title="新增用户"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="userForm" class="demo-form-inline">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password" type="password" show-password />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="userForm.realName"></el-input>
        </el-form-item>
        <el-form-item label="学生学号" prop="userSchoollD">
          <el-input v-model="userForm.userSchoollD"></el-input>
        </el-form-item>
        <el-form-item label="学校代码" prop="schoolCode">
          <el-input v-model="userForm.schoolCode"></el-input>
        </el-form-item>
        <el-form-item label="学生班级" prop="class">
          <el-input v-model="userForm.class"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="userForm.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <div class="button-container">
            <el-button type="primary" @click="handleSubmit('userForm')"
              >添加</el-button
            >
            <el-button @click="dialogVisible = false">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--    搜索框-->
    <el-form :inline="true">
      <el-form-item>
        <el-input class="w-50 m-2" placeholder="输入姓名">
          <template #prefix>
            <el-icon class="el-input__icon">
              <search />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="paginatedStuList" style="width: 100%" border>
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width ? item.width : 125"
        table-layout="fix"
      />
      <el-table-column fixed="right" label="操作" min-width="180">
        <template #default="scope">
          <el-button size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 分页 -->
  <el-pagination
    :page-size="config.pageSize"
    background
    small
    layout="prev, pager, next"
    :total="config.dataCount"
    @current-change="changePage"
  />
</template>

<script setup>
import { checkToken, getStuInfo, regStu } from "@/api/manager";
import { reactive, toRefs, ref } from "vue";
import { ElMessage } from "element-plus";

onMounted(() => {
  checkToken();
  showStuInfo();
});

const showStuInfo = async () => {
  let res = await getStuInfo();
  stuList.value = res.data.data;
  // console.log(stuList.value.length)
  config.dataCount = stuList.value.length; //读取学生总数
  // console.log(config.pagerCount)
};

//用于分页
const config = reactive({
  dataCount: 0,
  pageNum: 1,
  pageSize: 30,
});
const changePage = (pageNum) => {
  // 读取到当前的页号
  config.pageNum = pageNum;
  //console.log(config.pageNum)
};
// 计算属性，用于返回当前页应该显示的数据
const paginatedStuList = computed(() => {
  const startIndex = (config.pageNum - 1) * config.pageSize;
  const endIndex = startIndex + config.pageSize;
  return stuList.value.slice(startIndex, endIndex);
});

//用于控制会话框显示
const dialogVisible = ref(false);
const handleClose = (done) => {
  ElMessageBox.confirm("确定关闭？")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
const handleSubmit = async () => {
  await regStu(
    userForm.name,
    userForm.password,
    userForm.email,
    userForm.realName,
    userForm.userSchoollD,
    userForm.schoolCode,
    userForm.class,
    userForm.sex
  )
    .then((res) => {
      if (res.data.status == 0) {
        //状态码为0，提交成功，关闭当前对话框
        dialogVisible.value = false;
      } else {
        ElMessage({
          title: "Warning",
          message: "错误",
          type: "warning",
          duration: 3000,
        });
      }
    })
    .catch((err) => {
      ElMessage({
        title: "Error",
        message: "请求失败",
        type: "error",
        duration: 3000,
      });
    });
};

const userForm = reactive({
  name: "",
  password: "",
  email: "",
  realName: "",
  userSchoollD: "",
  schoolCode: "",
  class: "",
  sex: "",
});

//用于数据读取与展示
const stuList = ref([]);
const tableLabel = reactive([
  // {
  //   prop: "id",
  //   label: "ID",
  //   width: 180,
  // },
  {
    prop: "name",
    label: "用户名",
    width: "auto",
  },
  {
    prop: "class",
    label: "班级",
    width: "110",
  },
  {
    prop: "email",
    label: "邮箱",
    width: "230",
  },
  {
    prop: "realName",
    label: "姓名",
    width: "80",
  },
  {
    prop: "userSchoollD",
    label: "学号",
  },
  {
    prop: "schoolCode",
    label: "学校",
    width: "180",
  },
  {
    prop: "sex",
    label: "性别",
    width: "60",
  },
]);
</script>

<style scoped lang="less">
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
</style>
