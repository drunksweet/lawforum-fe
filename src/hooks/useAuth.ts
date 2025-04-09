"use client"

// 认证相关自定义Hook
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store"
import { getCurrentUser, login as apiLogin } from "@/api/auth"
import type { User } from "@/types"

export const useAuth = () => {
  const { user, token, isAuthenticated, setUser, setToken, logout } = useAuthStore()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  const login = async (username: string, password: string) => {
    try {
      const response = await apiLogin(username, password)
      const { user, token } = response.data
      setUser(user)
      setToken(token)
      return { success: true, user }
    } catch (error) {
      return { success: false, error }
    }
  }

  const checkAuth = async () => {
    if (token && !user) {
      try {
        const userData = await getCurrentUser()
        setUser(userData.data as User)
      } catch (error) {
        logout()
      } finally {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [token, user])

  const requireAuth = (redirectTo = "/login") => {
    useEffect(() => {
      if (!isAuthenticated && !token && !loading) {
        router.push(redirectTo)
      }
    }, [isAuthenticated, token, loading, router, redirectTo])

    return { isAuthenticated, user, loading }
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
    checkAuth,
    requireAuth,
    loading,
  }
}
