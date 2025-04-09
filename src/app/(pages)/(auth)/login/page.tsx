"use client"

import { useState } from "react"
import { Form, Input, Button, Checkbox, message } from "antd"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth" 

import { LockOutlined, MobileOutlined } from "@ant-design/icons"

export default function LoginPage() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true)
      // 这里应该调用真实的登录API
      // 目前使用模拟数据
      const { phone, password, remember } = values

      // 模拟API调用延迟
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 假设登录成功
      message.success("登录成功")

      // 重定向到首页
      router.push("/")
    } catch (error) {
      console.error("登录失败:", error)
      message.error("登录失败，请检查手机号和密码")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-form">
      <h2 className="form-title">欢迎回来</h2>
      <Form form={form} name="login" onFinish={handleSubmit} layout="vertical" requiredMark={false}>
        <Form.Item
          name="phone"
          label={<div className="form-item-label">手机号码</div>}
          rules={[
            { required: true, message: "请输入手机号码" },
            { pattern: /^1[3-9]\d{9}$/, message: "请输入有效的手机号码" },
          ]}
        >
          <Input prefix={<MobileOutlined />} placeholder="请输入手机号码" size="large" />
        </Form.Item>

        <Form.Item
          name="password"
          label={<div className="form-item-label">密码</div>}
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" size="large" />
        </Form.Item>

        <div className="forgot-password">
          <Link href="/reset-password">忘记密码？</Link>
        </div>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-button" loading={loading}>
            登录
          </Button>
        </Form.Item>
      </Form>

      <div className="form-footer">
        还没有账号？ <Link href="/register">立即注册</Link>
      </div>
    </div>
  )
}
