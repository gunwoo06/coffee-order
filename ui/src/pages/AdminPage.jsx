import { useCallback, useEffect, useState } from 'react'
import AdminDashboard from '../components/admin/AdminDashboard'
import InventorySection from '../components/admin/InventorySection'
import OrderListSection from '../components/admin/OrderListSection'
import { INVENTORY_STORAGE_KEY, ORDERS_STORAGE_KEY } from '../constants/storage'
import { loadInventory, updateInventoryQuantity } from '../storage/inventory'
import { loadOrders, updateOrderStatus } from '../storage/orders'
import { computeDashboardStats } from '../utils/orderStatus'
import { isProd } from '../config/app'
import { fetchMenus } from '../api/menus'
import { MENUS } from '../data/menus'

const POLL_MS = 3000

export default function AdminPage() {
  const [orders, setOrders] = useState([])
  const [inventory, setInventory] = useState([])
  const [menus, setMenus] = useState([])

  const refresh = useCallback(async () => {
    setOrders(loadOrders())
    
    let currentMenus = []
    if (isProd) {
      try {
        currentMenus = await fetchMenus()
      } catch {
        currentMenus = MENUS
      }
    } else {
      currentMenus = MENUS
    }
    
    setMenus(currentMenus)
    // 메뉴 API에서 받은 stockQuantity를 직접 재고로 사용
    const inventoryFromMenus = currentMenus.map(menu => ({
      menuItemId: menu.id,
      name: menu.name,
      quantity: menu.stockQuantity ?? 10
    }))
    setInventory(inventoryFromMenus)
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
    setInventory(prev => prev.map(item => {
      if (item.menuItemId !== menuItemId) return item
      const newQuantity = Math.max(0, item.quantity + delta)
      return { ...item, quantity: newQuantity }
    }))
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
