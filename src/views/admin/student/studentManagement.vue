<template>
  <admin-layout :selectedKeys="selectedKeys">
    <template #breadNav><a href="/admin/student">学生管理</a></template>
    <template #content>
      <div>
        <ul>
          <li v-for="student in students" :key="student.id">
            <div>
              <p>姓名: {{ student.name }}</p>
              <p>真实姓名: {{ student.realName }}</p>
              <p>性别: {{ student.sex }}</p>
              <p>邮箱: {{ student.email }}</p>
              <p>学校代码: {{ student.schoolCode }}</p>
              <p>班级: {{ student.class }}</p>
              <p>学校ID: {{ student.userSchoolID }}</p>
            </div>
          </li>
        </ul>
        <button @click="showItClick">点击</button>
      </div>
    </template>
  </admin-layout>
</template>

<script>
import AdminLayout from "@/layout/adminBasic/adminLayout.vue";
import { UserOutlined } from "@ant-design/icons-vue";
import { onMounted } from "vue";

export default {
  name: "basic",
  data() {
    return {
      selectedKeys: ["2"],
      students: [],
    };
  },
  methods: {
    showItClick() {},
  },
  components: { UserOutlined, AdminLayout },
};
</script>

<style scoped></style>
