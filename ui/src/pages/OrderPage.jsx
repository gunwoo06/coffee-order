import { useEffect, useState } from 'react'
import { fetchMenus } from '../api/menus'
import ProductCard from '../components/ProductCard'
import ShoppingCart from '../components/ShoppingCart'
import { isProd } from '../config/app'
import { MENUS } from '../data/menus'
import { appendOrder } from '../storage/orders'
import { addToCart, getCartTotal, removeCartLine, updateCartQuantity, calcUnitPrice } from '../utils/cart'
import { CART_STORAGE_KEY } from '../constants/storage'

function loadCartFromStorage(menus) {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    const savedCart = JSON.parse(raw)
    // 저장된 cart 데이터를 현재 메뉴 가격으로 재계산
    return savedCart.map(line => {
      const menu = menus.find(m => m.id === line.menuItemId)
      if (!menu) return line
      const unitPrice = calcUnitPrice(menu.basePrice, line.selectedOptions || [])
      return {
        ...line,
        unitPrice,
        lineTotal: unitPrice * line.quantity
      }
    })
  } catch {
    return []
  }
}

function saveCartToStorage(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
}

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

      if (isProd) {
        try {
          const data = await fetchMenus()
          console.log('API에서 받은 메뉴 데이터:', data)
          const processedData = data.map(menu => {
            const localMenu = MENUS.find(m => m.id === menu.id)
            return {
              ...menu,
              options: localMenu?.options ?? menu.options
            }
          }).sort((a, b) => b.basePrice - a.basePrice) // 가격 높은순 → 낮은 순으로 정렬
          console.log('처리된 메뉴 데이터:', processedData)
          if (!cancelled) {
            setMenus(processedData)
            setCart(loadCartFromStorage(processedData))
          }
        } catch (err) {
          console.error('메뉴 불러오기 오류:', err)
          if (!cancelled) {
            setLoadError(err.message || '메뉴를 불러오지 못했습니다')
            setMenus([])
          }
        } finally {
          if (!cancelled) setLoading(false)
        }
      } else {
        if (!cancelled) {
          const sortedMenus = [...MENUS].sort((a, b) => b.basePrice - a.basePrice) // 가격 높은순 → 낮은 순으로 정렬
          setMenus(sortedMenus)
          setCart(loadCartFromStorage(sortedMenus))
          setLoading(false)
        }
      }
    }

    loadMenus()
    return () => {
      cancelled = true
    }
  }, [])

  // cart가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    if (menus.length > 0) {
      saveCartToStorage(cart)
    }
  }, [cart, menus])

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
            메뉴를 불러오지 못했습니다.
            <br />
            <small>{loadError}</small>
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
