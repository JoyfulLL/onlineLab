<script setup>
/**
 * @此页面数据表的增删查改功能已完成
 * @file  studentManagement
 * @author ljf13
 * @description 用于学生管理——展示学生信息，注册新学生，修改学生信息
 * @date 2024/1/8
 @@@ 代码结构
 数据段data 建议新增数据都放在新增的方法前面
 @避免出现无法找到数据的错误
 方法段method

 @当前已有功能：✔获取所有学生信息，✔新增学生，✔修改指定学生信息，
 @待做功能：
 @ 1、✔将指定学生移出班级
 @ 2、依据信息获取对应的学生
 @ 3、✔页面的数据用pinia做状态管理，实现数据无感更新
 */
import { checkToken } from "@/api";
import { regStu } from "@/api/userManagement/registerUser";
import { reactive, ref, onMounted, inject } from "vue";
import { ElMessage, ElNotification } from "element-plus";
import { useTableDataStore } from "@/stores/userData/storeUserData";
import { editStuInfo } from "@/api/userManagement/editUserInfo";
import { basicClassesStore } from "@/stores";
import { removeStudentFromClass } from "@/api/userManagement/removeUser";
import pagination from "@/components/Pagination.vue";
import { errorMessages } from "@/utils/errorMessagesCode";
import { rules } from "@/utils/formRules";
import classesList from "@/components/charts/classesListTable.vue";
import { Search } from "@element-plus/icons-vue";
import { teacherJoinedClassStore } from "@/stores/classData";
import { useAuthStore } from "@/stores/tokenStore";
import addStudentsFromClass from "@/components/addStudentsFromClass.vue";
// @界面初始化，校验token合法后，再获取用户数据
onMounted(() => {
  checkToken();
  fetchData();
  fetchClassList();
});

// @注入APP.vue提供的刷新方法
// @用于在新增用户/编辑用户后刷新表格
const reload = inject("reload");

// @注册信息的表单
let userForm = reactive({
  id: "",
  name: "",
  password: "",
  email: "",
  realName: "",
  userSchoollD: "",
  schoolCode: "",
  class: "",
  sex: "",
});
const useScope = useAuthStore();
// 读取当前用户的scope角色并存储
const userScope = useScope.getScope(); //获取到的scope

const studentDataTable = useTableDataStore();
const useAllClassInfoList = basicClassesStore();

const useClassList = teacherJoinedClassStore();
const fetchClassList = () => {
  useClassList.storeTeacherList();
  // console.log(useClassList.teacherClassList)
};

// 处理班级数据
function processClassData(classData) {
  return Object.keys(classData).map((classid) => ({
    classid: classData[classid].classid,
    classname: classData[classid].classname,
    teacherid: classData[classid].teacherid,
  }));
}

// 创建ref
const filtersClassData = ref(processClassData(useAllClassInfoList.classList));

// 创建computed
const classFilters = computed(() => {
  return filtersClassData.value.map((item) => ({
    text: item.classname,
    value: item.classname,
  }));
});

// 根据班级筛选出学生
const filterClasses = (value, row) => {
  return row.class === value;
};

// 数据获取
const fetchData = async () => {
  await studentDataTable.showStuInfo();
  // 数据获取完成后，可以执行其他操作或访问Store中的数据
  //console.log(studentDataTable.stuList.id);
};

// @以下代码用于 学生管理
// @添加学生按钮——仅用于展示会话框
// @编辑学生按钮——展示会话框以及获取到的表单数据
// @表单信息的提交动作（注册学生，修改学生）都在handleSubmit

// 用于控制会话框显示
const dialogVisible = ref(false);
const dialogVisibleSearchStu=ref(false)

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
  dialogVisibleSearchStu.value = true;
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

// @以下代码用于分页
// 页面显示数据量 默认为20条
const pageSize = ref(20);
// 当前页面，默认为1
const currentPage = ref(1);

// 用于更换页面
function changePage(page) {
  currentPage.value = page;
}

// 用于更换页大小
function handleSizeChange(val) {
  pageSize.value = val; // 更新每页显示个数
  currentPage.value = 1; // 切换每页显示个数时，回到第一页
}

const toSearch = () => {};
// 用于搜索功能
const queryInfo = ref("");

// 表单遍历的数据为划分后且能够检索的数据
const filteredData = computed(() => {
  const query = queryInfo.value.toLowerCase().trim();
  let filtered = studentDataTable.stuList;
  //console.log(filtered)
  if (query) {
    filtered = filtered.filter((item) => {
      return (
        (item.name &&
          typeof item.name === "string" &&
          item.name.toLowerCase().includes(query)) ||
        (item.realName &&
          typeof item.realName === "string" &&
          item.realName.toLowerCase().includes(query)) ||
        (item.class &&
          typeof item.class === "string" &&
          item.class.toLowerCase().includes(query))
      );
    });
  }
  //将分页逻辑整合到 filteredData 计算属性中，以确保分页功能和搜索功能可以同时生效
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return filtered.slice(startIndex, endIndex);
});

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
      userForm.sex
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
        let errorMessage = "失败";
        if (e.response.data.status) {
          errorMessage = errorMessages[e.response.data.status] || "未知错误";
        } else {
          errorMessage = "未知错误";
        }
        ElNotification({
          title: "错误",
          message: errorMessage,
          type: "error",
          duration: 3000,
        });
      });
  } else {
    //@ 在此处调用修改学生参数的接口
    await editStuInfo(
      userForm.id,
      userForm.name,
      userForm.email,
      userForm.realName,
      userForm.userSchoollD,
      userForm.schoolCode,
      userForm.class,
      userForm.sex
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
        //console.log(newUserForm.value.id);
      })
      .catch((e) => {
        let errorMessage = "失败";
        if (e.response.data.status) {
          errorMessage = errorMessages[e.response.data.status] || "未知错误";
        } else {
          errorMessage = "未知错误";
        }
        ElNotification({
          title: "错误",
          message: errorMessage,
          type: "error",
          duration: 3000,
        });
      });
  }
};

// 多选
const multipleSelection = ref([]);
const isAnyStudentSelected = ref(false);
const selectStudents = ref([]);

// 多选框
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
  selectStudents.value = multipleSelection.value;
  isAnyStudentSelected.value = selectStudents.value.length > 0;
};

// 一键移出班级 即批量
const removeSelectedStudents = async () => {
  if (selectStudents.value.length === 0) {
    return; // 如果没有选中的学生，直接返回
  }
  const student = selectStudents.value.pop(); // 从选中的学生数组中取出最后一个学生
  try {
    await removeStudentFromClass(student.id, userScope); // 删除这个学生
    if (selectStudents.value.length > 0) {
      // 如果还有选中的学生，继续递归删除下一个学生
      await removeSelectedStudents();
    } else {
      reload(); // 如果所有学生都被删除了，进行页面刷新
      ElMessage({
        message: "批量移出成功",
        type: "success",
      });
    }
  } catch (e) {
    let errorMessage = "失败";
    if (e.response && e.response.data && e.response.data.status) {
      errorMessage = errorMessages[e.response.data.status] || "未知错误";
    } else {
      errorMessage = "未知错误";
    }
    ElNotification({
      title: "错误",
      message: errorMessage,
      type: "error",
      duration: 3500,
    });
  }
};

// 提交移出的方法
const handleRemoveClick = async () => {
  const confirmResult = await ElMessageBox.confirm(
    "确定要移出所选学生的班级？",
    "提示",
    { type: "warning" }
  );
  if (confirmResult === "confirm") {
    await removeSelectedStudents();
  } else {
  }
};

// 将一个学生移出班级的按钮方法
const removeFromClass = async (row) => {
  const { id } = row;
  const confirmResult = await ElMessageBox.confirm(
    "确定要移出所选学生吗？",
    "提示",
    {
      type: "warning",
    }
  );
  if (confirmResult === "confirm") {
    // 用户点击了确认按钮,执行移出班级的操作
    await removeStudentFromClass(id, userScope)
      .then(() => {
        reload();
        ElMessage({
          message: "移出成功",
          type: "success",
        });
      })
      .catch((e) => {
        let errorMessage = "失败";
        if (e.response.data.status) {
          errorMessage = errorMessages[e.response.data.status] || "未知错误";
        } else {
          errorMessage = "未知错误";
        }
        ElNotification({
          title: "错误",
          message: errorMessage,
          type: "error",
          duration: 3000,
        });
      });
  } else {
    // 用户点击了取消按钮
    // 可以不做任何操作
  }
};

</script>

<template>
  <div class="user-header">
    <el-form :inline="true">
      <el-form-item>
        <!--      移出班级的 按钮-->
        <el-button
          type="danger"
          size="default"
          @click="handleRemoveClick"
          :disabled="!isAnyStudentSelected"
        >
          批量移出班级
        </el-button>
      </el-form-item>
    </el-form>

<!--    用于搜索学生-->
    <el-dialog v-model="dialogVisibleSearchStu" :before-close="handleClose">
      <add-students-from-class/>
    </el-dialog>

    <el-dialog
      v-model="dialogVisible"
      :title="action === 'add' ? '添加学生' : '编辑学生'"
      width="30%"
      :before-close="handleClose"
    >
      <!-- 编辑组件表单-->
      <div class="form-container">
        <el-form
          :model="userForm"
          class="centered-form"
          label-width="80px"
          :rules="rules"
        >
          <el-form-item label="ID" prop="id" v-if="!showPassword">
            <el-input v-model="userForm.id" :disabled="IsDisabled"></el-input>
          </el-form-item>
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
            <el-select v-model="userForm.class" placeholder="请选择班级">
              <el-option
                v-for="item in useAllClassInfoList.classList"
                :key="item.classid"
                :label="item.classname"
                :value="item.classname"
              ></el-option>
            </el-select>
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
                >{{ action === "add" ? "添加" : "确认修改" }}
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
          class="w-50 m-2"
          placeholder="搜索学生姓名/班级"
          v-model="queryInfo"
          clearable
        >
          <template #prefix>
            <el-icon class="el-input__icon">
              <unicon name="search" fill="royalblue"></unicon>
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addStudent()">+添加学生</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table
      :data="filteredData"
      style="width: 100%"
      border
      stripe
      max-height="600"
      @selection-change="handleSelectionChange"
    >
      <el-table-column fixed type="selection" width="50" />
      <el-table-column fixed prop="userSchoollD" label="学号" width="180" />
      <el-table-column prop="realName" label="姓名" width="150" />
      <el-table-column
        prop="class"
        label="班级"
        width="150"
        :filters="classFilters"
        :filter-method="filterClasses"
        filter-placement="bottom-end"
      >
        <template #default="scope">
<!--          {{ scope.row.class }}-->
          {{ scope.row && scope.row.class ? scope.row.class : '' }}
        </template>
      </el-table-column>
      <el-table-column prop="schoolCode" label="学校" width="180" />
      <el-table-column prop="name" label="用户名" width="auto" />
      <el-table-column prop="email" label="邮箱" width="auto" />
      <el-table-column prop="sex" label="性别" width="55" />
      <el-table-column fixed="right" label="操作" min-width="100">
        <template #default="scope">
          <el-button size="default" @click="editStudent(scope.row)"
            >编辑
          </el-button>
          <el-button
            type="danger"
            size="default"
            @click="removeFromClass(scope.row)"
            >移出班级
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 分页 -->
  <el-pagination
    :page-size="pageSize"
    :page-sizes="[10, 20, 30, 50]"
    background
    default
    layout="total,prev, pager, next, sizes"
    :total="studentDataTable.studentsDataCount"
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

  .el-button {
    margin-right: 5px; // 调整右侧间距为5px
  }
}

.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px; // 调整上边距
}
</style>
