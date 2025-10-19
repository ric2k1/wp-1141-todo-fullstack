# 📝 Todo Fullstack Application

一个现代化的全栈 Todo 应用，使用 React + TypeScript + Express + PostgreSQL + Prisma + Nginx 构建。

## 🎯 项目简介

这是一个功能完整的全栈待办事项管理应用，支持创建、查看、更新、删除 todos，所有数据持久化存储在 PostgreSQL 数据库中。

### ✨ 特色功能

- 🎨 现代化 React 前端（TypeScript）
- 🚀 Express RESTful API 后端
- 🗄️ PostgreSQL 数据库
- 🔍 Prisma ORM
- ✅ Zod 数据验证
- 🌐 Nginx 反向代理
- 📦 一键启动所有服务
- 💾 数据持久化
- 🎭 Loading 和错误状态处理
- 🔄 热更新支持

## 🏗️ 技术栈

### 前端 (frontend/)
- **React 19.1.1** - UI 框架
- **TypeScript 5.9.3** - 类型安全
- **Vite 7.1.2** - 构建工具
- **Axios** - HTTP 客户端
- **CSS3** - 样式设计

### 后端 (backend/)
- **Node.js** - 运行时环境
- **Express 4.18** - Web 框架
- **Prisma 5.0** - ORM
- **PostgreSQL** - 数据库
- **Zod 3.22** - 数据验证
- **TypeScript 5.3** - 类型安全
- **tsx** - TypeScript 执行器

### 基础设施
- **Nginx** - 反向代理
- **Git** - 版本控制

## 📁 项目结构

```
todo-fullstack/
├── frontend/                 # 前端应用
│   ├── src/
│   │   ├── components/       # React 组件
│   │   │   ├── AddTodo.tsx
│   │   │   ├── TodoItem.tsx
│   │   │   └── TodoList.tsx
│   │   ├── hooks/            # 自定义 Hooks
│   │   │   └── useAddTodoForm.ts
│   │   ├── services/         # API 服务层
│   │   │   └── api.ts
│   │   ├── types/            # TypeScript 类型
│   │   │   └── todo.ts
│   │   ├── App.tsx           # 主应用组件
│   │   └── main.tsx          # 应用入口
│   ├── public/               # 静态资源
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/                  # 后端应用
│   ├── src/
│   │   ├── controllers/      # 业务逻辑
│   │   │   └── todoController.ts
│   │   ├── routes/           # API 路由
│   │   │   └── todoRoutes.ts
│   │   ├── validators/       # Zod 验证
│   │   │   └── todoSchemas.ts
│   │   └── index.ts          # 服务器入口
│   ├── prisma/
│   │   └── schema.prisma     # 数据库模型
│   ├── package.json
│   ├── tsconfig.json
│   └── .env                  # 环境变量
│
├── nginx.conf                # Nginx 配置
├── start-all.sh              # 启动脚本
├── stop-all.sh               # 停止脚本
└── README.md                 # 项目文档
```

## 🚀 前置要求

在开始之前，请确保您的系统已安装以下软件：

### 必需软件

1. **Node.js** (>= 16.0)
   ```bash
   node --version  # 应显示 v16.0 或更高
   ```

2. **npm** (通常随 Node.js 一起安装)
   ```bash
   npm --version
   ```

3. **PostgreSQL** (>= 12.0)
   ```bash
   # macOS (使用 Homebrew)
   brew install postgresql
   brew services start postgresql
   
   # 验证安装
   psql --version
   pg_isready
   ```

4. **Nginx**
   ```bash
   # macOS (使用 Homebrew)
   brew install nginx
   
   # 验证安装
   nginx -v
   ```

5. **Git**
   ```bash
   git --version
   ```

## 📥 安装步骤

### 1. 克隆项目

```bash
git clone <repository-url>
cd todo-fullstack
```

### 2. 创建数据库

```bash
createdb tododb
```

### 3. 配置环境变量

后端的 `.env` 文件应已存在于 `backend/` 目录，内容如下：

```env
DATABASE_URL="postgresql://postgres@localhost:5432/tododb"
PORT=3000
NODE_ENV=development
```

如果您的 PostgreSQL 配置不同，请修改 `DATABASE_URL`。

### 4. 安装依赖

依赖会在首次运行 `start-all.sh` 时自动安装，或手动安装：

```bash
# 后端依赖
cd backend
npm install
cd ..

# 前端依赖
cd frontend
npm install
cd ..
```

### 5. 运行数据库迁移

```bash
cd backend
npx prisma migrate dev --name init
cd ..
```

## 🎮 运行应用

### 方式一：一键启动（推荐）

```bash
./start-all.sh
```

这将依次启动：
1. ✅ 检查 PostgreSQL 运行状态
2. 📦 后端服务器 (http://localhost:3000)
3. 🎨 前端开发服务器 (http://localhost:5173)
4. 🌐 Nginx 反向代理 (http://localhost:8080)

**访问应用**：在浏览器打开 http://localhost:8080

**停止服务**：按 `Ctrl+C` 或运行 `./stop-all.sh`

### 方式二：单独启动

#### 启动后端
```bash
cd backend
npm run dev
```

#### 启动前端
```bash
cd frontend
npm run dev
```

#### 启动 Nginx
```bash
nginx -c $(pwd)/nginx.conf
```

#### 停止 Nginx
```bash
nginx -s stop
```

## 🔌 API 端点

### Base URL
- 开发环境：`http://localhost:3000/api`
- 通过 Nginx：`http://localhost:8080/api`

### 端点列表

#### 获取所有 Todos
```http
GET /api/todos
```

**响应示例：**
```json
[
  {
    "id": 1,
    "text": "买菜",
    "description": "晚上做饭用",
    "completed": false,
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T10:00:00.000Z"
  }
]
```

#### 创建新 Todo
```http
POST /api/todos
Content-Type: application/json

{
  "text": "买菜",
  "description": "晚上做饭用"  // 可选
}
```

**响应：** `201 Created`

#### 更新 Todo
```http
PUT /api/todos/:id
Content-Type: application/json

{
  "text": "买菜和水果",           // 可选
  "description": "晚上做饭用",    // 可选
  "completed": true               // 可选
}
```

**响应：** `200 OK` 或 `404 Not Found`

#### 删除 Todo
```http
DELETE /api/todos/:id
```

**响应：** `204 No Content` 或 `404 Not Found`

## 🗄️ 数据库模型

```prisma
model Todo {
  id          Int      @id @default(autoincrement())
  text        String
  description String   @default("")
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🧪 测试

### 测试后端 API

```bash
# 获取所有 todos
curl http://localhost:3000/api/todos

# 创建 todo
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"Test Todo","description":"Test description"}'

# 更新 todo
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# 删除 todo
curl -X DELETE http://localhost:3000/api/todos/1
```

### 测试前端

1. 访问 http://localhost:8080
2. 创建新的 todo
3. 切换完成状态
4. 点击 todo 展开描述
5. 删除 todo
6. 刷新页面确认数据持久化

## 📚 Git Tags 使用说明

本项目使用 Git tags 标记每个开发步骤，方便代码审查和学习：

### 查看所有 tags
```bash
git tag -l
```

### 输出示例
```
step-1-backend-init
step-2-prisma-setup
step-3-api-implementation
step-4-frontend-restructure
step-5-api-service-layer
step-6-frontend-integration
step-7-nginx-config
step-8-startup-scripts
step-9-final-testing
```

### 切换到特定步骤
```bash
git checkout step-3-api-implementation
```

### 查看 tag 详细信息
```bash
git show step-3-api-implementation
```

### 返回主分支
```bash
git checkout main  # 或 master
```

### 各步骤说明

1. **step-1-backend-init**: 后端项目初始化
2. **step-2-prisma-setup**: Prisma 和数据库配置
3. **step-3-api-implementation**: RESTful API 实现
4. **step-4-frontend-restructure**: 前端目录重组
5. **step-5-api-service-layer**: 前端 API 服务层
6. **step-6-frontend-integration**: 前端后端集成
7. **step-7-nginx-config**: Nginx 反向代理配置
8. **step-8-startup-scripts**: 启动脚本
9. **step-9-final-testing**: 最终测试和文档

## 🐛 常见问题

### PostgreSQL 连接失败

**问题：** `Error: connect ECONNREFUSED`

**解决：**
```bash
# 启动 PostgreSQL
brew services start postgresql

# 或
pg_ctl -D /usr/local/var/postgres start
```

### 端口被占用

**问题：** `Error: listen EADDRINUSE: address already in use`

**解决：**
```bash
# 查找占用端口的进程
lsof -i :3000  # 后端
lsof -i :5173  # 前端
lsof -i :8080  # Nginx

# 终止进程
kill -9 <PID>
```

### Nginx 启动失败

**问题：** `nginx: [emerg] bind() to 0.0.0.0:8080 failed`

**解决：**
```bash
# 停止现有 Nginx
nginx -s stop

# 或杀死所有 Nginx 进程
pkill nginx
```

### 数据库迁移失败

**问题：** Prisma 迁移错误

**解决：**
```bash
cd backend

# 重置数据库（注意：会删除所有数据）
npx prisma migrate reset

# 重新迁移
npx prisma migrate dev --name init
```

## 🔧 开发命令

### 后端

```bash
cd backend

# 开发模式（热重载）
npm run dev

# 构建
npm run build

# 生产运行
npm start

# Prisma 命令
npx prisma studio          # 数据库 GUI
npx prisma migrate dev     # 创建迁移
npx prisma generate        # 生成客户端
```

### 前端

```bash
cd frontend

# 开发模式
npm run dev

# 构建
npm run build

# 预览构建
npm run preview

# 代码检查
npm run lint
```

## 📦 生产部署

### 构建应用

```bash
# 后端
cd backend
npm run build

# 前端
cd frontend
npm run build
```

### 配置生产环境

1. 修改 `backend/.env`：
   ```env
   NODE_ENV=production
   DATABASE_URL="your-production-database-url"
   ```

2. 配置 Nginx 使用生产构建：
   ```nginx
   location / {
       root /path/to/frontend/dist;
       try_files $uri $uri/ /index.html;
   }
   ```

3. 使用 PM2 管理后端进程：
   ```bash
   npm install -g pm2
   pm2 start backend/dist/index.js --name todo-backend
   ```

## 📝 授权

MIT License

## 👥 贡献

欢迎提交 Pull Request 或 Issue！

## 📞 联系方式

如有问题，请创建 GitHub Issue。

---

⭐ 如果这个项目对您有帮助，请给一个 Star！
