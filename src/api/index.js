/**
* @fileName index.js 
* @description 登录API,token校验API
* @author LJF
*/

import service from "@/utils/axios.js";
import { useAuthStore } from "@/stores/tokenStore.js";


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
      }
    })
}
