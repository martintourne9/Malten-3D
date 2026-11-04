const formatter = new Intl.NumberFormat('es-UY', { style: 'currency', currency: 'UYU', maximumFractionDigits: 0 })

export const formatPrice = amount => formatter.format(amount)
export const productPrice = product => `${product.custom ? 'Desde ' : ''}${formatPrice(product.priceUyu)}`
