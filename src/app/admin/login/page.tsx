import { LoginForm } from '@/components/admin/LoginForm'

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Nixtia Logo and Branding */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-600">
            <span className="text-2xl font-bold text-white">N</span>
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Nixtia Admin
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to manage your business
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-lg shadow-md px-8 py-10">
          <LoginForm />
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-500">
          Protected by Supabase Authentication
        </p>
      </div>
    </div>
  )
}
