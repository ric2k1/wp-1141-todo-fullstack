#!/bin/bash

echo "🛑 Stopping Todo Fullstack Application..."

# 停止 ngrok
pkill -f "ngrok" 2>/dev/null && echo "✓ ngrok stopped"

# 停止 Node.js 後端程式
pkill -f "tsx watch" 2>/dev/null && echo "✓ Backend stopped"

echo "✅ All services stopped"

