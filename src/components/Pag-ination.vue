<!-- eslint-disable-next-line vue/multi-word-component-names -->
<script setup>
/**
 * @file  Pagination.vue
 * @author ljf13
 * @description 用于分页的子组件(未完成数据跳转)
 * @date 2024/1/19
 */

import { defineProps, ref } from "vue"
import { ElPagination } from "element-plus"

const props = defineProps({
    total: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      default: 20,
      required: true,
    },
    currentPage: {
      type: Number,
      default: 1,
      required: true,
    },
  }),
  pageSize = ref(props.pageSize),
  currentPage = ref(props.currentPage),
  handleSizeChange = val => {
    console.log(`${val} items per page`)
    pageSize.value = val
    currentPage.value = 1
  },
  changePage = val => {
    console.log(`current page: ${val}`)
    // currentPage.value=val;
    // eslint-disable-next-line no-undef
    emit("page-change", val)
  }
</script>
<template>
  <div class="paginationContainer">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[20, 30, 50, 100]"
      background
      default
      layout="total,prev, pager, next,sizes,"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="changePage"
    />
  </div>
</template>
<style scoped>
.paginationContainer {
  height: 50px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 50px;
}
</style>
