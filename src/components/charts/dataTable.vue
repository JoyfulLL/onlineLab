<!-- eslint-disable no-undef -->
<script setup>
/**
 * @file  dataTable.vue
 * @author ljf13
 * @description 数据表及分页器封装
 * @date 2024/1/22
 */

const props = defineProps({
  originData: array,
  currentPage: Number,
  ageSize: {
    type: Number,
  },
}),

 displayData = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const startIndex = (props.currentPage - 1) * props.pageSize
})

onMounted(() => {
  fetchClassList()
})
const useClassList = teacherJoinedClassStore(),
 fetchClassList = () => {
  useClassList.storeTeacherList()
  // console.log(useClassList.teacherClassList)
},
// 创建ref
 filtersClassData = ref(processClassData(useAllClassInfoList.classList)),

// 创建computed
 classFilters = computed(() => {
  return filtersClassData.value.map(item => ({
    text: item.classname,
    value: item.classname,
  }))
}),

// 根据班级筛选出学生
 filterClasses = (value, row) => {
  return row.class === value
},
// 多选
 multipleSelection = ref([]),
 isAnyStudentSelected = ref(false),
 selectStudents = ref([]),

// 多选框
 handleSelectionChange = val => {
  multipleSelection.value = val
  selectStudents.value = multipleSelection.value
  isAnyStudentSelected.value = selectStudents.value.length > 0
}
</script>

<template>
  <div>
    <el-table
      :data="displayData"
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
          {{ scope.row && scope.row.class ? scope.row.class : "" }}
        </template>
      </el-table-column>
      <el-table-column prop="schoolCode" label="学校" width="180" />
      <el-table-column prop="name" label="用户名" width="auto" />
      <el-table-column prop="email" label="邮箱" width="auto" />
      <el-table-column prop="sex" label="性别" width="55" />
    </el-table>
  </div>
</template>

<style scoped lang="less"></style>
