#!/bin/bash

echo "🛑 Stopping Todo Fullstack Application..."

# 停止 Nginx
nginx -s stop 2>/dev/null && echo "✓ Nginx stopped"

# 停止 Node.js 进程
pkill -f "tsx watch" && echo "✓ Backend stopped"
pkill -f "vite" && echo "✓ Frontend stopped"

echo "✅ All services stopped"

