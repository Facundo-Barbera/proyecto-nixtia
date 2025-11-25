import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

/**
 * POST /api/auth/logout
 * Logs out the current admin user by clearing the Supabase session
 */
export async function POST() {
  try {
    const supabase = await createClient()

    // Sign out the user (clears session and cookies)
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('[Logout] Supabase signOut error:', error)
      return NextResponse.json(
        { error: 'Failed to sign out. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[Logout] Unexpected error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
