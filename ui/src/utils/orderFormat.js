import { formatOptionLabel } from './cart'
import { formatPrice } from './format'

export function formatOrderDateTime(isoString) {
  const date = new Date(isoString)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${month}월 ${day}일 ${hours}:${minutes}`
}

export function formatOrderItemsSummary(items) {
  return items
    .map((item) => {
      const opt = formatOptionLabel(item.selectedOptions || [])
      return `${item.name}${opt} x ${item.quantity}`
    })
    .join(', ')
}

export function formatOrderRow(order) {
  return {
    datetime: formatOrderDateTime(order.orderedAt),
    items: formatOrderItemsSummary(order.items),
    amount: formatPrice(order.totalAmount),
  }
}
