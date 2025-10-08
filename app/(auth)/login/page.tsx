import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Hero image */}
      <div className="relative hidden w-1/2 bg-gradient-to-br from-primary via-primary to-primary/80 lg:flex lg:items-center lg:justify-center">
        <div className="text-center">
          <h1 className="text-8xl font-bold text-white drop-shadow-lg">ReliaBESS</h1>
          <p className="mt-4 text-xl text-white/90">Advanced Device Management System</p>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex w-full items-center justify-center bg-background lg:w-1/2">
        <div className="w-full max-w-md px-8">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
