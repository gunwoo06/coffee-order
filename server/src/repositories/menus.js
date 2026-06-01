import { pool } from '../db/pool.js'

const DEFAULT_OPTIONS = [
  { id: 'shot', name: '샷 추가', price: 500 },
  { id: 'syrup', name: '시럽 추가', price: 0 },
]

export async function findAllMenusForCustomer() {
  const menusResult = await pool.query(
    `SELECT id, name, description, price, image_url
     FROM menus
     ORDER BY name`,
  )

  const optionsResult = await pool.query(
    `SELECT id, menu_id, name, price
     FROM options
     ORDER BY menu_id, id`,
  )

  const optionsByMenu = new Map()
  for (const row of optionsResult.rows) {
    const list = optionsByMenu.get(row.menu_id) ?? []
    list.push({ id: row.id, name: row.name, price: row.price })
    optionsByMenu.set(row.menu_id, list)
  }

  return menusResult.rows.map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    basePrice: row.price,
    image: row.image_url,
    options: optionsByMenu.get(row.id)?.length
      ? optionsByMenu.get(row.id)
      : [...DEFAULT_OPTIONS],
  }))
}
