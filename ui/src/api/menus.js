const API_BASE = import.meta.env.VITE_API_BASE ?? ''

export async function fetchMenus() {
  const res = await fetch(`${API_BASE}/api/menus`)

  if (!res.ok) {
    let detail = `HTTP ${res.status}`
    try {
      const body = await res.json()
      if (body.error) detail = body.error
    } catch {
      /* ignore */
    }
    throw new Error(detail)
  }

  const data = await res.json()
  return data.menus ?? []
}
