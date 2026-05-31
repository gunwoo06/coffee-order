export default function AdminDashboard({ stats }) {
  return (
    <section className="admin-section admin-dashboard" aria-label="관리자 대시보드">
      <h2 className="admin-section__title">관리자 대시보드</h2>
      <p className="admin-dashboard__stats" aria-live="polite">
        <span>총 주문 {stats.total}</span>
        <span className="admin-dashboard__sep">/</span>
        <span>주문 접수 {stats.received}</span>
        <span className="admin-dashboard__sep">/</span>
        <span>제조 중 {stats.preparing}</span>
        <span className="admin-dashboard__sep">/</span>
        <span>제조 완료 {stats.done}</span>
      </p>
    </section>
  )
}
