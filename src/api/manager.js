import service from "@/services/axios.js";
import router from '@/router'

//首先在setup中定义
// 登录接口
export function login(username, password) {
    return service.post("/login", {name: username, password: password});
}

// token校验
export function checkToken() {
    //用于检验token的合法性，必须在生命周期函数onMounted中调用
    const token = localStorage.getItem("token");
    service
        .get("/isvalid", {Authorization: `Bearer ${token}`})
        .then((res) => {
            if (res.data.status === 0) {
                console.log("token验证通过");
            }
        })
        .catch((err) => {
            window.location.href = "/login"
        });
}

//@ 学生注册
export function regStu(
    name,
    password,
    email,
    realName,
    userSchoollD,
    schoolCode,
    studentClass,
    sex,
) {
    return service.post("/register", {
        name: name,
        password: password,
        email: email,
        realName: realName,
        userSchoollD: userSchoollD,
        schoolCode: schoolCode,
        class: studentClass,
        sex: sex,
    });
}

// @获取所有学生信息
// action：查询过滤器，如果没有默认查询所以信息
export function getStuInfo() {
    return service.get("/authrequired/admin/students/{action}")
}


// @修改指定学生信息
export function editStuInfo(
    id,
    name,
    email,
    realName,
    userSchoollD,
    schoolCode,
    studentClass,
    sex,
) {
    return service.patch('/authrequired/admin/student', {
        id:id,
        name: name,
        email: email,
        realName: realName,
        userSchoollD: userSchoollD,
        schoolCode: schoolCode,
        class: studentClass,
        sex: sex,
    })
}