import { useState } from 'react'
import { formatPrice } from '../utils/format'
import MenuImage from './MenuImage'

export default function ProductCard({ menu, onAdd }) {
  const [selectedIds, setSelectedIds] = useState(new Set())

  const toggleOption = (optionId) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(optionId)) {
        next.delete(optionId)
      } else {
        next.add(optionId)
      }
      return next
    })
  }

  const handleAdd = () => {
    const selectedOptions = menu.options.filter((opt) => selectedIds.has(opt.id))
    onAdd(menu, selectedOptions)
    setSelectedIds(new Set())
  }

  return (
    <article className="product-card">
      <div className="product-card__image">
        <MenuImage src={menu.image} alt={menu.name} className="product-card__img" />
      </div>
      <h2 className="product-card__name">{menu.name}</h2>
      <p className="product-card__price">{formatPrice(menu.basePrice)}</p>
      <p className="product-card__desc">{menu.description}</p>
      {menu.options.length > 0 && (
        <ul className="product-card__options">
          {menu.options.map((opt) => (
            <li key={opt.id}>
              <label className="product-card__option">
                <input
                  type="checkbox"
                  checked={selectedIds.has(opt.id)}
                  onChange={() => toggleOption(opt.id)}
                />
                <span>
                  {opt.name} ({opt.price > 0 ? `+${formatPrice(opt.price)}` : '+0원'})
                </span>
              </label>
            </li>
          ))}
        </ul>
      )}
      <button type="button" className="btn btn--primary product-card__add" onClick={handleAdd}>
        담기
      </button>
    </article>
  )
}
