#!/bin/bash

echo "🚀 Starting Todo Fullstack Application with ngrok..."

# 檢查 ngrok 是否安裝
if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok is not installed!"
    echo ""
    echo "請安裝 ngrok："
    echo "  brew install ngrok/ngrok/ngrok"
    echo "或存取: https://ngrok.com/download"
    exit 1
fi

# 檢查 PostgreSQL
if ! pg_isready -q; then
    echo "❌ PostgreSQL is not running. Please start PostgreSQL first."
    exit 1
fi

# 後端相依性安裝
echo "📦 Installing backend dependencies..."
cd backend
if [ ! -d "node_modules" ]; then
    yarn install
fi
cd ..

# 前端相依性安裝和構建
echo "🎨 Building frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
    yarn install
fi
yarn build
cd ..

# 後端 Prisma 遷移
echo "📊 Running database migrations..."
cd backend
yarn prisma migrate deploy > /dev/null 2>&1
cd ..

# 啟動後端（會服務前端靜態檔案）
echo "🚀 Starting backend server..."
cd backend
yarn dev &
BACKEND_PID=$!
cd ..

# 等待後端啟動
echo "⏳ Waiting for backend to start..."
sleep 5

# 啟動 ngrok
echo "🌐 Starting ngrok tunnel..."
ngrok http 3000 > /dev/null &
NGROK_PID=$!

# 等待 ngrok 啟動
sleep 3

# 取得 ngrok 公開網址
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Application started successfully!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📱 本地存取:  http://localhost:3000"
echo ""
echo "🌍 公開網址: (取得中...)"
sleep 2

# 從 ngrok API 取得公開 URL
NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | grep -o 'https://[a-zA-Z0-9.-]*\.ngrok-free\.app' | head -1)

if [ ! -z "$NGROK_URL" ]; then
    echo "🌍 公開網址: $NGROK_URL"
    echo ""
    echo "💡 分享這個網址，任何人都可以存取你的應用！"
else
    echo "🌍 公開網址: 請存取 http://localhost:4040 查看 ngrok 控制台"
fi

echo ""
echo "🎛️  ngrok 控制台: http://localhost:4040"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "按 Ctrl+C 停止所有服務"

# 清理函式
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    kill $BACKEND_PID 2>/dev/null
    kill $NGROK_PID 2>/dev/null
    pkill -f "ngrok" 2>/dev/null
    echo "✅ All services stopped"
    exit 0
}

trap cleanup INT TERM

# 等待使用者中斷
wait

