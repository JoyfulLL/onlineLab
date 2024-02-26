<script setup>
import loginCom from "@/components/auth/loginCom.vue"
import { useToggle } from "@vueuse/shared"
import { useDark } from "@vueuse/core"
/* start——暗黑模式 */
const theme = ref(false)
const isDark = useDark({
  // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
  storageKey: "useDarkKEY",
  // 暗黑class名字
  valueDark: "dark",
  // 高亮class名字
  valueLight: "light",
})
console.log(isDark.value)
if (isDark.value == false) {
  theme.value = false
} else {
  theme.value = true
}
const toggle = useToggle(isDark)
/* End——暗黑模式 */
</script>

<template>
  <el-switch
        inline-prompt
        :style="{ marginLeft: '10px' }"
        active-color="#000"
        active-text="暗黑主题"
        inactive-text="默认"
        v-model="theme"
        @click="toggle()"
      ></el-switch>
  <div>
    <loginCom />
  </div>
  <div class="footer">
    <el-link
      href="https://beian.miit.gov.cn/"
      target="_blank"
      type="default"
      class="footerLink"
    >
      粤ICP备2024184954号-1
    </el-link>
  </div>
</template>

<style lang="less">
.footer {
  position: fixed;
  bottom: 0px;
  left: 0;
  width: 100%;
  padding: 10px 0;
  text-align: center;
}

.footerLink {
  font-size: medium;
}
</style>
