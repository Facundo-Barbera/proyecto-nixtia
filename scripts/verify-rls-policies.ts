// Verification script to check if RLS policies are applied in Supabase
// This script queries the PostgreSQL system catalogs to verify RLS status

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function verifyRLSPolicies() {
  console.log('🔍 Checking RLS policies in Supabase database...\n')

  try {
    // Check if RLS is enabled on tables
    const rlsStatus = await prisma.$queryRaw<Array<{ tablename: string; rowsecurity: boolean }>>`
      SELECT tablename, rowsecurity
      FROM pg_tables
      WHERE schemaname = 'public'
      AND tablename IN ('products', 'orders', 'admin_users')
      ORDER BY tablename;
    `

    console.log('📋 RLS Status for Tables:')
    console.log('========================')
    for (const table of rlsStatus) {
      const status = table.rowsecurity ? '✅ ENABLED' : '❌ DISABLED'
      console.log(`${table.tablename.padEnd(20)} ${status}`)
    }

    // Check policies
    const policies = await prisma.$queryRaw<
      Array<{ tablename: string; policyname: string; cmd: string }>
    >`
      SELECT
        tablename,
        policyname,
        cmd
      FROM pg_policies
      WHERE schemaname = 'public'
      AND tablename IN ('products', 'orders', 'admin_users')
      ORDER BY tablename, policyname;
    `

    console.log('\n📜 RLS Policies Found:')
    console.log('=====================')
    if (policies.length === 0) {
      console.log('❌ No RLS policies found')
    } else {
      for (const policy of policies) {
        console.log(`\nTable: ${policy.tablename}`)
        console.log(`  Policy: ${policy.policyname}`)
        console.log(`  Command: ${policy.cmd}`)
      }
    }

    console.log('\n✅ RLS verification complete')
  } catch (error) {
    console.error('❌ Error verifying RLS policies:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

verifyRLSPolicies()
