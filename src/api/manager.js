import service from "@/services/axios.js";

export function login(username, password) {
  return service.post("/login", { name: username, password: password });
}

export function checkToken() {
  const token = localStorage.get("token");
  return service.get("/isvalid", { Authorization: `Bearer ${token}` });
}
