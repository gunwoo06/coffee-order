import { ORDERS_STORAGE_KEY } from '../constants/storage'

export function loadOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveOrders(orders) {
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))
}

export function updateOrderStatus(orderId, status) {
  const orders = loadOrders()
  const next = orders.map((o) => (o.id === orderId ? { ...o, status } : o))
  saveOrders(next)
  return next
}

export function appendOrder(order) {
  const orders = loadOrders()
  const next = [...orders, order]
  saveOrders(next)
  return next
}
