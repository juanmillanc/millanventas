'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/providers/AuthProvider'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { login } = useAuth()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (!email || !password) throw new Error('Ingresa email y contraseña')
      await login(email, password)
      router.push('/ventas')
    } catch (err: any) {
      setError(err.message ?? 'Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4 bg-white p-6 rounded-lg shadow">
        <h1 className="text-xl font-semibold">Iniciar sesión</h1>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="space-y-1">
          <label className="text-sm">Email</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="w-full border rounded px-3 py-2" placeholder="tu@correo.com" required />
        </div>
        <div className="space-y-1">
          <label className="text-sm">Contraseña</label>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="w-full border rounded px-3 py-2" placeholder="••••••••" required />
        </div>
        <button disabled={loading} className="w-full rounded bg-black text-white py-2 disabled:opacity-60">
          {loading ? 'Ingresando...' : 'Entrar'}
        </button>
      </form>
    </main>
  )
}


