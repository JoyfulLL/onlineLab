import service from "@/utils/axios.js";
import { useAuthStore } from "@/stores/tokenStore.js";
import router from "@/router";
import {errorMessages} from "@/utils/errorMessagesCode";
import {ElNotification} from "element-plus";

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
  const useAuth = useAuthStore();
  const token = useAuth.data.token;
  service
    .get("/isvalid", { Authorization: `Bearer ${token}` })
    .then((res) => {
      if (res.data.status === 0) {
        console.log("token验证通过,存储获得的数据");
        useAuth.setCheckTokenData(res.data.data);
          //console.log(useAuth.data.scope)
      }
    })
    .catch((e) => {
        let errorMessage = "失败";
        if (e.response && e.response.data && e.response.data.status) {
            errorMessage = errorMessages[e.response.data.status] || "未知错误";
            window.location.href = "/login";
        } else {
            errorMessage = "未知错误";
        }
        ElNotification({
            title: "错误",
            message: errorMessage,
            type: "error",
            duration: 5000,
        });
      //window.location.href = "/login";
    });
}

// 根据用户权限选择API
// export function showUserInfo(scope) {
//   if (scope === "teacher") {
//     return service.get("/authrequired/teacher/{action}");
//   } else {
//     return service.get("/authrequired/student/{action}");
//   }
// }
