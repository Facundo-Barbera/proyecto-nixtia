-- Check RLS policies
SELECT tablename, policyname, roles FROM pg_policies WHERE schemaname = 'public' ORDER BY tablename, policyname;
