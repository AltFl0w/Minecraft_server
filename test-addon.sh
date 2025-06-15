#!/bin/bash

echo "🦁 Zoo Addon Testing Script"
echo "=========================="

# Function to build TypeScript
build_addon() {
    echo "📦 Building TypeScript..."
    npm run build
    if [ $? -eq 0 ]; then
        echo "✅ Build successful!"
    else
        echo "❌ Build failed!"
        exit 1
    fi
}

# Function to start test server
start_server() {
    echo "🚀 Starting test server..."
    docker compose -f docker-compose.local-test.yml up -d
    echo "⏳ Waiting for server to start..."
    sleep 10
    echo "✅ Server should be running on localhost:19132"
}

# Function to restart server (for hot reload)
restart_server() {
    echo "🔄 Restarting server for hot reload..."
    docker compose -f docker-compose.local-test.yml restart minecraft-zoo-test
    echo "⏳ Waiting for restart..."
    sleep 5
    echo "✅ Server restarted!"
}

# Function to show logs
show_logs() {
    echo "📋 Server logs:"
    docker compose -f docker-compose.local-test.yml logs -f minecraft-zoo-test
}

# Function to stop server
stop_server() {
    echo "🛑 Stopping test server..."
    docker compose -f docker-compose.local-test.yml down
    echo "✅ Server stopped!"
}

# Main menu
case "$1" in
    "build")
        build_addon
        ;;
    "start")
        build_addon
        start_server
        ;;
    "restart")
        build_addon
        restart_server
        ;;
    "logs")
        show_logs
        ;;
    "stop")
        stop_server
        ;;
    "dev")
        echo "🔥 Starting development mode..."
        build_addon
        start_server
        echo ""
        echo "🎮 Connect to: localhost:19132"
        echo "📝 Edit code, then run: ./test-addon.sh restart"
        echo "📋 View logs: ./test-addon.sh logs"
        echo "🛑 Stop server: ./test-addon.sh stop"
        ;;
    *)
        echo "Usage: $0 {build|start|restart|logs|stop|dev}"
        echo ""
        echo "Commands:"
        echo "  build   - Build TypeScript only"
        echo "  start   - Build and start test server"
        echo "  restart - Build and restart server (hot reload)"
        echo "  logs    - Show server logs"
        echo "  stop    - Stop test server"
        echo "  dev     - Start development mode"
        ;;
esac 