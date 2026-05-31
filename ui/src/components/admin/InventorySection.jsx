import { getStockStatus } from '../../utils/orderStatus'

export default function InventorySection({ inventory, onAdjust }) {
  return (
    <section className="admin-section" aria-label="재고 현황">
      <h2 className="admin-section__title">재고 현황</h2>
      <div className="inventory-grid">
        {inventory.map((item) => {
          const stock = getStockStatus(item.quantity)
          return (
            <article key={item.menuItemId} className="inventory-card">
              <h3 className="inventory-card__name">{item.name}</h3>
              <p className="inventory-card__qty">{item.quantity}개</p>
              <span className={`inventory-card__status inventory-card__status--${stock.level}`}>
                {stock.label}
              </span>
              <div className="inventory-card__controls">
                <button
                  type="button"
                  className="inventory-card__btn"
                  disabled={item.quantity === 0}
                  onClick={() => onAdjust(item.menuItemId, -1)}
                  aria-label={`${item.name} 재고 감소`}
                >
                  −
                </button>
                <button
                  type="button"
                  className="inventory-card__btn"
                  onClick={() => onAdjust(item.menuItemId, 1)}
                  aria-label={`${item.name} 재고 증가`}
                >
                  +
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
