// 认证相关 API
import api from "./index"

// 登录
export const login = (username: string, password: string) => {
  return api.post("/auth/login", { username, password })
}

// 注册
export const register = (username: string, password: string, email: string) => {
  return api.post("/auth/register", { username, password, email })
}

// 登出
export const logout = () => {
  return api.post("/auth/logout")
}

// 获取当前用户信息
export const getCurrentUser = () => {
  return api.get("/auth/me")
}
