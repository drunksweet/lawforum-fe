// API 请求封装
import axios from "axios"

// 根据环境变量决定API基础URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api"

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 从localStorage获取token (仅在客户端)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // 处理错误，如401未授权、500服务器错误等
    return Promise.reject(error)
  },
)

export default api
