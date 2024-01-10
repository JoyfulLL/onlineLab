import service from "@/services/axios.js";
import router from '@/router'

//首先在setup中定义

export function login(username, password) {
    return service.post("/login", {name: username, password: password});
}

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

export function getStuInfo() {
    return service.get("/authrequired/admin/students/{action}")
}


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