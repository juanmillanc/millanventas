import Link from 'next/link'

export default function DashboardHome() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Bienvenido</h1>
      <div className="grid gap-3 md:grid-cols-3">
        <Link className="rounded border p-4 hover:bg-gray-50" href="/ventas">Ir a Ventas</Link>
        <Link className="rounded border p-4 hover:bg-gray-50" href="/deudas">Ir a Deudas</Link>
        <Link className="rounded border p-4 hover:bg-gray-50" href="/reportes">Ir a Reportes</Link>
      </div>
    </div>
  )
}


