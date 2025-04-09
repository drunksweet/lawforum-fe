// 帖子相关 API
import api from "./index"
import type { Post } from "@/types"

// 获取帖子列表
export const getPosts = (page = 1, limit = 10, category?: string) => {
  return api.get("/posts", { params: { page, limit, category } })
}

// 获取帖子详情
export const getPostById = (id: string) => {
  return api.get(`/posts/${id}`)
}

// 创建帖子
export const createPost = (post: Partial<Post>) => {
  return api.post("/posts", post)
}

// 更新帖子
export const updatePost = (id: string, post: Partial<Post>) => {
  return api.put(`/posts/${id}`, post)
}

// 删除帖子
export const deletePost = (id: string) => {
  return api.delete(`/posts/${id}`)
}
