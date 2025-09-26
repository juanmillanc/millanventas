'use client'
import { useMemo, useState, useEffect } from 'react'
import { getTodaySales, getPendingDebts } from '@/lib/firestore'

export default function ReportesPage() {
  const [todayTotal, setTodayTotal] = useState(0)
  const [pendingDebts, setPendingDebts] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadReports()
  }, [])

  async function loadReports() {
    try {
      setLoading(true)
      const [sales, debts] = await Promise.all([
        getTodaySales(),
        getPendingDebts()
      ])
      setTodayTotal(sales)
      setPendingDebts(debts)
    } catch (error) {
      console.error('Error loading reports:', error)
      alert('Error al cargar reportes')
    } finally {
      setLoading(false)
    }
  }

  return (
      <div className="space-y-6">
        <h1 className="text-xl font-semibold">Reportes</h1>
        <button onClick={loadReports} disabled={loading} className="rounded bg-blue-600 text-white px-4 py-2 disabled:opacity-60">
          {loading ? 'Cargando...' : 'Actualizar'}
        </button>
        <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-4">
          <div className="text-sm text-gray-600">Total vendido hoy</div>
          <div className="text-2xl font-semibold">${todayTotal.toFixed(2)}</div>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <div className="text-sm text-gray-600">Deudas pendientes</div>
          <div className="text-2xl font-semibold">${pendingDebts.toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}


