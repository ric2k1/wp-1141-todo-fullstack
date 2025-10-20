# 📝 Todo Fullstack Application

一個現代化的全端 Todo 應用，使用 React + TypeScript + Express + PostgreSQL + Prisma + ngrok 構建。

## 🎯 專案簡介

這是一個功能完整的全端待辦事項管理應用，支援建立、查看、更新、刪除 todos，所有資料持久化儲存在 PostgreSQL 資料庫中。**使用 ngrok 可以產生公開網址，分享給任何人存取！**

### ✨ 特色功能

- 🎨 現代化 React 前端（TypeScript）
- 🚀 Express RESTful API 後端
- 🗄️ PostgreSQL 資料庫
- 🔍 Prisma ORM
- ✅ Zod 資料驗證
- 🌍 **ngrok 公網隧道 - 一鍵產生公開網址**
- 📦 一鍵啟動所有服務
- 💾 資料持久化
- 🎭 Loading 和錯誤狀態處理
- 🏗️ 後端服務前端靜態檔案

## 🏗️ 技術棧

### 前端 (frontend/)

- **React 19.1.1** - UI 框架
- **TypeScript 5.9.3** - 類型安全
- **Vite 7.1.2** - 構建工具
- **Axios** - HTTP 客戶端
- **CSS3** - 樣式設計

### 後端 (backend/)

- **Node.js** - 運行時環境
- **Express 4.18** - Web 框架
- **Prisma 5.0** - ORM
- **PostgreSQL** - 資料庫
- **Zod 3.22** - 資料驗證
- **TypeScript 5.3** - 類型安全
- **tsx** - TypeScript 執行器

### 基礎設施

- **ngrok** - 公網隧道（產生公開網址）
- **Git** - 版本控制

## 📁 專案結構

```
todo-fullstack/
├── frontend/                 # 前端應用
│   ├── src/
│   │   ├── components/       # React 元件
│   │   │   ├── AddTodo.tsx
│   │   │   ├── TodoItem.tsx
│   │   │   └── TodoList.tsx
│   │   ├── hooks/            # 自訂 Hooks
│   │   │   └── useAddTodoForm.ts
│   │   ├── services/         # API 服務層
│   │   │   └── api.ts
│   │   ├── types/            # TypeScript 類型
│   │   │   └── todo.ts
│   │   ├── App.tsx           # 主應用元件
│   │   └── main.tsx          # 應用入口
│   ├── public/               # 靜態資源
│   ├── index.html
│   ├── package.json
│   ├── yarn.lock
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/                  # 後端應用
│   ├── src/
│   │   ├── controllers/      # 業務邏輯
│   │   │   └── todoController.ts
│   │   ├── routes/           # API 路由
│   │   │   └── todoRoutes.ts
│   │   ├── validators/       # Zod 驗證
│   │   │   └── todoSchemas.ts
│   │   └── index.ts          # 伺服器入口（服務 API + 靜態檔案）
│   ├── prisma/
│   │   └── schema.prisma     # 資料庫模型
│   ├── package.json
│   ├── yarn.lock
│   ├── tsconfig.json
│   └── .env                  # 環境变量
│
├── start-all.sh              # 啟動腳本（含 ngrok）
├── stop-all.sh               # 停止腳本
└── README.md                 # 專案檔案
```

## 🚀 前置需求

在開始之前，請確保您的系統已安裝以下軟體：

### 必需軟體

1. **Node.js** (>= 16.0)

   ```bash
   node --version  # 應顯示 v16.0 或更高
   ```

2. **Yarn** (套件管理器)

   ```bash
   # 安裝 Yarn
   npm install -g yarn
   # 或使用 Homebrew (macOS)
   brew install yarn

   # 驗證安裝
   yarn --version
   ```

3. **PostgreSQL** (>= 12.0)

   ```bash
   # macOS (使用 Homebrew)
   brew install postgresql
   brew services start postgresql

   # 驗證安裝
   psql --version
   pg_isready
   ```

4. **ngrok** （產生公開網址）

   ```bash
   # macOS (使用 Homebrew)
   brew install ngrok/ngrok/ngrok

   # 或下载安裝
   # 存取: https://ngrok.com/download

   # 驗證安裝
   ngrok version

   # 註冊并取得 authtoken（可選，免費版即可）
   # 存取: https://dashboard.ngrok.com/signup
   # ngrok config add-authtoken <你的token>
   ```

5. **Git**
   ```bash
   git --version
   ```

## 📥 安裝步驟

### 1. 複製專案

```bash
git clone <repository-url>
cd todo-fullstack
```

### 2. 建立資料庫

```bash
createdb tododb
```

### 3. 設定環境变量

後端的 `.env` 檔案應已存在于 `backend/` 目錄，內容如下：

```env
DATABASE_URL="postgresql://postgres@localhost:5432/tododb"
PORT=3000
NODE_ENV=development
```

如果您的 PostgreSQL 設定不同，請修改 `DATABASE_URL`。

### 4. 安裝相依性

相依性會在首次運行 `start-all.sh` 时自動安裝，或手動安裝：

```bash
# 後端相依性
cd backend
yarn install
cd ..

# 前端相依性
cd frontend
yarn install
cd ..
```

### 5. 運行資料庫遷移

```bash
cd backend
yarn prisma migrate dev --name init
cd ..
```

## 🎮 運行應用

### 方式一：一键啟動（推薦）

```bash
./start-all.sh
```

这將自動完成：

1. ✅ 檢查 PostgreSQL 和 ngrok 安裝狀態
2. 📦 安裝相依性（如果需要）
3. 🏗️ 構建前端靜態檔案
4. 📊 運行資料庫遷移
5. 🚀 啟動後端服務器（服務 API + 前端）
6. 🌍 啟動 ngrok 并產生公開網址

**啟動后你會看到：**

```
✅ Application started successfully!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 本地存取:  http://localhost:3000
🌍 公開網址: https://xxxx-xx-xx-xxx-xxx.ngrok-free.app
💡 分享這個網址，任何人都可以存取你的應用！
🎛️  ngrok 控制台: http://localhost:4040
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**存取方式：**

- 本地存取：`http://localhost:3000`
- 公開存取：使用 ngrok 產生的網址（分享給朋友）
- ngrok 控制台：`http://localhost:4040`（查看請求日志）

**停止服務**：按 `Ctrl+C` 或運行 `./stop-all.sh`

### 方式二：單獨啟動

如果你不需要公開網址，可以單獨啟動後端：

#### 1. 構建前端

```bash
cd frontend
yarn install
yarn build
cd ..
```

#### 2. 啟動後端

```bash
cd backend
yarn install
yarn dev
```

存取：`http://localhost:3000`

#### 3. 手動啟動 ngrok（可選）

```bash
ngrok http 3000
```

## 🌐 ngrok 公開存取

### 🎯 什么是 ngrok？

ngrok 是一个強大的工具，可以將你本地運行的應用暴露到網際網路，產生一个公開的 HTTPS 網址。

**優點：**

- ✅ 无需购买域名或服務器
- ✅ 自動提供 HTTPS 加密
- ✅ 可以分享給世界各地的任何人
- ✅ 免費版足够開發和演示使用
- ✅ 内置請求檢查工具

### 🚀 使用方式

当你運行 `./start-all.sh` 时，ngrok 會自動啟動并顯示公開網址：

```
🌍 公開網址: https://abc123.ngrok-free.app
💡 分享這個網址，任何人都可以存取你的應用！
```

### 📊 ngrok 控制台

存取 `http://localhost:4040` 可以查看：

- 所有 HTTP 請求詳情
- 請求/响應頭和資料
- 請求時間和狀態码
- 重放請求功能

### ⚠️ 注意事項

**免費版限制：**

- 每次啟動產生新的隨機網址
- 有流量限制（每月 1GB）
- 會顯示 ngrok 警告頁面（訪客需点击繼續）

**付费版好处：**

- 固定的自訂域名
- 更高流量限制
- 移除警告頁面
- 更多並發連接

### 🔒 安全建議

- ngrok 網址是公開的，任何知道網址的人都能存取
- 不要在公開網址上儲存敏感資料
- 使用完毕后记得停止服務
- 如需認證，考虑在應用層新增登入功能

### 🌟 使用場景

- 📱 在手機上測試你的 Web 應用
- 👥 向客戶或團隊演示專案
- 🔗 与遠端朋友分享你的作品
- 🧪 測試 Webhook 回調（如支付网关）
- 📲 測試社交媒體分享預覽

## 🔌 API 端點

### Base URL

- 本地存取：`http://localhost:3000/api`
- ngrok 公開存取：`https://<你的ngrok網址>.ngrok-free.app/api`

### 端點列表

#### 取得所有 Todos

```http
GET /api/todos
```

**响應示例：**

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

#### 建立新 Todo

```http
POST /api/todos
Content-Type: application/json

{
  "text": "买菜",
  "description": "晚上做饭用"  // 可選
}
```

**响應：** `201 Created`

#### 更新 Todo

```http
PUT /api/todos/:id
Content-Type: application/json

{
  "text": "买菜和水果",           // 可選
  "description": "晚上做饭用",    // 可選
  "completed": true               // 可選
}
```

**响應：** `200 OK` 或 `404 Not Found`

#### 刪除 Todo

```http
DELETE /api/todos/:id
```

**响應：** `204 No Content` 或 `404 Not Found`

## 🗄️ 資料庫模型

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

## 🧪 測試

### 測試後端 API

```bash
# 取得所有 todos
curl http://localhost:3000/api/todos

# 建立 todo
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"Test Todo","description":"Test description"}'

# 更新 todo
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# 刪除 todo
curl -X DELETE http://localhost:3000/api/todos/1
```

### 測試前端

1. 存取 http://localhost:8080
2. 建立新的 todo
3. 切换完成狀態
4. 点击 todo 展开描述
5. 刪除 todo
6. 重新整理頁面确认資料持久化

## 📚 Git Tags 使用說明

本專案使用 Git tags 标记每個開發步驟，方便程式碼審查和學習：

### 查看所有 tags

```bash
git tag -l
```

### 輸出示例

```
step-1-backend-init
step-2-prisma-setup
step-3-api-implementation
step-4-frontend-restructure
step-5-api-service-layer
step-6-frontend-integration
step-7-ngrok-integration
step-8-final-testing
```

### 切换到特定步驟

```bash
git checkout step-3-api-implementation
```

### 查看 tag 詳細資訊

```bash
git show step-3-api-implementation
```

### 返回主分支

```bash
git checkout main  # 或 master
```

### 各步驟說明

1. **step-1-backend-init**: 後端專案初始化
2. **step-2-prisma-setup**: Prisma 和資料庫設定
3. **step-3-api-implementation**: RESTful API 实现
4. **step-4-frontend-restructure**: 前端目錄重組
5. **step-5-api-service-layer**: 前端 API 服務層
6. **step-6-frontend-integration**: 前端後端整合
7. **step-7-ngrok-integration**: ngrok 公網隧道整合
8. **step-8-final-testing**: 最終測試和檔案

## 🐛 常见問題

### PostgreSQL 連接失敗

**問題：** `Error: connect ECONNREFUSED`

**解決：**

```bash
# 啟動 PostgreSQL
brew services start postgresql

# 或
pg_ctl -D /usr/local/var/postgres start
```

### 埠號被佔用

**問題：** `Error: listen EADDRINUSE: address already in use`

**解決：**

```bash
# 查找佔用埠號的程式
lsof -i :3000  # 後端

# 終止程式
kill -9 <PID>

# 或使用停止腳本
./stop-all.sh
```

### ngrok 未安裝

**問題：** `ngrok: command not found`

**解決：**

```bash
# 使用 Homebrew 安裝
brew install ngrok/ngrok/ngrok

# 或存取官网下载
# https://ngrok.com/download

# 驗證安裝
ngrok version
```

### ngrok 網址无法存取

**問題：** 存取 ngrok 網址时出现錯誤

**可能原因及解決：**

1. **後端未啟動**：確保 `http://localhost:3000` 可以存取
2. **ngrok 未認證**（免費版可跳过）：
   ```bash
   ngrok config add-authtoken <你的token>
   ```
3. **防火墙阻止**：檢查系統防火墙设置
4. **訪客需点击繼續**：免費版會顯示警告頁面，点击"Visit Site"即可

### 資料庫遷移失敗

**問題：** Prisma 遷移錯誤

**解決：**

```bash
cd backend

# 重置資料庫（注意：會刪除所有資料）
yarn prisma migrate reset

# 重新遷移
yarn prisma migrate dev --name init
```

## 🔧 開發命令

### 後端

```bash
cd backend

# 開發模式（熱重載）
yarn dev

# 構建
yarn build

# 生产運行
yarn start

# Prisma 命令
yarn prisma studio          # 資料庫 GUI
yarn prisma migrate dev     # 建立遷移
yarn prisma generate        # 產生客戶端
```

### 前端

```bash
cd frontend

# 開發模式
yarn dev

# 構建
yarn build

# 預覽構建
yarn preview

# 程式碼檢查
yarn lint
```

## 📦 生产部署

### 推薦部署平台

**使用 ngrok 仅适合開發和演示，生产環境推薦以下平台：**

1. **Railway** (推薦)

   - 全栈應用 + PostgreSQL
   - 自動構建和部署
   - 免費额度：$5/月
   - 網站：https://railway.app

2. **Render**

   - 前端 + 後端 + 資料庫
   - 免費版可用（有限制）
   - 網站：https://render.com

3. **Vercel + Supabase**
   - Vercel（前端）
   - Supabase（後端 API + PostgreSQL）
   - 两者都有免費版

### 本地構建和部署

```bash
# 1. 構建前端
cd frontend
yarn build

# 2. 構建後端
cd backend
yarn build

# 3. 設定生产環境变量
# 修改 backend/.env
NODE_ENV=production
DATABASE_URL="your-production-database-url"
PORT=3000

# 4. 使用 PM2 管理程式
yarn global add pm2
pm2 start backend/dist/index.js --name todo-backend
pm2 save
pm2 startup
```

### ngrok 生产使用（付费版）

如果需要长期使用 ngrok，建議升级到付费版：

```bash
# 使用固定域名
ngrok http 3000 --domain=your-custom-domain.ngrok.app
```

## 📝 授權

MIT License

## 👥 貢獻

歡迎提交 Pull Request 或 Issue！

## 📞 聯絡方式

如有問題，請建立 GitHub Issue。

---

⭐ 如果這個專案对您有幫助，請給一个 Star！
