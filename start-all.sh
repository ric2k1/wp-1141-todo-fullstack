#!/bin/bash

echo "🚀 Starting Todo Fullstack Application..."

# 检查 PostgreSQL
if ! pg_isready -q; then
    echo "❌ PostgreSQL is not running. Please start PostgreSQL first."
    exit 1
fi

# 后端 Prisma 迁移和启动
echo "📦 Starting backend..."
cd backend
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    yarn install
fi
yarn prisma migrate deploy > /dev/null 2>&1
yarn dev &
BACKEND_PID=$!
cd ..

# 等待后端启动
sleep 3

# 前端启动
echo "🎨 Starting frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    yarn install
fi
yarn dev &
FRONTEND_PID=$!
cd ..

# 等待前端启动
sleep 3

# 启动 Nginx
echo "🌐 Starting Nginx..."
nginx -c $(pwd)/nginx.conf

echo ""
echo "✅ Application started successfully!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📱 Application: http://localhost:8080"
echo "🎨 Frontend:    http://localhost:5173"
echo "📦 Backend:     http://localhost:3000"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Press Ctrl+C to stop all services"

# 清理函数
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    nginx -s stop 2>/dev/null
    echo "✅ All services stopped"
    exit 0
}

trap cleanup INT TERM

# 等待用户中断
wait

