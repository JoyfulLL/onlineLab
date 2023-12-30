<template>
    <div class="login-container">
        <el-form ref="regForm" :model="regForm" :rules="regRules" label-position="top">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="regForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="regForm.password"></el-input>
            </el-form-item>
            <el-form-item label="请再次输入密码" prop="password">
                <el-input type="password" v-model="regForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="regNow">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script>
export default {
    name: 'zhuce',
    data() {
        return {
            regForm: {
                username: '',
                password: ''
            },
            //注册规则，用户名和密码不能为空
            regRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        regNow() {
            //注册
            //将表单数据推送至后端,注册成功，跳回登录界面,即/
            this.$router.push('/');
        }
    }
};
</script>
 
 

 

<style>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>