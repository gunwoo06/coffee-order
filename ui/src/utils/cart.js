export function getCartLineKey(menuItemId, selectedOptionIds) {
  const sorted = [...selectedOptionIds].sort().join(',')
  return `${menuItemId}:${sorted}`
}

export function calcUnitPrice(basePrice, selectedOptions) {
  return basePrice + selectedOptions.reduce((sum, opt) => sum + opt.price, 0)
}

export function formatOptionLabel(selectedOptions) {
  if (selectedOptions.length === 0) return ''
  return ` (${selectedOptions.map((o) => o.name).join(', ')})`
}

export function formatCartLineLabel(name, selectedOptions, quantity) {
  const optionPart = formatOptionLabel(selectedOptions)
  return `${name}${optionPart} X ${quantity}`
}

export function formatCartLineName(name, selectedOptions) {
  return `${name}${formatOptionLabel(selectedOptions)}`
}

function recalcLine(line, quantity) {
  return {
    ...line,
    quantity,
    lineTotal: line.unitPrice * quantity,
  }
}

export function updateCartQuantity(cart, key, delta) {
  return cart
    .map((line) => {
      if (line.key !== key) return line
      const quantity = line.quantity + delta
      if (quantity <= 0) return null
      return recalcLine(line, quantity)
    })
    .filter(Boolean)
}

export function removeCartLine(cart, key) {
  return cart.filter((line) => line.key !== key)
}

export function addToCart(cart, menu, selectedOptions) {
  const optionIds = selectedOptions.map((o) => o.id)
  const key = getCartLineKey(menu.id, optionIds)
  const unitPrice = calcUnitPrice(menu.basePrice, selectedOptions)
  const existing = cart.find((line) => line.key === key)

  if (existing) {
    return cart.map((line) =>
      line.key === key
        ? {
            ...line,
            quantity: line.quantity + 1,
            lineTotal: unitPrice * (line.quantity + 1),
          }
        : line,
    )
  }

  return [
    ...cart,
    {
      key,
      menuItemId: menu.id,
      name: menu.name,
      image: menu.image || '',
      selectedOptions,
      unitPrice,
      quantity: 1,
      lineTotal: unitPrice,
    },
  ]
}

export function getCartTotal(cart) {
  return cart.reduce((sum, line) => sum + line.lineTotal, 0)
}
