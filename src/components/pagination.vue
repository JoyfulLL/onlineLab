<script setup>/**
 * @file  pagination
 * @author ljf13
 * @date 2024/1/9
 * @description 用于分页(未封装完成)
 *
 *数据说明
 *  dataCount: 页数
 *  pageNum: 页号
 *  pageSize: 每页显示的数据量
 *页面逻辑
 *  @此组件通过切割数组实现的分页，因此需要遍历切割后的数组
 *  通过后端接口，异步获取到数据，数据放到dataList数组中
 *  通过length，读取到数组长度，存放到config的dataCount
 *  使用computed,每当读取到数据变化，就会重新计算
 *  使用startIndex和endIndex来确定应该显示的数据范围
 *  然后通过dataList.value.slice(startIndex, endIndex)来获取当前页应该显示的数据
 *  table数据表中，应该遍历paginatedDataList，而非一开始获取的dataList
 */
import {getStuInfo} from "@/api/manager";
import {reactive, ref} from "vue";


const showTable = async () => {
  // 此后端接口的方法为GET
  let res = await getStuInfo();
  dataList.value = res.data.data;
  config.dataCount = dataList.value.length; //读取学生总数
};

//用于分页
const config = reactive({
  dataCount: 0,
  pageNum: 1,
  pageSize: 30
});
const changePage = (pageNum) => {
  // 读取到当前的页号
  config.pageNum = pageNum;
  //console.log(config.pageNum)
};
// 计算属性，用于返回当前页应该显示的数据
// 将dataList划分
const paginatedDataList = computed(() => {
  const startIndex = (config.pageNum - 1) * config.pageSize;
  const endIndex = startIndex + config.pageSize;
  return dataList.value.slice(startIndex, endIndex);
});

//用于数据读取与展示
const dataList = ref([]);


const tableLabel = reactive([
  {
    prop: "id",
    label: "ID",
    width: 180,
  },
  {
    prop: "name",
    label: "用户名",
    width: "auto",
  }]
)

</script>

<template>
  <div>
    <el-table :data="paginatedDataList" style="width: 100%" border>
      <el-table-column
          v-for="item in tableLabel"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :width="item.width ? item.width : 125"
          table-layout="fix"
      />
    </el-table>
    <el-pagination
        :page-size="config.pageSize"
        background
        small
        layout="prev, pager, next"
        :total="config.dataCount"
        @current-change="changePage"
    />
  </div>
</template>

<style scoped lang="less">
.my-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;

  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;

    &:hover {
      color: #27BA9B;
    }

    &.active {
      background: #27BA9B;
      color: #fff;
      border-color: #27BA9B;
    }

    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;

      &:hover {
        color: #333;
      }
    }
  }

  > span {
    margin-right: 10px;
  }
}
</style>