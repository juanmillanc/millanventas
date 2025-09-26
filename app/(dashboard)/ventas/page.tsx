'use client'
import { useState, useEffect } from 'react'
import { addSale, getSales, type Sale } from '@/lib/firestore'
import { getProducts, type Product } from '@/lib/firestore'

type CartItem = { id: string; name: string; price: number; qty: number }

export default function VentasPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState<number | ''>('')
  const [qty, setQty] = useState<number | ''>('')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (error) {
      console.error('Error loading products:', error)
    }
  }

  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0)

  function addItem() {
    if (!name || !price || !qty) return
    setItems(prev => [...prev, { id: String(Date.now()), name, price: Number(price), qty: Number(qty) }])
    setName(''); setPrice(''); setQty('')
  }

  function removeItem(id: string) {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  async function saveSale() {
    if (items.length === 0) return
    try {
      setLoading(true)
      await addSale(items.map(item => ({
        name: item.name,
        price: item.price,
        qty: item.qty
      })), total)
      alert(`Venta guardada. Total: $${total.toFixed(2)}`)
      setItems([])
    } catch (error) {
      console.error('Error saving sale:', error)
      alert('Error al guardar venta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Ventas</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Producto" className="w-full border rounded px-3 py-2" />
          <input value={price} onChange={e=>setPrice(Number(e.target.value)||'')} placeholder="Precio" type="number" className="w-full border rounded px-3 py-2" />
          <input value={qty} onChange={e=>setQty(Number(e.target.value)||'')} placeholder="Cantidad" type="number" className="w-full border rounded px-3 py-2" />
          <button onClick={addItem} className="w-full rounded bg-black text-white py-2">Agregar</button>
        </div>
        <div className="md:col-span-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Producto</th>
                <th>Precio</th>
                <th>Cant.</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map(it => (
                <tr key={it.id} className="border-b">
                  <td className="py-2">{it.name}</td>
                  <td>${it.price.toFixed(2)}</td>
                  <td>{it.qty}</td>
                  <td>${(it.price * it.qty).toFixed(2)}</td>
                  <td>
                    <button onClick={()=>removeItem(it.id)} className="text-red-600">Quitar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-lg font-medium">Total: ${total.toFixed(2)}</div>
            <button onClick={saveSale} disabled={loading || items.length === 0} className="rounded bg-green-600 text-white px-4 py-2 disabled:opacity-60">
              {loading ? 'Guardando...' : 'Guardar venta'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


