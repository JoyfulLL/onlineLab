import service from "@/services/axios.js";

export function login(username, password) {
  return service.post("/login", { name: username, password: password });
}

export function checkToken() {
  const token = localStorage.get("token");
  return service.get("/isvalid", { Authorization: `Bearer ${token}` });
}

export  function regStu(name,password,email,realName,userSchoollD,schoolCode,studentClass,sex){
  return service.post("/register",{name:name,password:password, email:email, realName:realName, userSchoollD:userSchoollD,schoolCode:schoolCode,"class": studentClass,sex:sex})
}
