import { INVENTORY_STORAGE_KEY } from '../constants/storage'
import { DEFAULT_INVENTORY } from '../data/inventory'

export function loadInventory() {
  try {
    const raw = localStorage.getItem(INVENTORY_STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* fall through */
  }
  saveInventory(DEFAULT_INVENTORY)
  return [...DEFAULT_INVENTORY]
}

export function saveInventory(items) {
  localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(items))
}

export function updateInventoryQuantity(menuItemId, delta) {
  const items = loadInventory()
  const next = items.map((item) => {
    if (item.menuItemId !== menuItemId) return item
    const quantity = Math.max(0, item.quantity + delta)
    return { ...item, quantity }
  })
  saveInventory(next)
  return next
}
