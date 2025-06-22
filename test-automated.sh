#!/bin/bash

# Simple Automated Test Runner
# Builds addon, restarts server, and monitors logs for test results

echo "🧪 Simple Automated Test Runner"
echo "==============================="

# Build the addon
echo "📦 Building addon..."
cd minecraft-zoo-addon
npm run build
build_result=$?
cd ..

if [ $build_result -ne 0 ]; then
    echo "❌ Build failed! Fix TypeScript errors first."
    exit 1
fi

echo "✅ Build successful!"

# Restart server to load new build
echo "🔄 Starting/restarting server with new build..."
# Check if container exists and start or restart accordingly
if docker ps -a | grep -q "minecraft-zoo-server"; then
    ./test-addon.sh restart
else
    ./test-addon.sh start
fi

# Wait for server to fully start
echo "⏳ Waiting for server to initialize..."
sleep 8

# Monitor logs for test results
echo ""
echo "📋 Monitoring server logs for log-based test results..."
echo "======================================================="

# Wait a bit more for tests to initialize
sleep 5

# Show logs and look for our test output
echo "🔍 Looking for test system markers..."
docker logs minecraft-zoo-server --tail=50 | grep -E "(TEST-RUNNER|TEST-SUITE|TEST-PASS|TEST-FAIL|TEST-SUCCESS|TEST-WARNING|TEST-COMPLETE)" --color=always

echo ""
echo "📊 Test Summary:"
echo "================"

# Get the test results from logs
    test_results=$(docker logs minecraft-zoo-server --tail=100 | grep -E "(TEST-PASS|TEST-FAIL|TEST-SUCCESS|TEST-WARNING)")

if [[ -n "$test_results" ]]; then
    echo "$test_results"
    
    # Count passed/failed tests
    passed_count=$(echo "$test_results" | grep "TEST-PASS" | wc -l | tr -d ' ')
    failed_count=$(echo "$test_results" | grep "TEST-FAIL" | wc -l | tr -d ' ')
    
    echo ""
    echo "📈 Results: $passed_count passed, $failed_count failed"
    
    if [[ "$failed_count" -eq 0 ]] && [[ "$passed_count" -gt 0 ]]; then
        echo "🎉 All tests passed!"
    elif [[ "$failed_count" -gt 0 ]]; then
        echo "❌ Some tests failed"
    else
        echo "⚠️  No test results detected"
    fi
else
    echo "❓ No test results found in logs"
    echo "🔍 Checking if addon loaded..."
    
    addon_loaded=$(docker logs minecraft-zoo-server --tail=50 | grep -c "Zoo Addon loaded")
    if [[ "$addon_loaded" -gt 0 ]]; then
        echo "✅ Addon loaded successfully"
    else
        echo "❌ Addon may not have loaded"
    fi
fi

echo ""
echo "🎯 Recent server logs:"
echo "======================"
docker logs minecraft-zoo-server --tail=20 | grep -v "INFO" | grep -v "WARN" || echo "No recent logs"

echo ""
echo "✅ Automated test monitoring completed!"
echo ""
echo "💡 Tips:"
echo "   - Look for [TEST-PASS] messages above"
echo "   - [TEST-RUNNER] shows the test system is working"
echo "   - Run './test-addon.sh logs' for full server logs"
echo "   - Run './test-automated.sh' again to re-test" 