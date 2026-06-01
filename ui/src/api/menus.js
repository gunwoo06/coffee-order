const API_BASE = import.meta.env.VITE_API_BASE ?? ''

export async function fetchMenus() {
  const res = await fetch(`${API_BASE}/api/menus`)
  if (!res.ok) {
    throw new Error('메뉴 목록을 불러오지 못했습니다')
  }
  const data = await res.json()
  return data.menus ?? []
}
