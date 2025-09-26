import Protected from '@/app/protected'
import { AuthProvider } from '@/app/providers/AuthProvider'

export default function DashboardTemplate({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Protected>
        {children}
      </Protected>
    </AuthProvider>
  )
}


