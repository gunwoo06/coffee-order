/** public/menus 폴더 기준 — Vite가 루트에서 그대로 제공 */
const img = (file) => `${import.meta.env.BASE_URL}menus/${file}`

export const MENU_OPTIONS = [
  { id: 'shot', name: '샷 추가', price: 500 },
  { id: 'syrup', name: '시럽 추가', price: 0 },
]

export const MENU_IMAGES = {
  'americano-ice': img('americano-ice.png'),
  'americano-hot': img('americano-hot.png'),
  'cafe-latte': img('cafe-latte.png'),
  'cappuccino': img('cappuccino.png'),
  'cold-brew': img('cold-brew.png'),
  'vanilla-latte': img('vanilla-latte.png'),
}

export function getMenuImage(menuItemId) {
  return MENU_IMAGES[menuItemId] ?? ''
}

export const MENUS = [
  {
    id: 'americano-ice',
    name: '아메리카노(ICE)',
    basePrice: 4000,
    description: '시원하고 깔끔한 아이스 아메리카노',
    image: MENU_IMAGES['americano-ice'],
    options: MENU_OPTIONS,
  },
  {
    id: 'americano-hot',
    name: '아메리카노(HOT)',
    basePrice: 4000,
    description: '진한 에스프레소의 깊은 맛',
    image: MENU_IMAGES['americano-hot'],
    options: MENU_OPTIONS,
  },
  {
    id: 'cafe-latte',
    name: '카페라떼',
    basePrice: 5000,
    description: '부드러운 우유와 에스프레소의 조화',
    image: MENU_IMAGES['cafe-latte'],
    options: MENU_OPTIONS,
  },
  {
    id: 'cappuccino',
    name: '카푸치노',
    basePrice: 5000,
    description: '풍성한 우유 거품이 일품',
    image: MENU_IMAGES.cappuccino,
    options: MENU_OPTIONS,
  },
  {
    id: 'cold-brew',
    name: '콜드브루',
    basePrice: 5500,
    description: '12시간 저온 추출한 콜드브루',
    image: MENU_IMAGES['cold-brew'],
    options: MENU_OPTIONS,
  },
  {
    id: 'vanilla-latte',
    name: '바닐라라떼',
    basePrice: 5500,
    description: '달콤한 바닐라 시럽이 들어간 라떼',
    image: MENU_IMAGES['vanilla-latte'],
    options: MENU_OPTIONS,
  },
]
