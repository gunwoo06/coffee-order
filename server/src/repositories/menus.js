import { pool } from '../db/pool.js'

export async function findAllMenusForCustomer() {
  const { rows: menuRows } = await pool.query(`
    SELECT 
      id,
      name,
      description,
      price AS "basePrice",
      image_url AS image,
      stock_quantity AS "stockQuantity"
    FROM menus
    ORDER BY name
  `)

  console.log('DB에서 받은 메뉴 데이터:', menuRows)

  const { rows: optionRows } = await pool.query(`
    SELECT
      id,
      menu_id AS "menuId",
      name,
      price
    FROM options
    ORDER BY menu_id, id
  `)

  const optionsByMenuId = new Map()
  for (const opt of optionRows) {
    if (!optionsByMenuId.has(opt.menuId)) {
      optionsByMenuId.set(opt.menuId, [])
    }
    optionsByMenuId.get(opt.menuId).push({
      id: opt.id,
      name: opt.name,
      price: opt.price
    })
  }

  const result = menuRows.map(menu => {
    // 콜라 메뉴는 옵션 제거
    if (menu.id === 'cola') {
      return { ...menu, options: [] }
    }
    return {
      ...menu,
      options: optionsByMenuId.get(menu.id) || []
    }
  })

  console.log('반환할 메뉴 데이터:', result)
  return result
}
