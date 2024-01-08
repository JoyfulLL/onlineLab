<template>
  <div class="table" >
    <el-table :data="stuList" style="width: 100%">
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width ? item.width : 125"
      />
    </el-table>
  </div>
</template>

<script setup>
import {checkToken, getStuInfo} from "@/api/manager";


onMounted(() => {
  checkToken();
  showStuInfo();
})


const showStuInfo = async ()=>{
  let res = await getStuInfo();
  console.log(res)
  stuList.value=res.data.data
  console.log(stuList)
}
const stuList = ref([])
const tableLabel = reactive([
  {
    prop: "id",
    label: "ID",
    width:180,
  },
  {
    prop: "name",
    label: "用户名",
  },
  {
    prop: "class",
    label: "班级",
  },
  {
    prop: "email",
    label: "邮箱",
    width:190,
  },
  {
    prop: "realName",
    label: "姓名",
  },
  {
    prop: "userSchoollD",
    label: "学号",
  },
  {
    prop: "schoolCode",
    label: "学校",
  },
  {
    prop: "sex",
    label: "性别",
  },
]);


</script>

<style scoped lang="less">
.table {
  position: relative;
  height: 520px;
  .pager {
    position: absolute;
    right: 0;
    bottom: -20px;
  }
}
</style>