# 🔄 從 Nginx 遷移到 ngrok

## 📝 更改總結

本次更新將專案從使用 **nginx 反向代理** 改为使用 **ngrok 公網隧道**，實現一鍵產生公開網址的功能。

## 🎯 主要更改

### 1. 後端架构调整

**檔案：** `backend/src/index.ts`

**更改內容：**

- 新增靜態檔案服務功能
- 後端现在服務 `frontend/dist/` 目錄的構建檔案
- 支援 SPA 路由（所有非 API 路由返回 index.html）

**新增程式碼：**

```typescript
// 服務前端靜態檔案
const frontendDistPath = path.join(__dirname, "../../../frontend/dist");
app.use(express.static(frontendDistPath));

// SPA 路由支援
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});
```

### 2. 啟動腳本重写

**檔案：** `start-all.sh`

**主要变化：**

- ✅ 檢查 ngrok 是否安裝
- 🏗️ 自動構建前端（`yarn build`）
- 🚀 啟動後端（服務 API + 靜態檔案）
- 🌍 啟動 ngrok 并自動取得公開網址
- 📊 顯示本地和公開存取地址

**存取方式：**

- 本地：`http://localhost:3000`
- 公開：ngrok 產生的 HTTPS 網址

### 3. 停止腳本更新

**檔案：** `stop-all.sh`

**更改：**

- 移除 nginx 停止命令
- 新增 ngrok 停止命令
- 簡化为只需停止後端程式

### 4. 檔案更新

**檔案：** `README.md`

**全面更新內容：**

- ✅ 新增 ngrok 安裝和使用說明
- ✅ 更新架构說明（移除 nginx）
- ✅ 新增 ngrok 常见問題解答
- ✅ 更新生产部署建議
- ✅ 新增 ngrok 使用場景和最佳实践

**新增檔案：** `QUICK_START.md`

- 快速開始指南
- 命令速查表

### 5. 移除的檔案

- ❌ `nginx.conf` - 不再需要 nginx 設定

### 6. 前端 API 設定

**檔案：** `frontend/src/services/api.ts`

**狀態：** 无需修改

- 已經使用相对路径 `/api`
- 完美支援新架构

## 🌟 新架构优势

### 之前（Nginx）

```
瀏覽器 → nginx:8080 → {
    /      → 前端開發服務器 (5173)
    /api   → 後端服務器 (3000)
}
```

- ❌ 只能本地存取
- ❌ 需要三个服務（前端 + 後端 + nginx）
- ❌ 設定複雜

### 现在（ngrok）

```
瀏覽器 → ngrok (HTTPS) → 後端:3000 → {
    /api   → Express API
    /*     → 前端靜態檔案 (已構建)
}
```

- ✅ 自動產生公開 HTTPS 網址
- ✅ 只需一个後端服務
- ✅ 分享給任何人存取
- ✅ 設定簡單

## 📊 使用對比

### 啟動服務

**之前：**

```bash
./start-all.sh
# 存取: http://localhost:8080
```

**现在：**

```bash
./start-all.sh
# 本地存取: http://localhost:3000
# 公開存取: https://abc123.ngrok-free.app
```

### 分享給他人

**之前：**

- ❌ 无法分享（只能本机存取）
- 需要手動設定局域网存取

**现在：**

- ✅ 复制 ngrok 網址即可分享
- ✅ 世界各地都能存取
- ✅ 自動 HTTPS 加密

## 🎓 學習要点

### 靜態檔案服務

Express 可以轻松服務靜態檔案：

```typescript
app.use(express.static("path/to/dist"));
```

### SPA 路由支援

確保所有前端路由都返回 index.html：

```typescript
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});
```

### ngrok 原理

ngrok 在本地和雲端服務器之间建立安全隧道：

```
你的电脑 (localhost:3000)
    ↕ 加密隧道
ngrok 雲服務器 (公開網址)
    ↕ HTTPS
使用者瀏覽器
```

## ⚠️ 注意事項

### 免費版 ngrok 限制

1. **隨機網址**：每次啟動產生新網址
2. **流量限制**：每月 1GB
3. **警告頁面**：訪客需点击"Visit Site"繼續
4. **連線数**：有限制

### 付费版优势

- 固定自訂域名
- 更高流量限制
- 移除警告頁面
- 更多並發連線

## 🚀 下一步

### 開發和演示

使用 ngrok 免費版即可

### 生产部署

推薦使用专业平台：

- Railway
- Render
- Vercel + Supabase

## 📚 相关檔案

- [README.md](./README.md) - 完整專案檔案
- [QUICK_START.md](./QUICK_START.md) - 快速開始指南
- [ngrok 官方檔案](https://ngrok.com/docs)

---

更新日期: 2025-10-20
