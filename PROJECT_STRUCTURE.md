# AI Command Center - 项目结构设计

## 目录结构

```
ai-command-center/
├── README.md
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── prisma/
│   └── schema.prisma
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── toast.tsx
│   │   │   └── dropdown-menu.tsx
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── main-layout.tsx
│   │   ├── chat/
│   │   │   ├── chat-interface.tsx
│   │   │   ├── message-list.tsx
│   │   │   ├── message-input.tsx
│   │   │   └── typing-indicator.tsx
│   │   ├── session/
│   │   │   ├── session-list.tsx
│   │   │   ├── session-item.tsx
│   │   │   └── session-manager.tsx
│   │   ├── file/
│   │   │   ├── file-upload.tsx
│   │   │   ├── file-preview.tsx
│   │   │   └── file-manager.tsx
│   │   └── settings/
│   │       ├── settings-panel.tsx
│   │       ├── preferences.tsx
│   │       └── appearance.tsx
│   ├── hooks/
│   │   ├── use-chat.ts
│   │   ├── use-session.ts
│   │   ├── use-file.ts
│   │   └── use-settings.ts
│   ├── stores/
│   │   ├── chat-store.ts
│   │   ├── session-store.ts
│   │   ├── file-store.ts
│   │   └── settings-store.ts
│   ├── services/
│   │   ├── api-service.ts
│   │   ├── database-service.ts
│   │   ├── process-service.ts
│   │   └── file-service.ts
│   ├── types/
│   │   ├── chat.ts
│   │   ├── session.ts
│   │   ├── file.ts
│   │   └── settings.ts
│   ├── utils/
│   │   ├── process-utils.ts
│   │   ├── file-utils.ts
│   │   ├── date-utils.ts
│   │   └── validation.ts
│   └── assets/
│       ├── icons/
│       ├── images/
│       └── styles/
├── src-tauri/
│   ├── Cargo.toml
│   ├── tauri.conf.json
│   ├── src/
│   │   ├── main.rs
│   │   ├── cmd.rs
│   │   ├── process.rs
│   │   └── database.rs
│   └── build.rs
├── public/
│   ├── index.html
│   └── favicon.ico
├── tests/
│   ├── components/
│   ├── services/
│   └── utils/
└── docs/
    ├── API.md
    ├── SETUP.md
    └── TROUBLESHOOTING.md
```

## 核心模块说明

### 1. 前端模块 (src/)
- **components/**: 可复用的UI组件
- **hooks/**: 自定义React hooks
- **stores/**: 状态管理 (Zustand)
- **services/**: 业务逻辑服务
- **types/**: TypeScript类型定义
- **utils/**: 工具函数

### 2. 后端模块 (src-tauri/)
- **main.rs**: 主入口点
- **cmd.rs**: 命令处理
- **process.rs**: 进程管理
- **database.rs**: 数据库操作

### 3. 数据库模块 (prisma/)
- **schema.prisma**: 数据库模型定义

## 技术栈

### 前端技术栈
- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **UI组件**: shadcn/ui
- **状态管理**: Zustand
- **路由**: React Router
- **桌面框架**: Tauri

### 后端技术栈
- **语言**: Rust
- **框架**: Tauri
- **数据库**: SQLite
- **ORM**: Prisma

### 开发工具
- **包管理**: npm
- **代码格式化**: Prettier
- **代码检查**: ESLint
- **Git**: GitHub + Git Flow
- **测试**: Jest + React Testing Library

## 核心功能模块

### 1. 聊天模块 (chat/)
- 聊天界面
- 消息列表
- 消息输入
- 打字指示器

### 2. 会话模块 (session/)
- 会话列表
- 会话管理
- 会话搜索

### 3. 文件模块 (file/)
- 文件上传
- 文件预览
- 文件管理

### 4. 设置模块 (settings/)
- 偏好设置
- 外观设置
- 快捷键设置

## 数据流设计

```
用户操作 → React组件 → Zustand Store → Service层 → Tauri后端 → Claude Code CLI → 系统调用
```

## 安全考虑

1. **进程管理**: 实现超时机制和强制杀死
2. **数据安全**: 本地存储，加密敏感信息
3. **权限控制**: 最小权限原则
4. **输入验证**: 严格验证用户输入

## 性能优化

1. **虚拟滚动**: 处理大量消息
2. **懒加载**: 按需加载组件
3. **缓存策略**: 合理使用缓存
4. **内存管理**: 防止内存泄漏