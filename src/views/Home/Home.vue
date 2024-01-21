<template>
  <div class="chart-container">
    <el-card class="box-card">
      <div ref="chart" style="width: 600px; height: 400px"></div>
    </el-card>
    <el-card class="box-card">
      <div ref="gaugeChart" style="width: 400px; height: 400px"></div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import { checkToken } from "@/api";

const chart = ref(null);
const gaugeChart = ref(null);
onMounted(() => {
  let myChart = echarts.init(chart.value);
  let gaugeChart1 = echarts.init(gaugeChart.value);
  let tasks = ["实验1", "实验2", "实验3", "实验4", "实验5"];
  let todo = [20, 15, 30, 25, 10];
  // 绘制图表
  myChart.setOption({
    title: {
      text: "学生实验完成情况",
    },
    tooltip: {},
    xAxis: {
      data: tasks,
    },
    yAxis: {},
    series: [
      {
        name: "完成人数",
        type: "bar",
        data: todo,
      },
    ],
  });

  // 绘制仪表盘
  gaugeChart1.setOption({
    xAxis: {
      type: "category",
      data: ["Matcha Latte", "Milk Tea", "Cheese Cocoa", "Walnut Brownie"],
    },
    yAxis: {},
    series: [
      {
        type: "bar",
        name: "2015",
        data: [89.3, 92.1, 94.4, 85.4],
      },
      {
        type: "bar",
        name: "2016",
        data: [95.8, 89.4, 91.2, 76.9],
      },
      {
        type: "bar",
        name: "2017",
        data: [97.7, 83.1, 92.5, 78.1],
      },
    ],
  });
  checkToken();
});
</script>

<style scoped lang="less">
.chart-container {
  display: flex;
}

.box-card {
  flex: 1;
  margin-right: 20px;
  height: 400px;
  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>
