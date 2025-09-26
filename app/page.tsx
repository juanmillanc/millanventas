import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-center">Millan Ventas</h1>
        <p className="text-center text-sm text-gray-600">Inicia sesión para continuar</p>
        <Link href="/login" className="block w-full text-center rounded-md bg-black text-white px-4 py-2">Ir a Login</Link>
      </div>
    </main>
  )
}


