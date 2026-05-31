import { useCallback, useEffect, useState } from 'react'
import AdminDashboard from '../components/admin/AdminDashboard'
import InventorySection from '../components/admin/InventorySection'
import OrderListSection from '../components/admin/OrderListSection'
import { INVENTORY_STORAGE_KEY, ORDERS_STORAGE_KEY } from '../constants/storage'
import { loadInventory, updateInventoryQuantity } from '../storage/inventory'
import { loadOrders, updateOrderStatus } from '../storage/orders'
import { computeDashboardStats } from '../utils/orderStatus'

const POLL_MS = 3000

export default function AdminPage() {
  const [orders, setOrders] = useState([])
  const [inventory, setInventory] = useState([])

  const refresh = useCallback(() => {
    setOrders(loadOrders())
    setInventory(loadInventory())
  }, [])

  useEffect(() => {
    refresh()
    const timer = setInterval(refresh, POLL_MS)
    const onStorage = (e) => {
      if (e.key === ORDERS_STORAGE_KEY || e.key === INVENTORY_STORAGE_KEY) refresh()
    }
    window.addEventListener('storage', onStorage)
    window.addEventListener('focus', refresh)
    return () => {
      clearInterval(timer)
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('focus', refresh)
    }
  }, [refresh])

  const stats = computeDashboardStats(orders)

  const handleInventoryAdjust = (menuItemId, delta) => {
    setInventory(updateInventoryQuantity(menuItemId, delta))
  }

  const handleStatusChange = (orderId, status) => {
    setOrders(updateOrderStatus(orderId, status))
  }

  return (
    <div className="admin-page">
      <AdminDashboard stats={stats} />
      <InventorySection inventory={inventory} onAdjust={handleInventoryAdjust} />
      <OrderListSection orders={orders} onStatusChange={handleStatusChange} />
    </div>
  )
}
