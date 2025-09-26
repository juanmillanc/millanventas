'use client'
import { useState, useEffect } from 'react'
import { addDebt, getDebts, updateDebtStatus, type Debt } from '@/lib/firestore'

export default function DeudasPage() {
  const [client, setClient] = useState('')
  const [amount, setAmount] = useState<number | ''>('')
  const [debts, setDebts] = useState<Debt[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadDebts()
  }, [])

  async function loadDebts() {
    try {
      setLoading(true)
      const data = await getDebts()
      setDebts(data)
    } catch (error) {
      console.error('Error loading debts:', error)
      alert('Error al cargar deudas')
    } finally {
      setLoading(false)
    }
  }

  async function handleAddDebt() {
    if (!client || !amount) return
    try {
      setLoading(true)
      await addDebt(client, Number(amount))
      setClient(''); setAmount('')
      await loadDebts() // Recargar lista
    } catch (error) {
      console.error('Error adding debt:', error)
      alert('Error al agregar deuda')
    } finally {
      setLoading(false)
    }
  }

  async function handleToggleStatus(id: string, currentStatus: 'pendiente' | 'pagado') {
    try {
      setLoading(true)
      const newStatus = currentStatus === 'pendiente' ? 'pagado' : 'pendiente'
      await updateDebtStatus(id, newStatus)
      await loadDebts() // Recargar lista
    } catch (error) {
      console.error('Error updating debt:', error)
      alert('Error al actualizar deuda')
    } finally {
      setLoading(false)
    }
  }

  const pendingTotal = debts.filter(d=>d.status==='pendiente').reduce((s,d)=>s+d.amount,0)

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Deudas</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <input value={client} onChange={e=>setClient(e.target.value)} placeholder="Cliente" className="w-full border rounded px-3 py-2" />
          <input value={amount} onChange={e=>setAmount(Number(e.target.value)||'')} placeholder="Monto" type="number" className="w-full border rounded px-3 py-2" />
          <button onClick={handleAddDebt} disabled={loading} className="w-full rounded bg-black text-white py-2 disabled:opacity-60">
            {loading ? 'Guardando...' : 'Agregar deuda'}
          </button>
        </div>
        <div className="md:col-span-2 space-y-4">
          <div className="text-sm text-gray-600">Pendiente total: ${pendingTotal.toFixed(2)}</div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Cliente</th>
                <th>Monto</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {debts.map(d => (
                <tr key={d.id} className="border-b">
                  <td className="py-2">{d.client}</td>
                  <td>${d.amount.toFixed(2)}</td>
                  <td>{d.date.toDate().toLocaleString()}</td>
                  <td>
                    <span className={d.status==='pendiente' ? 'text-yellow-700' : 'text-green-700'}>{d.status}</span>
                  </td>
                  <td>
                    <button onClick={()=>handleToggleStatus(d.id, d.status)} className="text-blue-600">Cambiar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


