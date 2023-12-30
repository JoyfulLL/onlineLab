<template>
    登录成功，进入实验平台首页
</template>

<script setup>
// 引入 vue 的相关 API
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'

// 定义组件名
const name = 'Home'

// 定义响应式数据
const data = reactive({
    // 在这里添加你的数据属性
})

// 定义计算属性
const computedProperty = computed(() => {
    // 在这里添加你的计算逻辑
})

// 定义方法
function method() {
    // 在这里添加你的方法逻辑
}

// 定义生命周期钩子
onMounted(() => {
    // 在这里添加你的挂载后逻辑
})

onUnmounted(() => {
    // 在这里添加你的卸载前逻辑
})

// 返回值，暴露给模板使用
// return {
//     name,
//     data,
//     computedProperty,
//     method
// }
</script>
