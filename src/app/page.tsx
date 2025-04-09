"use client"
import { Typography } from "antd"
import MainLayout from "@/components/layout/MainLayout"

const { Title } = Typography

export default function Home() {
  return (
    <MainLayout>
      <div className="home-page">
        <Title>法律论坛首页</Title>
        <p>这里是法律论坛首页内容，您可以根据需要进行开发。</p>
      </div>
    </MainLayout>
  )
}
