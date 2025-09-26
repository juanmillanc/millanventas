import './globals.css'
import type { Metadata } from 'next'
import { AuthProvider } from '@/app/providers/AuthProvider'

export const metadata: Metadata = {
  title: 'Millan Ventas',
  description: 'Dashboard simple para ventas y deudas',
  manifest: '/manifest.json',
  themeColor: '#111827',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="min-h-screen antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}


