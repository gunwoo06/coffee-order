import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const { pathname } = useLocation()
  const isOrder = pathname === '/'
  const isAdmin = pathname === '/admin'

  return (
    <header className="header">
      <Link to="/" className="header__brand">
        COZY
      </Link>
      <nav className="header__nav">
        <Link
          to="/"
          className={`header__nav-btn ${isOrder ? 'header__nav-btn--active' : ''}`}
        >
          주문하기
        </Link>
        <Link
          to="/admin"
          className={`header__nav-link ${isAdmin ? 'header__nav-link--active' : ''}`}
        >
          관리자
        </Link>
      </nav>
    </header>
  )
}
