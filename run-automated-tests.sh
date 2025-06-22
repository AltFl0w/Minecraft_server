#!/bin/bash

# Automated GameTest Runner for Zoo Addon
# This script runs all GameTests automatically via RCON

echo "🧪 Zoo Addon Automated Test Runner"
echo "=================================="

# Check if server is running
if ! docker ps | grep -q "zoo-test-server"; then
    echo "❌ Server not running. Starting server first..."
    ./test-addon.sh start
    echo "⏳ Waiting for server to fully start..."
    sleep 10
fi

# Function to run RCON command
run_rcon_command() {
    local command="$1"
    echo "🔧 Running: $command"
    
    # Try using nc (netcat) for RCON since rcon-cli isn't available
    # This is a simple RCON implementation
    timeout 5 bash -c "echo '$command' | nc -u localhost 25575" 2>/dev/null || {
        echo "⚠️  RCON connection failed. Trying docker exec..."
        docker exec zoo-test-server bash -c "echo '$command' > /tmp/rcon_cmd.txt" 2>/dev/null
    }
}

# Function to run all GameTests
run_all_tests() {
    echo ""
    echo "🚀 Starting automated GameTest execution..."
    echo ""
    
    # Enable GameTest mode
    echo "1️⃣ Enabling GameTest framework..."
    run_rcon_command "gamerule domobspawning false"
    run_rcon_command "gamerule keepinventory true"
    run_rcon_command "gamemode creative @a"
    
    sleep 2
    
    # Run individual tests with delays
    echo ""
    echo "2️⃣ Running individual GameTests..."
    
    tests=("addon_loads" "permission_system" "command_handler" "config_system" "ai_caretaker_system" "full_integration")
    
    for test in "${tests[@]}"; do
        echo "   🧪 Running ZooTests:$test"
        run_rcon_command "gametest run ZooTests:$test"
        sleep 3  # Wait between tests
    done
    
    echo ""
    echo "3️⃣ Running complete test suite..."
    run_rcon_command "gametest runset ZooTests"
    
    echo ""
    echo "⏳ Waiting for tests to complete..."
    sleep 10
    
    echo ""
    echo "4️⃣ Checking test results..."
    run_rcon_command "gametest list"
}

# Function to check test results from logs
check_test_results() {
    echo ""
    echo "📊 Test Results Summary:"
    echo "======================="
    
    # Get recent logs and look for GameTest results
    docker logs zoo-test-server --tail=50 | grep -i "gametest\|test\|passed\|failed\|error" | tail -20
    
    echo ""
    echo "📋 Full server logs (last 20 lines):"
    docker logs zoo-test-server --tail=20
}

# Main execution
echo "Starting automated test run..."
echo ""

# Build the addon first
echo "📦 Building addon..."
cd minecraft-zoo-addon && npm run build && cd ..

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Restart server to load new build
    echo "🔄 Restarting server with new build..."
    ./test-addon.sh restart
    sleep 5
    
    # Run the tests
    run_all_tests
    
    # Check results
    check_test_results
    
    echo ""
    echo "✅ Automated test run completed!"
    echo ""
    echo "🎯 Next steps:"
    echo "   - Check the test results above"
    echo "   - Review server logs: ./test-addon.sh logs"
    echo "   - Re-run tests: ./run-automated-tests.sh"
    
else
    echo "❌ Build failed! Fix TypeScript errors first."
    exit 1
fi 