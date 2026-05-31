export const ORDER_STATUS = {
  PENDING: 'PENDING',
  RECEIVED: 'RECEIVED',
  PREPARING: 'PREPARING',
  DONE: 'DONE',
}

export const STATUS_ACTIONS = {
  PENDING: { label: '주문 접수', next: ORDER_STATUS.RECEIVED },
  RECEIVED: { label: '제조 시작', next: ORDER_STATUS.PREPARING },
  PREPARING: { label: '제조 완료', next: ORDER_STATUS.DONE },
  DONE: null,
}

export function getStatusAction(status) {
  return STATUS_ACTIONS[status] ?? null
}

/** 대시보드: 주문 접수 = PENDING + RECEIVED */
export function computeDashboardStats(orders) {
  return {
    total: orders.length,
    received: orders.filter(
      (o) => o.status === ORDER_STATUS.PENDING || o.status === ORDER_STATUS.RECEIVED,
    ).length,
    preparing: orders.filter((o) => o.status === ORDER_STATUS.PREPARING).length,
    done: orders.filter((o) => o.status === ORDER_STATUS.DONE).length,
  }
}

export function getStockStatus(quantity) {
  if (quantity === 0) return { label: '품절', level: 'out' }
  if (quantity < 5) return { label: '주의', level: 'warning' }
  return { label: '정상', level: 'ok' }
}
