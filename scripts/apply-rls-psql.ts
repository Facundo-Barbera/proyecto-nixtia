#!/usr/bin/env tsx
/**
 * Apply RLS Policies using psql via Node.js
 * This script executes the RLS SQL file using psql with proper connection string handling
 */

import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in .env.local')
  console.error('\nPlease ensure .env.local contains:')
  console.error('DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres')
  process.exit(1)
}

console.log('🔐 Applying RLS Policies to Supabase\n')
console.log('📄 SQL File: prisma/rls-policies-complete.sql')
console.log('🔗 Database:', DATABASE_URL.replace(/:[^:]*@/, ':***@')) // Mask password
console.log('\n' + '═'.repeat(60) + '\n')

try {
  // Read the SQL file
  const sqlContent = readFileSync('prisma/rls-policies-complete.sql', 'utf-8')
  console.log(`📏 SQL file loaded (${sqlContent.length} characters)`)
  console.log('🔧 Executing SQL statements...\n')

  // Execute via psql
  const result = execSync(
    `psql "${DATABASE_URL}" -f prisma/rls-policies-complete.sql`,
    {
      encoding: 'utf-8',
      stdio: 'pipe',
    }
  )

  console.log(result)
  console.log('\n' + '═'.repeat(60))
  console.log('\n✅ RLS policies applied successfully!')
  console.log('\n🧪 Run the test to verify:')
  console.log('   npx tsx scripts/test-rls.ts\n')

} catch (error: any) {
  console.error('\n❌ Error applying RLS policies:')
  console.error(error.message)

  if (error.stderr) {
    console.error('\nDetails:', error.stderr.toString())
  }

  console.error('\n🔧 Manual Application Required:')
  console.error('   1. Open Supabase Dashboard → SQL Editor')
  console.error('   2. Create new query')
  console.error('   3. Copy contents of: prisma/rls-policies-complete.sql')
  console.error('   4. Run the query')
  console.error('\n📋 Or check your DATABASE_URL format in .env.local')
  console.error('   Expected format: postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres')

  process.exit(1)
}
