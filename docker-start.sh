#!/bin/bash
# Quick start script for Docker development

set -e

echo "🐳 Starting Nixtia Docker Environment..."

# Copy environment file if it doesn't exist
if [ ! -f .env.local ]; then
  echo "📝 Creating .env.local from template..."
  cp .env.docker .env.local
  echo "⚠️  IMPORTANT: Update .env.local with your actual credentials!"
  read -p "Press enter to continue..."
fi

# Build and start containers
echo "🔨 Building containers..."
docker-compose build

echo "🚀 Starting services..."
docker-compose up -d

# Wait for database
echo "⏳ Waiting for database to be ready..."
sleep 5

# Run migrations
echo "📊 Running database migrations..."
docker-compose exec app npx prisma migrate dev --name init

# Seed database
echo "🌱 Seeding database..."
docker-compose exec app npx prisma db seed

echo ""
echo "✅ Docker environment ready!"
echo ""
echo "📡 Services running:"
echo "   - App:            http://localhost:3000"
echo "   - Database:       localhost:5432"
echo "   - Prisma Studio:  docker-compose --profile tools up prisma-studio"
echo ""
echo "📝 Useful commands:"
echo "   - View logs:      docker-compose logs -f app"
echo "   - Stop all:       docker-compose down"
echo "   - Restart app:    docker-compose restart app"
echo "   - Shell access:   docker-compose exec app sh"
echo ""
