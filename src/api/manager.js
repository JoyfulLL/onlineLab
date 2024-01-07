import service from "@/services/axios.js";

export function login(username, password) {
  return service.post("/login", { name: username, password: password });
}

export function checkToken() {
  //用于检验token的合法性，必须在生命周期函数onMounted中调用
  const token = localStorage.getItem("token");
  if (token == "") {
    this.$router.push("/");
    return;
  }
  service
      .get("/isvalid", { Authorization: `Bearer ${token}` })
      .then((res) => {
        const { status, data } = res.data;
        if (status != 0) {
          this.$router.push("/");
        }
      })
      .catch((err) => {});
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
  return service.get("/authrequired/student/{action}");
}
