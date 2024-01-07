<template>
  <admin-layout>
    <template #content>这是后台总览</template>
  </admin-layout>
</template>

<script>
import AdminLayout from "@/layout/adminBasic/adminLayout.vue";

export default {
  name: "adminIndex",
  components: {
    AdminLayout,
  },
};
</script>
