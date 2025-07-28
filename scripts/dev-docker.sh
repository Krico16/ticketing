#!/bin/bash

# Development Docker startup script for EventHub

set -e

echo "🚀 Starting EventHub development environment with Docker..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Build and start the development environment
echo "📦 Building development container..."
docker compose -f docker-compose.dev.yml build

echo "🔄 Starting development server..."
docker compose -f docker-compose.dev.yml up

echo "✅ Development environment started!"
echo "🌐 Application available at: http://localhost:3000"
echo "🛠️  DevTools available at: http://localhost:24678"
echo ""
echo "To stop the environment, press Ctrl+C or run:"
echo "docker compose -f docker-compose.dev.yml down"