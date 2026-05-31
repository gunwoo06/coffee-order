import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import ShoppingCart from '../components/ShoppingCart'
import { MENUS } from '../data/menus'
import { addToCart, getCartTotal, removeCartLine, updateCartQuantity } from '../utils/cart'

const ORDERS_STORAGE_KEY = 'cozy-orders'

export default function OrderPage() {
  const [cart, setCart] = useState([])
  const [ordering, setOrdering] = useState(false)
  const [toast, setToast] = useState(null)

  const total = getCartTotal(cart)

  const showToast = (message) => {
    setToast(message)
    setTimeout(() => setToast(null), 2000)
  }

  const handleAdd = (menu, selectedOptions) => {
    setCart((prev) => addToCart(prev, menu, selectedOptions))
    showToast('장바구니에 담았습니다')
  }

  const handleQuantityChange = (key, delta) => {
    setCart((prev) => updateCartQuantity(prev, key, delta))
  }

  const handleRemove = (key) => {
    setCart((prev) => removeCartLine(prev, key))
    showToast('장바구니에서 삭제했습니다')
  }

  const handleOrder = () => {
    if (cart.length === 0) {
      showToast('담은 메뉴가 없습니다')
      return
    }

    setOrdering(true)

    const order = {
      id: crypto.randomUUID(),
      items: cart.map((line) => ({ ...line })),
      totalAmount: total,
      orderedAt: new Date().toISOString(),
      status: 'PENDING',
    }

    try {
      const existing = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]')
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify([...existing, order]))
      setCart([])
      showToast('주문이 완료되었습니다')
    } catch {
      showToast('주문에 실패했습니다. 다시 시도해 주세요')
    } finally {
      setOrdering(false)
    }
  }

  return (
    <div className="order-page">
      <section className="menu-grid" aria-label="메뉴 목록">
        {MENUS.map((menu) => (
          <ProductCard key={menu.id} menu={menu} onAdd={handleAdd} />
        ))}
      </section>
      <ShoppingCart
        cart={cart}
        total={total}
        onOrder={handleOrder}
        onQuantityChange={handleQuantityChange}
        onRemove={handleRemove}
        ordering={ordering}
      />
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  )
}
