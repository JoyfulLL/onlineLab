<script setup lang="ts">
/**
 * @file  testCharts
 * @author ljf13
 * @description
 * @date 2024/1/13
 */

import { defineComponent ,onMounted ,getCurrentInstance ,ref } from 'vue'
const echarts = getCurrentInstance().appContext.config.globalProperties.$echarts;

onMounted( () =>{
  // 基于准备好的dom，初始化echarts实例
  let myChart = echarts.init(document.getElementById("myChart"));
  // 绘制图表
  myChart.setOption({
    tooltip: {},
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20, 20, 36, 10, 10, 20],
      },
    ],
  });
})



</script>

<template>

</template>

<style scoped lang="less">

</style>