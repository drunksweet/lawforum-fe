// 全局类型定义
export interface User {
    id: string
    username: string
    avatar?: string
    role: "admin" | "lawyer" | "user"
    createdAt: Date
  }
  
  export interface Post {
    id: string
    title: string
    content: string
    author: User
    category: string
    tags: string[]
    createdAt: Date
    updatedAt: Date
    viewCount: number
    likeCount: number
    commentCount: number
  }
  
  export interface Comment {
    id: string
    content: string
    author: User
    postId: string
    createdAt: Date
    updatedAt: Date
    parentId?: string
  }
  