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
    total: {
      type: Number,
      default: 10,
    },
    pageSize: {
      type: Number,
      default: 7,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    // 改页面数据量
    handleSizeChange(val) {
      // val值就是新的页面数据量
      // 父组件传过来的自定义事件名：changePageSize
      // 自定义事件其实是一个函数，这里函数需要参数（当前页面数据量，当前页码）
      this.$emit("changePageSize", val, this.currentPage);
    },

    // 改变页码
    handleCurrentChange(val) {
      // 同理
      this.$emit("changePageNo", val, this.pageSize);
    },
  },
};
</script>

<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :page-sizes="[100, 200, 300, 400]"
    :page-size="100"
    layout="total, sizes, prev, pager, next"
    :total="400"
  >
  </el-pagination>
</template>

<style scoped lang="less"></style>
