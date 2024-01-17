<script setup>
/**
 * @file  studentManagement
 * @author ljf13
 * @description 用于学生管理——展示学生信息，注册新学生，修改学生信息
 * @date 2024/1/8
 @@@ 代码结构
 数据段data 建议新增数据都放在新增的方法前面
 @避免出现无法找到数据的错误
 方法段method
 @当前已有功能：✔获取所有学生信息，✔新增学生，✔修改指定学生信息
 @待做功能：
 @ 1、将指定学生移出班级
 @ 2、依据信息获取对应的学生
 @ 3、✔页面的数据用pinia做状态管理，实现数据无感更新
 */
import { checkToken, getStuInfo, editStuInfo, regStu } from "@/api/manager";
import { reactive, ref, onMounted, inject } from "vue";
import { ElMessage } from "element-plus";
import { usePaginationStore } from "@/stores/userData/storeUserData";

// @界面初始化，校验token合法后，再获取用户数据
onMounted(() => {
  checkToken();
  fetchData();
});

// @注入APP.vue提供的刷新方法
// @用于在新增用户/编辑用户后刷新表格
const reload = inject("reload");

// 展示数据用的表头
const tableLabel = reactive([
  // @用户ID为用户唯一标识符，不需要在表中展示
  // 虽然不显示，但还是能读取到用户ID
  // {
  //   prop: "id",
  //   label: "ID",
  //   width: 180,
  // },
  {
    prop: "userSchoollD",
    label: "学号",
  },
  {
    prop: "realName",
    label: "姓名",
    width: "120",
  },
  {
    prop: "class",
    label: "班级",
    width: "150",
  },
  {
    prop: "schoolCode",
    label: "学校",
    width: "180",
  },
  {
    prop: "name",
    label: "用户名",
    width: "auto",
  },
  {
    prop: "email",
    label: "邮箱",
    width: "230",
  },
  {
    prop: "sex",
    label: "性别",
    width: "55",
  },
]);
// @注册信息的表单
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

// 注册表单规则
const rules = {
  name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码" },
    {
      validator: (rule, value, callback) => {
        if (!value) {
          return callback(new Error("请输入密码"));
        }
        if (value.length < 8) {
          return callback(new Error("密码长度必须大于8位"));
        }
        if (!/[0-9]/.test(value)) {
          return callback(new Error("密码必须包含1个数字"));
        }
        if (!/[a-z]/.test(value)) {
          return callback(new Error("密码必须包含1个小写字母"));
        }
        if (!/[A-Z]/.test(value)) {
          return callback(new Error("密码必须包含1个大写字母"));
        }
        callback();
      },
      trigger: "blur",
    },
  ],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    {
      type: "email",
      message: "请输入正确的邮箱地址",
      trigger: ["blur", "change"],
    },
  ],
  realName: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
  userSchoollD: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (!value) {
          return callback(new Error("请输入学生学号"));
        }
        var pattern = /^[0-9]+$/;
        if (!pattern.test(value)) {
          return callback(new Error("学生学号必须全为数字"));
        }
        callback();
      },
      trigger: "blur",
    },
  ],
  schoolCode: [{ required: true, message: "请输入学校代码", trigger: "blur" }],
  class: [{ required: true, message: "请输入学生班级", trigger: "blur" }],
  sex: [{ required: true, message: "请选择性别", trigger: "change" }],
};

// 用于侦听数据的变化，使用newUserForm存放变化后的数据
const newUserForm = reactive([]);
watchEffect(() => {
  newUserForm.value = { ...userForm };
  // console.log('真名',newUserForm.value.realName)
});

const paginationStore = usePaginationStore();

// 数据获取
const fetchData = async () => {
  await paginationStore.showStuInfo();
  // 数据获取完成后，可以执行其他操作或访问Store中的数据
  // console.log(paginationStore.dataCount)
};

const changePage = (pageNum) => {
  paginationStore.changePage(pageNum);
};

// @以下代码用于 学生管理
// @添加学生按钮——仅用于展示会话框
// @编辑学生按钮——展示会话框以及获取到的表单数据
// @表单信息的提交动作（注册学生，修改学生）都在handleSubmit

// 用于控制会话框显示
const dialogVisible = ref(false);

// @用于判断当前动作
// @区分当前是添加还是编辑
const action = ref("add");

// @显示密码框与否 编辑模式没有密码框
const showPassword = ref();

// @用于在编辑模式禁用相关选项的修改
// @目前除了realName，email，class外，全都禁用
const IsDisabled = ref(false);

// @关闭会话框
const handleClose = (done) => {
  ElMessageBox.confirm("确定关闭？")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};

//此函数仅用于调出会话框，并不是用于提交表单
//提交表单的函数为handleSubmit
const addStudent = async () => {
  action.value = "add";
  dialogVisible.value = true;
  // 清空表单信息
  // @因为先点击编辑按钮，查看的信息会遗留在当前的表单
  // @因为不懂更新DOM的方法（nextTick），所以只能先强制删除表单的信息
  // @删除的仅仅是显示的信息，不波及数据库
  for (let key in userForm) {
    delete userForm[key];
  }
  showPassword.value = true;
  IsDisabled.value = false;
};

//@用于”编辑按钮“，函数实际用途为查看用户信息
//@将用户信息显示在表单中

const editStudent = (row) => {
  action.value = "edit";
  dialogVisible.value = true;
  // console.log(row)
  nextTick(() => {
    Object.assign(userForm, row);
  });
  showPassword.value = false;
  IsDisabled.value = true;
};

// @此函数用于提交表单
// @判断动作的值，为add则调用新增用户接口
// @否则调用的是修改用户的接口
const handleSubmit = async () => {
  if (action.value === "add") {
    await regStu(
      userForm.name,
      userForm.password,
      userForm.email,
      userForm.realName,
      userForm.userSchoollD,
      userForm.schoolCode,
      userForm.class,
      userForm.sex,
    )
      .then((res) => {
        if (res.data.status === 0) {
          //状态码为0，提交成功，关闭当前对话框
          dialogVisible.value = false;
          reload();
          ElMessage({
            message: "用户添加完毕",
            type: "success",
          });
        }
      })
      .catch((e) => {
        let errorMessage = "登录失败";
        switch (e.response.data.status) {
          case 1:
            errorMessage = "内部错误";
            break;
          case 3:
            errorMessage = "参数错误";
            break;
          case 4:
            errorMessage = "用户已存在";
            break;
          case 5:
            errorMessage = "用户不存在";
            break;
          case 7:
            errorMessage = "无权限访问";
            break;
          case 9:
            errorMessage = "性别错误";
            break;
          case 10:
            errorMessage = "用户名已存在";
            break;
          case 11:
            errorMessage = "邮箱格式错误";
            break;
          case 12:
            errorMessage = "真实姓名错误";
            break;
          case 13:
            errorMessage = "学校信息错误";
            break;
          case 14:
            errorMessage = "密码强度不够";
            break;
          default:
            errorMessage = "未知错误";
        }
        ElMessage({
          message: errorMessage,
          type: "error",
          duration: 3000,
        });
      });
  } else {
    //@ 在此处调用修改学生参数的接口
    // console.log('用户名',(newUserForm.value.name))
    await editStuInfo(
      newUserForm.value.id,
      newUserForm.value.name,
      // newUserForm.value.password,
      newUserForm.value.email,
      newUserForm.value.realName,
      newUserForm.value.userSchoollD,
      newUserForm.value.schoolCode,
      newUserForm.value.class,
      newUserForm.value.sex,
    )
      .then((res) => {
        if (res.data.status == 0) {
          dialogVisible.value = false;
          reload();
          ElMessage({
            message: "编辑成功",
            type: "success",
          });
        }
      })
      .catch((e) => {
        let errorMessage = "登录失败";
        switch (e.response.data.status) {
          case 1:
            errorMessage = "内部错误";
            break;
          case 3:
            errorMessage = "参数错误";
            break;
          case 5:
            errorMessage = "用户不存在";
            break;
          case 7:
            errorMessage = "无权限访问";
            break;
          case 8:
            errorMessage = "班级错误";
            break;
          case 9:
            errorMessage = "性别错误";
            break;
          case 10:
            errorMessage = "用户名已存在";
            break;
          case 11:
            errorMessage = "邮箱格式错误";
            break;
          case 12:
            errorMessage = "真实姓名错误";
            break;
          case 13:
            errorMessage = "学校信息错误";
            break;
          case 14:
            errorMessage = "密码强度不够";
            break;
          default:
            errorMessage = "未知错误";
        }
        ElMessage({
          message: errorMessage,
          type: "error",
          duration: 3000,
        });
      });
  }
};

//用于数据读取与展示
</script>

<template>
  <div class="user-header">
    <!--    新增用户-->
    <el-button type="primary" @click="addStudent()">+新增</el-button>
    <el-dialog
      v-model="dialogVisible"
      :title="action == 'add' ? '添加学生' : '编辑学生'"
      width="30%"
      :before-close="handleClose"
    >
      <!--      学生注册组件表单-->
      <div class="form-container">
        <el-form
          :model="userForm"
          class="centered-form"
          label-width="80px"
          :rules="rules"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="userForm.name" :disabled="IsDisabled"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" v-if="showPassword">
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
          <el-form-item label="学生学号" prop="userSchoollD">
            <el-input
              v-model="userForm.userSchoollD"
              :disabled="IsDisabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="学校代码" prop="schoolCode">
            <el-input
              v-model="userForm.schoolCode"
              :disabled="IsDisabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="学生班级" prop="class">
            <el-input v-model="userForm.class"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="userForm.sex" :disabled="IsDisabled">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <div class="button-container">
              <el-button type="primary" @click="handleSubmit('userForm')"
                >{{ action == "add" ? "添加" : "确认修改" }}
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
    <el-table
      :data="paginationStore.paginatedStuList"
      style="width: 100%"
      border
    >
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width ? item.width : 125"
        table-layout="fix"
      />
      <el-table-column fixed="right" label="操作" min-width="100">
        <template #default="scope">
          <el-button size="default" @click="editStudent(scope.row)"
            >编辑
          </el-button>
          <el-button type="danger" size="default">移出班级</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 分页 -->
  <el-pagination
    :page-size="paginationStore.pageSize"
    background
    default
    layout="prev, pager, next"
    :total="paginationStore.dataCount"
    @current-change="changePage"
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
</style>
