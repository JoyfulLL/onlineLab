<script setup>
/**
 * @file  dataTable.vue
 * @author ljf13
 * @description 用于展示数据表
 * @date 2024/1/22
 */

const props = defineProps({
  originData:array,
  currentPage:Number,
  ageSize:{
    type: Number
  }
})

const displayData = computed(()=>{
  const startIndex = (props.currentPage - 1)*props.pageSize
})
</script>

<template>
  <div>
    <el-table :data="displayData" style="width: 100%" border max-height="600">
      <!-- 表格的展示逻辑 -->
    </el-table>
  </div>
</template>

<style scoped lang="less"></style>
