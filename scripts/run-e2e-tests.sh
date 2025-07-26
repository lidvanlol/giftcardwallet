#!/bin/bash

# Detox E2E Test Runner Script
# Usage: ./scripts/run-e2e-tests.sh [ios|android] [debug|release]

set -e

# Default values
PLATFORM=${1:-ios}
CONFIG=${2:-debug}

echo "🚀 Running Detox E2E Tests"
echo "Platform: $PLATFORM"
echo "Config: $CONFIG"

# Validate inputs
if [[ "$PLATFORM" != "ios" && "$PLATFORM" != "android" ]]; then
    echo "❌ Invalid platform. Use 'ios' or 'android'"
    exit 1
fi

if [[ "$CONFIG" != "debug" && "$CONFIG" != "release" ]]; then
    echo "❌ Invalid config. Use 'debug' or 'release'"
    exit 1
fi

# Set configuration based on platform and config
if [[ "$PLATFORM" == "ios" ]]; then
    if [[ "$CONFIG" == "debug" ]]; then
        DETOX_CONFIG="ios.sim.debug"
    else
        DETOX_CONFIG="ios.sim.release"
    fi
else
    if [[ "$CONFIG" == "debug" ]]; then
        DETOX_CONFIG="android.emu.debug"
    else
        DETOX_CONFIG="android.emu.release"
    fi
fi

echo "📱 Using Detox config: $DETOX_CONFIG"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
if [[ "$PLATFORM" == "ios" ]]; then
    cd ios && xcodebuild clean && cd ..
else
    cd android && ./gradlew clean && cd ..
fi

# Build the app
echo "🔨 Building app for $PLATFORM..."
detox build -c $DETOX_CONFIG

# Run the tests
echo "🧪 Running tests..."
detox test -c $DETOX_CONFIG

echo "✅ Tests completed!" 