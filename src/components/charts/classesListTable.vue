<script setup>
/**
 * @file  classesListTable.vue
 * @author ljf13
 * @description 班级列表组件
 * @可以传递keyword来检索对应的班级
 * @date 2024/1/22
 * classesList用于父组件传递Object列表
 */
import { defineComponent, ref, defineProps } from "vue";
import { teacherJoinedClassStore } from "@/stores/classData.js";
const useClassList=teacherJoinedClassStore();
const props = defineProps({
  keyword: {
    type: String,
  },
  classesList: {
    type: Object,
    default: () => ({}),
  }
});

// props.classesList
const filteredData = computed(() => {
  if (props.keyword && Array.isArray(props.classesList)) {
    const keywordWithoutSpaces = props.keyword.trim();
    return props.classesList.filter(classItem => {
      return classItem && classItem.classname && classItem.classname.toLowerCase().includes(keywordWithoutSpaces.toLowerCase());
    });
  } else {
    return props.classesList;
  }
});

</script>

<template>
  <div class="class-table">
    <el-table
      :data="filteredData"
      style="width: auto"
      border
      max-height="380"
    >
      <el-table-column prop="classid" label="班级ID" width="180" />
      <el-table-column prop="classname" label="班级名称" width="300" />
      <el-table-column prop="teacherid" label="教师ID" width="auto" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" size="default">加入班级 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped lang="less">
.class-table {
  position: relative;
  height: auto;
  border-radius: 10px; // 添加圆角
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); // 添加阴影
  overflow: hidden; // 防止遮挡样式

  .pager {
    position: absolute;
    right: 0;
    bottom: 20px;
  }

  .table-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
    margin-top: 5px;
    margin-left: 5px;
  }
}
</style>
