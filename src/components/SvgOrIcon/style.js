/**
 * @fileName style.js
 * @description This file contains functions and variables related to theme management and color calculation.
 * @author LJF
 * @date 2024/4/23
 */

import { ref, computed } from "vue"

// 获取当前主题
function getTheme() {
  const htmlClassList = document.documentElement.classList
  return htmlClassList.contains("dark") ? "dark" : "light"
}

const theme = ref(getTheme())

// 监听 HTML 元素的类变化来更新主题
function watchThemeChange() {
  const observer = new MutationObserver(() => {
    theme.value = getTheme()
  })
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
}

// 根据主题设置不同的填充颜色
function getFillColor(theme) {
  return theme === "light" ? "#3C405D" : "#D9ECFF"
}

// 定义主题响应式变量并监听主题变化
watchThemeChange()

// 导出一个计算属性，动态计算 fillColor 的值
export const fillColor = computed(() => getFillColor(theme.value))
