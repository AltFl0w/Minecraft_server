#!/bin/bash

echo "🦁 Zoo Addon Testing Script"
echo "=========================="

# Function to build TypeScript
build_addon() {
    echo "📦 Building TypeScript..."
    cd minecraft-zoo-addon
    npm run build
    if [ $? -eq 0 ]; then
        echo "✅ Build successful!"
        cd ..
    else
        echo "❌ Build failed!"
        cd ..
        exit 1
    fi
}

# Function to start test server
start_server() {
    echo "🚀 Starting test server..."
    docker compose up -d
    echo "⏳ Waiting for server to start..."
    sleep 10
    echo "✅ Server should be running on localhost:19132"
}

# Function to restart server (for hot reload)
restart_server() {
    echo "🔄 Restarting server for hot reload..."
    docker compose restart minecraft-zoo
    echo "⏳ Waiting for restart..."
    sleep 5
    echo "✅ Server restarted!"
}

# Function to show logs
show_logs() {
    echo "📋 Server logs:"
    docker compose logs -f minecraft-zoo
}

# Function to run GameTests
run_tests() {
    echo "🧪 Running GameTests..."
    echo "Connect to the server and run these commands:"
    echo ""
    echo "In-game GameTest commands:"
    echo "  /gametest runset ZooTests"
    echo "  /gametest run ZooTests:addon_loads"
    echo "  /gametest run ZooTests:full_integration"
    echo ""
    echo "Or use RCON (if available):"
    docker compose exec minecraft-zoo rcon-cli "/gametest runset ZooTests" 2>/dev/null || echo "⚠️  RCON not available - run commands in-game"
}

# Function to stop server
stop_server() {
    echo "🛑 Stopping test server..."
    docker compose down
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
    "test")
        run_tests
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
        echo "Usage: $0 {build|start|restart|logs|test|stop|dev}"
        echo ""
        echo "Commands:"
        echo "  build   - Build TypeScript only"
        echo "  start   - Build and start test server"
        echo "  restart - Build and restart server (hot reload)"
        echo "  logs    - Show server logs"
        echo "  test    - Show GameTest commands to run"
        echo "  stop    - Stop test server"
        echo "  dev     - Start development mode"
        ;;
esac 