<script>
/**
 * @file  studentRegistration
 * @author ljf13
 * @description 用于注册学生
 * @date 2024/1/10
 */
import { regStu } from "@/api/userManagement/registerUser.js"
import { rules } from "@/utils/formRules.js"
import { editStuInfo } from "@/api/userManagement/editUserInfo"
import { basicClassesStore } from "@/stores"
import { mapState } from "pinia"

export default {
  props: {
    action: {
      type: String,
      default: "edit",
    },
    userData: {
      type: Object,
      default: () => ({}),
    },
    // eslint-disable-next-line vue/prop-name-casing
    IsDisabled: {
      type: Boolean,
      default: false,
    },
    showPassword: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      userForm: {},
      regAction: "reg",
      editAction: "edit",
    }
  },
  computed: {
    rules() {
      return rules
    },
    ...mapState(basicClassesStore, ["classList"]),
  },

  // 用于侦听 编辑 按钮的数据变化
  watch: {
    userData: {
      handler(newVal) {
        this.userForm = { ...newVal } // 使用对象的深拷贝来更新userForm
      },
      immediate: true, // 立即执行一次
    },
  },
  methods: {
    async handleSubmit() {
      if (this.regAction === this.action) {
        regStu(
          this.userForm.name,
          this.userForm.password,
          this.userForm.email,
          this.userForm.realName,
          this.userForm.userSchoollD,
          this.userForm.schoolCode,
          this.userForm.class,
          this.userForm.sex
        ).then(res => {
          if (res.data.status == 0) {
            // 判断status是否为0
            ElMessage({
              message: "注册成功",
              type: "success",
              duration: 3000,
            })
            // 注册成功，跳转到成功的界面
            this.$router.push("/success")
          }
        })
      } else if (this.editAction === this.action) {
        const confirmResult = await ElMessageBox.confirm(
          "确定修改吗？",
          "警告",
          { type: "warning" }
        )
        if (confirmResult === "confirm") {
          await editStuInfo(
            this.userForm.id,
            this.userForm.name,
            this.userForm.email,
            this.userForm.realName,
            this.userForm.userSchoollD,
            this.userForm.schoolCode,
            this.userForm.class,
            this.userForm.sex
          ).then(res => {
            if (res.data.status === 0) {
              // eslint-disable-next-line vue/require-explicit-emits
              this.$emit("edit-success", false)
              ElMessage({
                message: "编辑成功",
                type: "success",
              })
            }
          })
        }
      }
    },
    resetForm(form) {
      this.$refs[form].resetFields()
    },
  },
}
</script>

<template>
  <el-form
    ref="form"
    :model="userForm"
    label-width="80px"
    :rules="rules"
    class="centered-form"
    @submit="handleSubmit"
  >
    <el-form-item v-if="!showPassword" label="ID" prop="id">
      <el-input v-model="userForm.id" disabled="true" />
    </el-form-item>
    <el-form-item label="用户名" prop="name">
      <el-input v-model="userForm.name" disabled="true" />
    </el-form-item>
    <el-form-item v-if="showPassword" label="密码" prop="password">
      <el-input v-model="userForm.password" type="password" show-password />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="userForm.email" :disabled="IsDisabled" />
    </el-form-item>
    <el-form-item label="真实姓名" prop="realName">
      <el-input v-model="userForm.realName" :disabled="IsDisabled" />
    </el-form-item>
    <el-form-item label="学生学号" prop="userSchoollD">
      <el-input v-model="userForm.userSchoollD" :disabled="IsDisabled" />
    </el-form-item>
    <el-form-item label="学校" prop="schoolCode">
      <el-input
        v-model="userForm.schoolCode"
        style="width: 100%"
        :disabled="IsDisabled"
      />
    </el-form-item>
    <el-form-item label="学生班级" prop="class">
      <el-select
        v-model="userForm.class"
        style="width: 100%"
        placeholder="请选择班级"
        :disabled="IsDisabled"
      >
        <el-option
          v-for="item in classList"
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
  </el-form>
  <div class="button-container">
    <el-button
      type="primary"
      :disabled="IsDisabled"
      @click="handleSubmit('userForm')"
      >提交
    </el-button>
    <el-button
      v-if="showPassword"
      :disabled="IsDisabled"
      @click="resetForm('userForm')"
      >重置
    </el-button>
  </div>
</template>

<style scoped lang="less">
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.centered-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
