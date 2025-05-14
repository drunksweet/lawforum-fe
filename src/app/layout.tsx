import type React from "react";
import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import MainHeader from "@/components/header/MainHeader";
import { ConfigProvider, theme } from "antd"
import { ThemeProvider } from "next-themes";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "法律论坛 - 专业的法律交流平台",
  description:
    "法律论坛是一个专业的法律交流平台，提供法律咨询、案例分析、法律资源分享等服务",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <AntdRegistry>
          <ThemeProvider attribute="class" defaultTheme="system">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#9c3353",
                },
              }}
            >
              <MainHeader />
              {children}
            </ConfigProvider>
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
