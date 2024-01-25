<script>
/**
 * @file  studentRegistration
 * @author ljf13
 * @description 用于注册学生
 * @date 2024/1/10
 */
import { regStu } from '@/api/userManagement/registerUser.js'
import { ElMessage, ElNotification } from 'element-plus'
import { errorMessages } from '@/utils/errorMessagesCode'
import { rules } from '@/utils/formRules.js'
import { editStuInfo } from '@/api/userManagement/editUserInfo'
import { basicClassesStore } from '@/stores'
import { mapState } from 'pinia'

export default {
  computed: {
    rules() {
      return rules
    },
    ...mapState(basicClassesStore, ['classList']),
  },
  props: {
    userData: {
      type: Object,
      default: () => ({}),
    },
    showPassword: {
      type: Boolean,
      default: true,
    },
    IsDisabled: {
      type: Boolean,
      default: false,
    },
    action: {
      type: String,
      default: 'edit',
    },
  },
  data() {
    return {
      userForm: {},
      regAction: 'reg',
      editAction: 'edit',
    }
  },
  //用于侦听 编辑 按钮的数据变化
  watch: {
    userData: {
      handler(newVal) {
        this.userForm = { ...newVal } // 使用对象的深拷贝来更新userForm
      },
      immediate: true, // 立即执行一次
    },
  },
  methods: {
    handleSubmit() {
      console.log(this.userForm.class)
      if (this.regAction === this.action) {
        regStu(
          this.userForm.name,
          this.userForm.password,
          this.userForm.email,
          this.userForm.realName,
          this.userForm.userSchoollD,
          this.userForm.schoolCode,
          this.userForm.class,
          this.userForm.sex,
        ).then((res) => {
          if (res.data.status == 0) {
            //判断status是否为0
            ElMessage({
              message: '注册成功',
              type: 'success',
              duration: 3000,
            })
            //注册成功，跳转到成功的界面
            this.$router.push('/success')
          }
        })
      } else if (this.editAction === this.action) {
        editStuInfo(
          this.userForm.id,
          this.userForm.name,
          this.userForm.email,
          this.userForm.realName,
          this.userForm.userSchoollD,
          this.userForm.schoolCode,
          this.userForm.class,
          this.userForm.sex,
        ).then((res) => {
          if (res.data.status === 0) {
            this.$emit('edit-success', false)
            ElMessage({
              message: '编辑成功',
              type: 'success',
            })
          }
        })
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
  mounted() {
    //console.log(this.classList)
  },
}
</script>

<template>
  <div class="form-container">
    <el-form
      :model="userForm"
      label-width="80px"
      ref="form"
      :rules="rules"
      class="centered-form"
      @submit="handleSubmit">
      <el-form-item label="ID" prop="id" v-if="!this.showPassword">
        <el-input v-model="userForm.id" :disabled="this.IsDisabled"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="userForm.name" :disabled="this.IsDisabled"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="this.showPassword">
        <el-input v-model="userForm.password" type="password" show-password />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userForm.email" :disabled="this.IsDisabled"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="userForm.realName" :disabled="this.IsDisabled"></el-input>
      </el-form-item>
      <el-form-item label="学生学号" prop="userSchoollD">
        <el-input v-model="userForm.userSchoollD" :disabled="this.IsDisabled"></el-input>
      </el-form-item>
      <el-form-item label="学校代码" prop="schoolCode">
        <el-input v-model="userForm.schoolCode" :disabled="this.IsDisabled"></el-input>
      </el-form-item>
      <el-form-item label="学生班级" prop="class" label-width="auto">
        <el-select v-model="userForm.class" placeholder="请选择班级" :disabled="this.IsDisabled">
          <el-option
            v-for="item in this.classList"
            :key="item.classid"
            :label="item.classname"
            :value="item.classname"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="userForm.sex" :disabled="this.IsDisabled">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <div class="button-container" style="text-align: center">
          <el-button type="primary" @click="handleSubmit('userForm')" :disabled="this.IsDisabled">提交 </el-button>
          <el-button @click="resetForm('userForm')" v-if="this.showPassword" :disabled="this.IsDisabled"
            >重置
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less">
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.centered-form {
  width: 350px;
}

.button-container {
  text-align: center;

  .el-button {
    margin: 0 10px;
  }
}
</style>
