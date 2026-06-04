import { INVENTORY_STORAGE_KEY } from '../constants/storage'
import { DEFAULT_INVENTORY } from '../data/inventory'

export function loadInventory(menusFromApi = null) {
  try {
    const raw = localStorage.getItem(INVENTORY_STORAGE_KEY)
    const existing = raw ? JSON.parse(raw) : null
    
    // API에서 메뉴를 받았으면 무조건 API 데이터로 초기화 (DB의 stock_quantity 우선)
    if (menusFromApi) {
      const apiInventory = menusFromApi.map(menu => ({
        menuItemId: menu.id,
        name: menu.name,
        quantity: menu.stockQuantity ?? 10
      }))
      
      // API 데이터로 로컬 스토리지 덮어쓰기
      saveInventory(apiInventory)
      return apiInventory
    }
    
    // API 데이터가 없고 기존 데이터가 있으면 기존 데이터 반환
    if (existing) {
      const merged = DEFAULT_INVENTORY.map(defaultItem => {
        const existingItem = existing.find(item => item.menuItemId === defaultItem.menuItemId)
        return existingItem ?? defaultItem
      })
      return merged
    }
  } catch {
    /* fall through */
  }
  
  // 아무것도 없으면 기본 데이터 반환
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
