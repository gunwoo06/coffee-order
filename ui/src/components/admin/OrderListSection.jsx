import { formatOrderRow } from '../../utils/orderFormat'
import { getStatusAction } from '../../utils/orderStatus'

export default function OrderListSection({ orders, onStatusChange }) {
  const sorted = [...orders].sort(
    (a, b) => new Date(a.orderedAt) - new Date(b.orderedAt),
  )

  return (
    <section className="admin-section" aria-label="주문 현황">
      <h2 className="admin-section__title">주문 현황</h2>
      {sorted.length === 0 ? (
        <p className="admin-empty">접수된 주문이 없습니다</p>
      ) : (
        <ul className="order-list">
          {sorted.map((order) => {
            const row = formatOrderRow(order)
            const action = getStatusAction(order.status)
            return (
              <li key={order.id} className="order-list__item">
                <span className="order-list__datetime">{row.datetime}</span>
                <span className="order-list__items">{row.items}</span>
                <span className="order-list__amount">{row.amount}</span>
                {action ? (
                  <button
                    type="button"
                    className="btn btn--primary order-list__action"
                    onClick={() => onStatusChange(order.id, action.next)}
                  >
                    {action.label}
                  </button>
                ) : (
                  <span className="order-list__done">완료</span>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
