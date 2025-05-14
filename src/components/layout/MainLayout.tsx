"use client"

import type React from "react"
import MainHeader from "@/components/header/MainHeader";
import { Layout, ConfigProvider, theme } from "antd"
import { useTheme } from "next-themes"
import "./MainLayout.scss"

const { Content } = Layout

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#9c3353",
        },
      }}
    >
      <Layout className="main-layout">
        {/* <MainHeader /> */}
        <Content className="main-content">{children}</Content>
      </Layout>
    </ConfigProvider>
  )
}

export default MainLayout
