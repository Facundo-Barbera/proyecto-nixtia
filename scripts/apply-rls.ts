#!/usr/bin/env tsx
/**
 * Apply RLS Policies Script
 * Executes the complete RLS policies SQL file using Supabase service role
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing required environment variables!')
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

// Create service role client
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function applyRLS() {
  console.log('🔐 Applying RLS Policies to Supabase\n')

  try {
    // Read the SQL file
    const sqlFile = readFileSync('prisma/rls-policies-complete.sql', 'utf-8')

    console.log('📄 Reading SQL file: prisma/rls-policies-complete.sql')
    console.log('📏 File size:', sqlFile.length, 'characters\n')

    // Split SQL into individual statements (ignoring comments and empty lines)
    const statements = sqlFile
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'))
      .filter(s => {
        // Filter out pure comment blocks
        const lines = s.split('\n').filter(line => !line.trim().startsWith('--'))
        return lines.join('').trim().length > 0
      })

    console.log(`🔍 Found ${statements.length} SQL statements to execute\n`)
    console.log('═'.repeat(60))

    let successCount = 0
    let errorCount = 0

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i].trim() + ';'

      // Get first line for logging
      const firstLine = statement.split('\n')[0].substring(0, 80)

      console.log(`\n[${i + 1}/${statements.length}] Executing:`)
      console.log(`   ${firstLine}${statement.length > 80 ? '...' : ''}`)

      try {
        const { data, error } = await supabase.rpc('exec_sql', { sql: statement })

        if (error) {
          // Try direct query instead
          const { error: queryError } = await supabase.from('_rpc').select('*').limit(0)

          // If exec_sql doesn't exist, use raw SQL via Postgres REST API
          console.log('   ⚠️  exec_sql RPC not available, using direct execution...')

          // For now, log the error but continue
          console.log(`   ⚠️  Could not execute via RPC: ${error.message}`)
          console.log('   ℹ️  This SQL needs to be executed manually in Supabase SQL Editor')
          errorCount++
        } else {
          console.log('   ✅ Success')
          successCount++
        }
      } catch (err) {
        console.log(`   ❌ Error: ${err}`)
        errorCount++
      }
    }

    console.log('\n' + '═'.repeat(60))
    console.log('\n📊 Summary:\n')
    console.log(`✅ Successful: ${successCount}`)
    console.log(`❌ Errors: ${errorCount}`)
    console.log(`📝 Total: ${statements.length}`)

    if (errorCount > 0) {
      console.log('\n⚠️  Some statements failed!')
      console.log('\n🔧 Manual Application Required:')
      console.log('   1. Open Supabase Dashboard → SQL Editor')
      console.log('   2. Create new query')
      console.log('   3. Copy contents of: prisma/rls-policies-complete.sql')
      console.log('   4. Run the query')
      console.log('\n   Alternative: Use psql with correct DATABASE_URL format')
    } else {
      console.log('\n✅ All RLS policies applied successfully!')
    }

  } catch (error) {
    console.error('\n❌ Fatal error:', error)
    process.exit(1)
  }
}

// Run the script
applyRLS().catch(console.error)
