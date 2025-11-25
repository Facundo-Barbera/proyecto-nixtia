# Engineering Backlog

This backlog collects cross-cutting or future action items that emerge from reviews and planning.

Routing guidance:

- Use this file for non-urgent optimizations, refactors, or follow-ups that span multiple stories/epics.
- Must-fix items to ship a story belong in that story's `Tasks / Subtasks`.
- Same-epic improvements may also be captured under the epic Tech Spec `Post-Review Follow-ups` section.

| Date | Story | Epic | Type | Severity | Owner | Status | Notes |
| ---- | ----- | ---- | ---- | -------- | ----- | ------ | ----- |
| 2025-11-24 | 1.2 | 1 | Bug | High | TBD | Open | **BLOCKER**: Apply RLS policies via Supabase SQL Editor - ACs #7-10 not met. SQL file: prisma/rls-policies.sql |
| 2025-11-24 | 1.2 | 1 | Bug | High | TBD | Open | **BLOCKER**: Test RLS enforcement after policies applied - verify public read, blocked writes, service role access |
| 2025-11-24 | 1.2 | 1 | TechDebt | Med | TBD | Open | Add `prisma generate` to build script in package.json:7 - Architecture constraint. Change to: `"build": "prisma generate && next build"` |
| 2025-11-24 | 1.2 | 1 | TechDebt | Med | TBD | Open | Update .env.local with valid SUPABASE_SERVICE_ROLE_KEY from Supabase Dashboard → Settings → API |
| 2025-11-24 | 1.2 | 1 | Enhancement | Low | TBD | Open | Document OrderItem model vs items_json design choice in tech-spec-epic-1.md as intentional improvement |
