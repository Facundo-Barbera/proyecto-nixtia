-- Complete Row-Level Security Setup for Nixtia Database
-- Run these commands in Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Paste and Run
--
-- This file includes:
-- 1. Schema-level grants
-- 2. Table-level grants
-- 3. RLS policy enablement
-- 4. RLS policy definitions

-- ============================================================================
-- PART 1: Schema and Table Access Grants
-- ============================================================================

-- Grant usage on public schema to authenticated and anon roles
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant SELECT on all tables to anon role (restricted by RLS policies)
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;

-- Grant all privileges to authenticated role (restricted by RLS policies)
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;

-- Grant all privileges to service_role (bypasses RLS for admin operations)
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;

-- Grant usage on all sequences (for auto-incrementing IDs if any)
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;

-- ============================================================================
-- PART 2: Enable Row-Level Security on All Tables
-- ============================================================================

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- PART 3: Products Table Policies
-- ============================================================================

-- Drop existing policies if they exist (for re-running script)
DROP POLICY IF EXISTS "Public can view active products" ON products;
DROP POLICY IF EXISTS "Service role can manage products" ON products;
DROP POLICY IF EXISTS "Authenticated users can view active products" ON products;

-- Public (anon) can view active products (for customer store)
CREATE POLICY "Public can view active products"
ON products FOR SELECT
TO anon
USING (is_active = true);

-- Authenticated users can also view active products
CREATE POLICY "Authenticated users can view active products"
ON products FOR SELECT
TO authenticated
USING (is_active = true);

-- Service role can manage all products (bypasses RLS automatically)
-- Note: service_role bypasses RLS by default in Supabase, but we define it explicitly
CREATE POLICY "Service role can manage products"
ON products FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================================================
-- PART 4: Orders Table Policies
-- ============================================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Service role can manage orders" ON orders;

-- Orders are admin-only for MVP (no customer order lookup yet)
-- Service role can manage all orders
CREATE POLICY "Service role can manage orders"
ON orders FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Note: No anon or authenticated policies - orders are completely private for MVP

-- ============================================================================
-- PART 5: Order Items Table Policies
-- ============================================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Service role can manage order_items" ON order_items;

-- Order items are admin-only (linked to orders)
-- Service role can manage all order items
CREATE POLICY "Service role can manage order_items"
ON order_items FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================================================
-- PART 6: Admin Users Table Policies
-- ============================================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Service role can manage admin_users" ON admin_users;

-- Admin users table is admin-only
-- Service role can manage all admin users
CREATE POLICY "Service role can manage admin_users"
ON admin_users FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- You can verify the policies are created with:
-- SELECT tablename, policyname, roles, cmd, qual FROM pg_policies WHERE schemaname = 'public';

-- Expected results:
-- products: 3 policies (public view, authenticated view, service_role all)
-- orders: 1 policy (service_role all)
-- order_items: 1 policy (service_role all)
-- admin_users: 1 policy (service_role all)

-- ============================================================================
-- NOTES
-- ============================================================================
--
-- MVP Implementation (Epic 1):
-- - These policies use service_role key for all admin operations
-- - Public/anon can only read active products
-- - No user authentication yet
--
-- Epic 3 Implementation:
-- - Will add proper authentication using auth.uid()
-- - Authenticated users will be able to view their own orders
-- - Admin users will be identified via admin_users table
-- - Replace service_role policies with auth.uid() checks
--
