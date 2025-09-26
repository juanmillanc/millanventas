'use client'
import { useState, useEffect } from 'react'
import { addProduct, getProducts, deleteProduct, type Product } from '@/lib/firestore'

export default function ProductosPage() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState<number | ''>('')
  const [products, setProducts] = useState<Product[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    try {
      setLoading(true)
      const data = await getProducts()
      setProducts(data)
    } catch (error) {
      console.error('Error loading products:', error)
      alert('Error al cargar productos')
    } finally {
      setLoading(false)
    }
  }

  async function handleAddProduct() {
    if (!name || !price) return
    try {
      setLoading(true)
      await addProduct(name, Number(price))
      setName(''); setPrice('')
      await loadProducts() // Recargar lista
    } catch (error) {
      console.error('Error adding product:', error)
      alert('Error al agregar producto')
    } finally {
      setLoading(false)
    }
  }

  async function handleRemoveProduct(id: string) {
    if (!confirm('¿Eliminar este producto?')) return
    try {
      setLoading(true)
      await deleteProduct(id)
      await loadProducts() // Recargar lista
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Error al eliminar producto')
    } finally {
      setLoading(false)
    }
  }

  const filtered = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Productos</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre" className="w-full border rounded px-3 py-2" />
          <input value={price} onChange={e=>setPrice(Number(e.target.value)||'')} placeholder="Precio" type="number" className="w-full border rounded px-3 py-2" />
          <button onClick={handleAddProduct} disabled={loading} className="w-full rounded bg-black text-white py-2 disabled:opacity-60">
            {loading ? 'Guardando...' : 'Agregar'}
          </button>
        </div>
        <div className="md:col-span-2 space-y-3">
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar" className="w-full border rounded px-3 py-2" />
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Nombre</th>
                <th>Precio</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b">
                  <td className="py-2">{p.name}</td>
                  <td>${p.price.toFixed(2)}</td>
                  <td><button onClick={()=>handleRemoveProduct(p.id)} className="text-red-600">Eliminar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


