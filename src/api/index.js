import service from "@/utils/axios.js";
import { useAuthStore } from "@/stores/tokenStore";
import router from "@/router";

/**
 * @API
 * 登录API,token校验API
 * **/

//首先在setup中定义
// 登录接口
export function login(username, password) {
  return service.post("/login", { name: username, password: password });
}

// token校验
export function checkToken() {
  //用于检验token的合法性，必须在生命周期函数onMounted中调用
  const token = localStorage.getItem("token");
  const useAuth = useAuthStore();
  service
    .get("/isvalid", { Authorization: `Bearer ${token}` })
    .then((res) => {
      if (res.data.status === 0) {
        console.log("token验证通过");
        useAuth.storeCheckTokenData(res.data.data);
        // for (const id in useAuth.userInfoArray) {
        //   console.log(useAuth.userInfoArray[id]);
        // }
      }
    })
    .catch((e) => {
      window.location.href = "/login";
    });
}

// 根据用户权限选择API
export function showUserInfo(scope) {
  if (scope === "teacher") {
    return service.get("/authrequired/teacher/{action}");
  } else {
    return service.get("/authrequired/student/{action}");
  }
}
