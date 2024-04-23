<script setup lang="ts">
import { basicClassesStore } from "@/stores/index"
import studentRegistration from "@/components/auth/studentRegistration.vue"
const useAllClassInfoList = basicClassesStore()
const userForm = ref({
    class: "",
})

const dialogFormVisible = ref(false)
</script>

<template>

<el-button plain @click="dialogFormVisible = true">
  Open a Form nested Dialog
</el-button>

<student-registration/>

<el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">
  <el-form>
  <el-form-item label="学生班级" prop="class">
      <el-select
        v-model="userForm.class"
        placeholder="请选择班级"
      >
        <el-option
          v-for="item in useAllClassInfoList.classList"
          :key="item.classid"
          :label="item.classname"
          :value="item.classname"
        />
      </el-select>
    </el-form-item>
</el-form>
  </el-dialog>

</template>

<style scoped lang="less">
.course-container {
  margin: 0 px;
}
.box-card {
  width: auto;
  margin: 10px;
}
</style>
