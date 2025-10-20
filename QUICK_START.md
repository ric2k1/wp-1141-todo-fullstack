# 🚀 快速開始指南

## 📋 前置條件檢查

執行以下命令確保所有必需軟體已安裝：

```bash
# 檢查 Node.js
node --version  # 應顯示 >= v16

# 檢查 Yarn
yarn --version

# 檢查 PostgreSQL
pg_isready

# 檢查 ngrok
ngrok version
```

## 🎯 快速啟動（首次使用）

### 1. 建立資料庫

```bash
createdb tododb
```

### 2. 安裝相依性並執行遷移

```bash
# 後端
cd backend
yarn install
yarn prisma migrate dev --name init
cd ..

# 前端
cd frontend
yarn install
cd ..
```

### 3. 一鍵啟動

```bash
./start-all.sh
```

啟動後，你會看到：

```
✅ Application started successfully!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 本地存取:  http://localhost:3000
🌍 公開網址: https://xxxx-xx-xx-xxx-xxx.ngrok-free.app
💡 分享這個網址，任何人都可以存取你的應用！
🎛️  ngrok 控制台: http://localhost:4040
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 4. 測試應用

- 本地存取：打開 `http://localhost:3000`
- 公開存取：複製 ngrok 網址，在手机或其他设备上存取
- ngrok 控制台：存取 `http://localhost:4040` 查看請求日志

### 5. 停止服務

按 `Ctrl+C` 或執行：

```bash
./stop-all.sh
```

## 🔄 日常使用（非首次）

```bash
# 確保 PostgreSQL 執行
pg_isready

# 啟動應用
./start-all.sh
```

就这么簡單！

## 💡 提示

- **ngrok 網址每次重启都會变**：免費版會產生新的隨機網址
- **ngrok 有流量限制**：免費版每月 1GB
- **訪客需点击繼續**：免費版會顯示警告頁面
- **查看 API 請求**：存取 `http://localhost:4040` 的 ngrok 控制台

## 🎨 架构說明

```
使用者瀏覽器
    ↓
ngrok (公開網址)
    ↓
後端服務器 (port 3000)
    ├── /api/*  → Express API
    └── /*      → React 前端静态檔案
    ↓
PostgreSQL 資料庫
```

## ❓ 常见問題

### Q: 没有安裝 ngrok 怎么办？

```bash
brew install ngrok/ngrok/ngrok
```

### Q: 只想本地使用，不需要公開網址？

單獨啟動後端即可（不執行 start-all.sh）：

```bash
cd frontend && yarn build && cd ..
cd backend && yarn dev
```

存取 `http://localhost:3000`

### Q: PostgreSQL 連線失敗？

```bash
brew services start postgresql
```

### Q: 埠號被佔用？

```bash
./stop-all.sh
# 或
lsof -i :3000
kill -9 <PID>
```

## 📚 更多信息

查看完整檔案：[README.md](./README.md)
