#!/bin/bash
# Apply RLS Policies Script
# Executes the complete RLS policies SQL file using psql

set -e

echo "🔐 Applying RLS Policies to Supabase"
echo ""

# Load environment variables from .env.local
if [ -f .env.local ]; then
    export $(grep -v '^#' .env.local | xargs)
fi

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL not found in .env.local"
    echo ""
    echo "Please ensure .env.local contains:"
    echo "DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"
    exit 1
fi

echo "📄 SQL File: prisma/rls-policies-complete.sql"
echo "🔗 Database: ${DATABASE_URL%%\?*}" # Show URL without query params
echo ""
echo "═══════════════════════════════════════════════════════════"
echo ""

# Execute the SQL file
echo "Executing SQL statements..."
psql "$DATABASE_URL" -f prisma/rls-policies-complete.sql

echo ""
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "✅ RLS policies applied successfully!"
echo ""
echo "🧪 Run the test to verify:"
echo "   npx tsx scripts/test-rls.ts"
echo ""
