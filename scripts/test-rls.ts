#!/usr/bin/env tsx
/**
 * RLS Policy Test Script
 * Tests Row-Level Security enforcement on Supabase
 *
 * Tests:
 * 1. Public can SELECT active products (should succeed)
 * 2. Public cannot INSERT/UPDATE products (should fail with RLS error)
 * 3. Public cannot SELECT from orders (should fail with RLS error)
 * 4. Service role can manage all tables (should succeed)
 */

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing required environment variables!')
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

// Create clients
const anonClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
const serviceClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

interface TestResult {
  test: string
  passed: boolean
  message: string
  details?: any
}

const results: TestResult[] = []

async function runTests() {
  console.log('🔐 Testing Row-Level Security (RLS) Policies\n')
  console.log('═'.repeat(60))

  // Test 1: Public can read active products
  console.log('\n📋 Test 1: Public can SELECT active products')
  try {
    const { data, error } = await anonClient
      .from('products')
      .select('*')
      .eq('is_active', true)
      .limit(5)

    if (error) {
      results.push({
        test: 'Public SELECT active products',
        passed: false,
        message: `Failed: ${error.message}`,
        details: error
      })
      console.log(`   ❌ FAIL: ${error.message}`)
    } else {
      const count = data?.length || 0
      results.push({
        test: 'Public SELECT active products',
        passed: true,
        message: `Success: Retrieved ${count} active products`
      })
      console.log(`   ✅ PASS: Retrieved ${count} active products`)
    }
  } catch (err) {
    results.push({
      test: 'Public SELECT active products',
      passed: false,
      message: `Error: ${err}`,
      details: err
    })
    console.log(`   ❌ ERROR: ${err}`)
  }

  // Test 2: Public cannot INSERT products
  console.log('\n📋 Test 2: Public cannot INSERT products (should be blocked by RLS)')
  try {
    const { data, error } = await anonClient
      .from('products')
      .insert({
        name: 'Test Product (Should Fail)',
        price: 99.99,
        is_active: true
      })
      .select()

    if (error) {
      // This is expected - RLS should block this
      if (error.message.includes('row-level security') || error.code === '42501' || error.message.includes('policy')) {
        results.push({
          test: 'Public INSERT blocked',
          passed: true,
          message: 'Success: INSERT correctly blocked by RLS'
        })
        console.log(`   ✅ PASS: INSERT correctly blocked by RLS`)
        console.log(`      Error message: "${error.message}"`)
      } else {
        results.push({
          test: 'Public INSERT blocked',
          passed: false,
          message: `Unexpected error: ${error.message}`,
          details: error
        })
        console.log(`   ⚠️  UNEXPECTED ERROR: ${error.message}`)
      }
    } else {
      // This should NOT happen - means RLS is not working
      results.push({
        test: 'Public INSERT blocked',
        passed: false,
        message: '❌ CRITICAL: INSERT succeeded (RLS NOT ENFORCED!)',
        details: data
      })
      console.log(`   ❌ CRITICAL FAIL: INSERT succeeded - RLS is NOT enforced!`)
      console.log(`      Inserted data:`, data)
    }
  } catch (err) {
    results.push({
      test: 'Public INSERT blocked',
      passed: false,
      message: `Error: ${err}`,
      details: err
    })
    console.log(`   ❌ ERROR: ${err}`)
  }

  // Test 3: Public cannot UPDATE products
  console.log('\n📋 Test 3: Public cannot UPDATE products (should be blocked by RLS)')
  try {
    const { data, error } = await anonClient
      .from('products')
      .update({ price: 999.99 })
      .eq('is_active', true)
      .select()

    if (error) {
      // This is expected - RLS should block this
      if (error.message.includes('row-level security') || error.code === '42501' || error.message.includes('policy')) {
        results.push({
          test: 'Public UPDATE blocked',
          passed: true,
          message: 'Success: UPDATE correctly blocked by RLS'
        })
        console.log(`   ✅ PASS: UPDATE correctly blocked by RLS`)
        console.log(`      Error message: "${error.message}"`)
      } else {
        results.push({
          test: 'Public UPDATE blocked',
          passed: false,
          message: `Unexpected error: ${error.message}`,
          details: error
        })
        console.log(`   ⚠️  UNEXPECTED ERROR: ${error.message}`)
      }
    } else {
      // This should NOT happen - means RLS is not working
      results.push({
        test: 'Public UPDATE blocked',
        passed: false,
        message: '❌ CRITICAL: UPDATE succeeded (RLS NOT ENFORCED!)',
        details: data
      })
      console.log(`   ❌ CRITICAL FAIL: UPDATE succeeded - RLS is NOT enforced!`)
    }
  } catch (err) {
    results.push({
      test: 'Public UPDATE blocked',
      passed: false,
      message: `Error: ${err}`,
      details: err
    })
    console.log(`   ❌ ERROR: ${err}`)
  }

  // Test 4: Public cannot SELECT from orders
  console.log('\n📋 Test 4: Public cannot SELECT from orders (should be blocked by RLS)')
  try {
    const { data, error } = await anonClient
      .from('orders')
      .select('*')
      .limit(5)

    if (error) {
      // This is expected - RLS should block this
      if (error.message.includes('row-level security') || error.code === '42501' || error.message.includes('policy')) {
        results.push({
          test: 'Public SELECT orders blocked',
          passed: true,
          message: 'Success: SELECT orders correctly blocked by RLS'
        })
        console.log(`   ✅ PASS: SELECT orders correctly blocked by RLS`)
        console.log(`      Error message: "${error.message}"`)
      } else {
        results.push({
          test: 'Public SELECT orders blocked',
          passed: false,
          message: `Unexpected error: ${error.message}`,
          details: error
        })
        console.log(`   ⚠️  UNEXPECTED ERROR: ${error.message}`)
      }
    } else {
      // This should NOT happen - means RLS is not working
      const count = data?.length || 0
      results.push({
        test: 'Public SELECT orders blocked',
        passed: false,
        message: `❌ CRITICAL: SELECT succeeded (RLS NOT ENFORCED!) - Retrieved ${count} orders`,
        details: data
      })
      console.log(`   ❌ CRITICAL FAIL: SELECT succeeded - RLS is NOT enforced!`)
      console.log(`      Retrieved ${count} orders`)
    }
  } catch (err) {
    results.push({
      test: 'Public SELECT orders blocked',
      passed: false,
      message: `Error: ${err}`,
      details: err
    })
    console.log(`   ❌ ERROR: ${err}`)
  }

  // Test 5: Service role can manage products
  console.log('\n📋 Test 5: Service role can manage products (should succeed)')
  try {
    const { data, error } = await serviceClient
      .from('products')
      .select('*')
      .limit(5)

    if (error) {
      results.push({
        test: 'Service role SELECT products',
        passed: false,
        message: `Failed: ${error.message}`,
        details: error
      })
      console.log(`   ❌ FAIL: ${error.message}`)
    } else {
      const count = data?.length || 0
      results.push({
        test: 'Service role SELECT products',
        passed: true,
        message: `Success: Service role retrieved ${count} products`
      })
      console.log(`   ✅ PASS: Service role retrieved ${count} products`)
    }
  } catch (err) {
    results.push({
      test: 'Service role SELECT products',
      passed: false,
      message: `Error: ${err}`,
      details: err
    })
    console.log(`   ❌ ERROR: ${err}`)
  }

  // Test 6: Service role can SELECT from orders
  console.log('\n📋 Test 6: Service role can SELECT from orders (should succeed)')
  try {
    const { data, error } = await serviceClient
      .from('orders')
      .select('*')
      .limit(5)

    if (error) {
      results.push({
        test: 'Service role SELECT orders',
        passed: false,
        message: `Failed: ${error.message}`,
        details: error
      })
      console.log(`   ❌ FAIL: ${error.message}`)
    } else {
      const count = data?.length || 0
      results.push({
        test: 'Service role SELECT orders',
        passed: true,
        message: `Success: Service role retrieved ${count} orders`
      })
      console.log(`   ✅ PASS: Service role retrieved ${count} orders`)
    }
  } catch (err) {
    results.push({
      test: 'Service role SELECT orders',
      passed: false,
      message: `Error: ${err}`,
      details: err
    })
    console.log(`   ❌ ERROR: ${err}`)
  }

  // Summary
  console.log('\n═'.repeat(60))
  console.log('\n📊 Test Summary\n')

  const passed = results.filter(r => r.passed).length
  const failed = results.filter(r => !r.passed).length
  const total = results.length

  results.forEach((result, index) => {
    const icon = result.passed ? '✅' : '❌'
    console.log(`${icon} Test ${index + 1}: ${result.test}`)
    console.log(`   ${result.message}`)
  })

  console.log('\n' + '═'.repeat(60))
  console.log(`\n🎯 Results: ${passed}/${total} tests passed`)

  if (failed > 0) {
    console.log(`⚠️  ${failed} test(s) failed`)
    process.exit(1)
  } else {
    console.log('✅ All RLS policies are working correctly!')
    process.exit(0)
  }
}

// Run tests
runTests().catch((error) => {
  console.error('\n❌ Fatal error running tests:', error)
  process.exit(1)
})
