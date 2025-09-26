import Link from 'next/link'
import Protected from '@/app/protected'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Protected>
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-[220px_1fr]">
        <aside className="border-b md:border-b-0 md:border-r bg-white">
          <div className="p-4 text-lg font-semibold">Millan Ventas</div>
          <nav className="p-2 space-y-1">
            <Link className="block px-3 py-2 hover:bg-gray-100 rounded" href="/ventas">Ventas</Link>
            <Link className="block px-3 py-2 hover:bg-gray-100 rounded" href="/deudas">Deudas</Link>
            <Link className="block px-3 py-2 hover:bg-gray-100 rounded" href="/reportes">Reportes</Link>
            <Link className="block px-3 py-2 hover:bg-gray-100 rounded" href="/productos">Productos</Link>
          </nav>
        </aside>
        <main className="p-4">{children}</main>
      </div>
    </Protected>
  )
}


