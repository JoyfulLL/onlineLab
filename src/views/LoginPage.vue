<script setup>
import loginCom from "@/components/auth/loginCom.vue"
import { useToggle } from "@vueuse/shared"
import { useDark ,usePreferredDark} from "@vueuse/core"

// 根据用户设备的主题模式，自动设置亮暗模式
// 当用户进入系统后，手动切换了主题模式，退出登陆后仍能保持退出前设置的主题
// 再次进入系统，依旧是上次设定的主题

onMounted(() => {
  const storedColorScheme = localStorage.getItem("vueuse-color-scheme")
  const isDarkPreferred = usePreferredDark()

  // 如果 localStorage 中存储了偏好设置，则根据 localStorage 中的设置来设置主题
  if (storedColorScheme) {
    toggleDark.value = storedColorScheme === 'dark'
  } else {
    // 否则，根据系统偏好设置来设置主题
    toggleDark.value = isDarkPreferred
  }
})

let isDark = useDark({
  disableTransition: false,
  valueDark: "dark",
  valueLight: "light",
})

const toggleDark = useToggle(isDark)

// 监听 isDark 变量的变化，并在变化时更新 localStorage 中的值
watch(() => toggleDark.value, (newValue) => {
  localStorage.setItem('vueuse-color-scheme', newValue ? 'dark' : 'light')
})

</script>

<template>
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
