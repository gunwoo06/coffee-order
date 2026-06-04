/** public/menus 폴더 기준 — Vite가 루트에서 그대로 제공 */
const img = (file) => `${import.meta.env.BASE_URL}menus/${file}`

export const MENU_OPTIONS = [
  { id: 'extra-rice', name: '양많이', price: 500 },
  { id: 'rice-bowl', name: '공기밥 추가', price: 1000 },
]

export const MENU_IMAGES = {
  'kimchi-fried-rice': img('kimchi-fried-rice.jpg'),
  'shrimp-fried-rice': img('shrimp-fried-rice.jpg'),
  'kimchi-jjigae': img('kimchi-jjigae.jpg'),
  'doenjang-jjigae': img('doenjang-jjigae.jpg'),
  'sundubu-jjigae': img('sundubu-jjigae.jpg'),
  'cola': img('cola.jpg'),
}

export function getMenuImage(menuItemId) {
  return MENU_IMAGES[menuItemId] ?? ''
}

export const MENUS = [
  {
    id: 'kimchi-fried-rice',
    name: '김치볶음밥',
    basePrice: 123123,
    description: '매콤한 김치와 밥의 완벽한 조화',
    image: MENU_IMAGES['kimchi-fried-rice'],
    stockQuantity: 12321,
    options: MENU_OPTIONS,
  },
  {
    id: 'shrimp-fried-rice',
    name: '새우볶음밥',
    basePrice: 9000,
    description: '통통한 새우가 들어간 고소한 볶음밥',
    image: MENU_IMAGES['shrimp-fried-rice'],
    stockQuantity: 10,
    options: MENU_OPTIONS,
  },
  {
    id: 'kimchi-jjigae',
    name: '김치찌개',
    basePrice: 7000,
    description: '시원하고 매콤한 김치찌개',
    image: MENU_IMAGES['kimchi-jjigae'],
    stockQuantity: 10,
    options: MENU_OPTIONS,
  },
  {
    id: 'doenjang-jjigae',
    name: '된장찌개',
    basePrice: 7000,
    description: '고소한 된장의 깊은 맛',
    image: MENU_IMAGES['doenjang-jjigae'],
    stockQuantity: 10,
    options: MENU_OPTIONS,
  },
  {
    id: 'sundubu-jjigae',
    name: '순두부찌개',
    basePrice: 7500,
    description: '부드러운 순두부가 들어간 찌개',
    image: MENU_IMAGES['sundubu-jjigae'],
    stockQuantity: 10,
    options: MENU_OPTIONS,
  },
  {
    id: 'cola',
    name: '콜라',
    basePrice: 2000,
    description: '시원한 콜라',
    image: MENU_IMAGES['cola'],
    stockQuantity: 10,
    options: [],
  },
]
