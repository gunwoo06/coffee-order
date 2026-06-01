import { useEffect, useState } from 'react'
import { fetchMenus } from '../api/menus'
import ProductCard from '../components/ProductCard'
import ShoppingCart from '../components/ShoppingCart'
import { appendOrder } from '../storage/orders'
import { addToCart, getCartTotal, removeCartLine, updateCartQuantity } from '../utils/cart'

export default function OrderPage() {
  const [menus, setMenus] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const [cart, setCart] = useState([])
  const [ordering, setOrdering] = useState(false)
  const [toast, setToast] = useState(null)

  const total = getCartTotal(cart)

  useEffect(() => {
    let cancelled = false

    async function loadMenus() {
      setLoading(true)
      setLoadError(null)
      try {
        const data = await fetchMenus()
        if (!cancelled) setMenus(data)
      } catch (err) {
        if (!cancelled) {
          setLoadError(err.message || '메뉴를 불러오지 못했습니다')
          setMenus([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadMenus()
    return () => {
      cancelled = true
    }
  }, [])

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
      appendOrder(order)
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
        {loading && <p className="menu-grid__status">메뉴를 불러오는 중...</p>}
        {loadError && (
          <p className="menu-grid__status menu-grid__status--error" role="alert">
            {loadError}
            <br />
            <small>API 서버(http://localhost:3001)가 실행 중인지 확인해 주세요.</small>
          </p>
        )}
        {!loading && !loadError && menus.length === 0 && (
          <p className="menu-grid__status">등록된 메뉴가 없습니다.</p>
        )}
        {!loading &&
          !loadError &&
          menus.map((menu) => <ProductCard key={menu.id} menu={menu} onAdd={handleAdd} />)}
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
