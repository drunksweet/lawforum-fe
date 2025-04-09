"use client"

import { useState, useEffect } from "react"
import { Form, Input, Button, Checkbox, message } from "antd"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LockOutlined, MobileOutlined, UserOutlined } from "@ant-design/icons"

export default function RegisterPage() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const router = useRouter()

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  const handleSendVerificationCode = async () => {
    try {
      // 验证手机号
      await form.validateFields(["phone"])
      const phone = form.getFieldValue("phone")

      // 模拟发送验证码
      message.success(`验证码已发送至 ${phone}`)
      setCountdown(60)
    } catch (error) {
      // 验证失败
    }
  }

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true)
      const { name, phone, verificationCode, password, confirmPassword, agreement } = values

      if (!agreement) {
        message.error("请阅读并同意用户协议和隐私政策")
        setLoading(false)
        return
      }

      // 模拟API调用延迟
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 假设注册成功
      message.success("注册成功")

      // 重定向到登录页
      router.push("/login")
    } catch (error) {
      console.error("注册失败:", error)
      message.error("注册失败，请稍后再试")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-form">
      <h2 className="form-title">用户注册</h2>
      <Form form={form} name="register" onFinish={handleSubmit} layout="vertical" requiredMark={false}>
        <Form.Item
          name="name"
          label={<div className="form-item-label">姓名</div>}
          rules={[{ required: true, message: "请输入真实姓名" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="请输入真实姓名" size="large" />
        </Form.Item>

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
          name="verificationCode"
          label={<div className="form-item-label">验证码</div>}
          rules={[{ required: true, message: "请输入验证码" }]}
        >
          <div className="verification-code-container">
            <Input placeholder="请输入验证码" size="large" />
            <Button
              type="primary"
              className="verification-code-button"
              disabled={countdown > 0}
              onClick={handleSendVerificationCode}
            >
              {countdown > 0 ? `${countdown}秒后重试` : "获取验证码"}
            </Button>
          </div>
        </Form.Item>

        <Form.Item
          name="password"
          label={<div className="form-item-label">设置密码</div>}
          rules={[
            { required: true, message: "请设置密码" },
            { min: 8, message: "密码长度不能少于8位" },
            { max: 20, message: "密码长度不能超过20位" },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="请输入8-20位密码" size="large" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label={<div className="form-item-label">确认密码</div>}
          dependencies={["password"]}
          rules={[
            { required: true, message: "请确认密码" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error("两次输入的密码不一致"))
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="请再次输入密码" size="large" />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error("请阅读并同意用户协议和隐私政策")),
            },
          ]}
        >
          <Checkbox>
            我已阅读并同意 <Link href="/terms">《用户协议》</Link> 和 <Link href="/privacy">《隐私政策》</Link>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-button" loading={loading}>
            立即注册
          </Button>
        </Form.Item>
      </Form>

      <div className="form-footer">
        已有账号？ <Link href="/login">立即登录</Link>
      </div>
    </div>
  )
}
