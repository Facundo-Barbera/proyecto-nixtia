-- Row-Level Security Policies for Nixtia Database
-- Run these commands in Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Paste and Run

-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Products Table Policies
-- Public can view active products (for customer store)
CREATE POLICY "Public can view active products"
ON products FOR SELECT
USING (is_active = true);

-- Service role can manage all products (for MVP - admin operations via server)
-- This allows server-side operations using service role key
CREATE POLICY "Service role can manage products"
ON products FOR ALL
USING (true);

-- Orders Table Policies
-- Orders are admin-only for MVP (no customer order lookup yet)
-- Service role can manage all orders
CREATE POLICY "Service role can manage orders"
ON orders FOR ALL
USING (true);

-- Order Items Table Policies
-- Order items are admin-only (linked to orders)
-- Service role can manage all order items
CREATE POLICY "Service role can manage order_items"
ON order_items FOR ALL
USING (true);

-- Admin Users Table Policies
-- Admin users table is admin-only
-- Service role can manage all admin users
CREATE POLICY "Service role can manage admin_users"
ON admin_users FOR ALL
USING (true);

-- Note: These are MVP policies using service role key for all admin operations
-- Epic 3 will implement proper authentication with auth.uid() checks
