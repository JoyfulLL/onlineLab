<script>
/**
 * @file  Pagination.vue
 * @author ljf13
 * @description 用于分页
 * @date 2024/1/19
 */

import { defineComponent, ref, PropType } from "vue";
import { ElPagination } from "element-plus";

export default {
  props: {
    pageSize: {
      type: Number,
      default: 20
    },
    total: {
      type: Number,
      default: 0
    }
  },
  setup(props, { emit }) {
    const currentPage = ref(1);

    function changePage(page) {
      currentPage.value = page;
      emit('current-change', page);
    }

    function handleSizeChange(val) {
      props.pageSize = val;
      currentPage.value = 1;
      emit('size-change', val);
    }

    return {
      currentPage,
      changePage,
      handleSizeChange
    };
  }
};
</script>

<template>
  <el-pagination
      :page-size="pageSize"
      :page-sizes="[10, 20, 30, 50]"
      background
      default
      layout="total,prev, pager, next, sizes"
      :total="total"
      @current-change="changePage"
      @size-change="handleSizeChange"
  />
</template>

<style scoped lang="less"></style>
