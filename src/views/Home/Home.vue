<template>
  <div>
    <h2>User Information</h2>
    <ul>
      <li v-for="user in userInfo" :key="user.id">
        <p>ID: {{ user.id }}</p>
        <p>Name: {{ user.name }}</p>
        <p>Email: {{ user.email }}</p>
        <p>Real Name: {{ user.realName }}</p>
        <p>User School ID: {{ user.userSchoolID }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import {checkToken} from "@/api/manager";
onMounted(() => {
  checkToken()
})
export default {
  data() {
    return {
      userInfo: [
        {
          id: 16586401537593344,
          name: "123",
          email: "123@123.com",
          realName: "123",
          userSchoolID: "123"
        },
        {
          id: 16770447244791810,
          name: "ABIG",
          email: "123@123.com",
          realName: "梁俊枫"
        },
        {
          id: 17506392806002688,
          name: "testValid",
          email: "123@123.com",
          realName: "qq"
        }
      ]
    };
  }
};
</script>


<script setup>



</script>

<style scoped lang="less">

</style>