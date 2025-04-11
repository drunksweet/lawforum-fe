# 法律社区前台

## 项目介绍

法律社区前台前端,厂品定位为法律社交平台
### 主要技术栈

本项目由 Next.js + TS + AntD + pnpm 搭建
### 环境

Node.js 22.11.0

## Getting Started

本地预览 `git clone git@github.com:drunksweet/lawforum-fe.git && cd lawforum-fe && pnpm install && pnpm dev`

## ✨ 提交规范
🎉 init：项目初始化

✨ feat：新增功能（feature）

🐞 fix：修复bug

📃 docs：文档修改

🌈 style：代码样式修改，不影响原代码逻辑

✅ test：测试相关的改动

🔨 refactor：代码重构

🔧 chore：建制过程或辅助工具的变动

## 项目结构

src/
├── api/                # API 请求封装
├── app/                # Next.js App Router 路由
├── components/         # 组件
│   ├── common/         # 通用组件
│   └── layout/         # 布局组件
├── hooks/              # 自定义 Hooks
├── store/              # 全局状态管理
├── styles/             # 全局样式
├── types/              # TypeScript 类型定义
└── utils/              # 工具函数