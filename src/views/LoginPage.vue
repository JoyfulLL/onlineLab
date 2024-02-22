<script>
import loginCom from "@/components/auth/loginCom.vue"

export default {
  name: "login",
  components: {
    loginCom,
  },
}
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
  bottom: 5px;
  left: 0;
  width: 100%;
  background-color: transparent;
  padding: 10px 0;
  text-align: center;
}

.footerLink {
  font-size: medium;
}
</style>
