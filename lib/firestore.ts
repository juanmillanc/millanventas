import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  deleteDoc, 
  updateDoc,
  query,
  orderBy,
  where,
  Timestamp
} from 'firebase/firestore'
import { db } from './firebase'

// Types
export type Product = {
  id: string
  name: string
  price: number
  createdAt: Timestamp
}

export type Sale = {
  id: string
  items: Array<{
    name: string
    price: number
    qty: number
  }>
  total: number
  date: Timestamp
}

export type Debt = {
  id: string
  client: string
  amount: number
  status: 'pendiente' | 'pagado'
  date: Timestamp
}

// Products CRUD
export async function addProduct(name: string, price: number) {
  const docRef = await addDoc(collection(db, 'products'), {
    name,
    price,
    createdAt: Timestamp.now()
  })
  return docRef.id
}

export async function getProducts(): Promise<Product[]> {
  const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Product))
}

export async function deleteProduct(id: string) {
  await deleteDoc(doc(db, 'products', id))
}

// Sales CRUD
export async function addSale(items: Array<{name: string, price: number, qty: number}>, total: number) {
  const docRef = await addDoc(collection(db, 'sales'), {
    items,
    total,
    date: Timestamp.now()
  })
  return docRef.id
}

export async function getSales(): Promise<Sale[]> {
  const q = query(collection(db, 'sales'), orderBy('date', 'desc'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Sale))
}

// Debts CRUD
export async function addDebt(client: string, amount: number) {
  const docRef = await addDoc(collection(db, 'debts'), {
    client,
    amount,
    status: 'pendiente' as const,
    date: Timestamp.now()
  })
  return docRef.id
}

export async function getDebts(): Promise<Debt[]> {
  const q = query(collection(db, 'debts'), orderBy('date', 'desc'))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Debt))
}

export async function updateDebtStatus(id: string, status: 'pendiente' | 'pagado') {
  await updateDoc(doc(db, 'debts', id), { status })
}

// Reports
export async function getTodaySales(): Promise<number> {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const q = query(
    collection(db, 'sales'),
    where('date', '>=', Timestamp.fromDate(today)),
    where('date', '<', Timestamp.fromDate(tomorrow))
  )
  
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.reduce((sum, doc) => sum + doc.data().total, 0)
}

export async function getPendingDebts(): Promise<number> {
  const q = query(
    collection(db, 'debts'),
    where('status', '==', 'pendiente')
  )
  
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.reduce((sum, doc) => sum + doc.data().amount, 0)
}
