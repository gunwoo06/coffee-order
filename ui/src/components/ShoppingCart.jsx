import { formatCartLineName } from '../utils/cart'
import { getMenuImage } from '../data/menus'
import { formatPrice } from '../utils/format'
import MenuImage from './MenuImage'

export default function ShoppingCart({
  cart,
  total,
  onOrder,
  onQuantityChange,
  onRemove,
  ordering,
}) {
  const isEmpty = cart.length === 0

  return (
    <section className="cart" aria-label="장바구니">
      <h2 className="cart__title">장바구니</h2>
      <div className="cart__body">
        <ul className={`cart__list ${isEmpty ? 'cart__list--empty' : ''}`}>
          {isEmpty ? (
            <li className="cart__empty">담은 메뉴가 없습니다</li>
          ) : (
            cart.map((line) => (
              <li key={line.key} className="cart__item">
                <MenuImage
                  src={line.image || getMenuImage(line.menuItemId)}
                  alt={line.name}
                  className="cart__item-thumb"
                />
                <div className="cart__item-info">
                  <span className="cart__item-label">
                    {formatCartLineName(line.name, line.selectedOptions)}
                  </span>
                  <div className="cart__item-controls">
                    <div className="qty-stepper" role="group" aria-label="수량 조절">
                      <button
                        type="button"
                        className="qty-stepper__btn"
                        onClick={() => onQuantityChange(line.key, -1)}
                        aria-label="수량 줄이기"
                      >
                        −
                      </button>
                      <span className="qty-stepper__value" aria-live="polite">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        className="qty-stepper__btn"
                        onClick={() => onQuantityChange(line.key, 1)}
                        aria-label="수량 늘리기"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="btn btn--cancel cart__cancel"
                      onClick={() => onRemove(line.key)}
                    >
                      취소
                    </button>
                  </div>
                </div>
                <span className="cart__item-price">{formatPrice(line.lineTotal)}</span>
              </li>
            ))
          )}
        </ul>
        <div className="cart__summary">
          <p className="cart__total">총 금액 {formatPrice(total)}</p>
          <button
            type="button"
            className="btn btn--primary btn--large cart__order"
            disabled={isEmpty || ordering}
            onClick={onOrder}
          >
            {ordering ? '주문 중...' : '주문하기'}
          </button>
        </div>
      </div>
    </section>
  )
}
