import padStart from 'lodash/padStart'

export default (value, format = '0') => {
  const abs = Math.abs(value)
  const [pre, post] = format.split('.')
  const [, prefix, plus, wholePlaces] = pre.match(/^([^\d]*)(\+)?([\d,]*)$/)
  const [, decimalPlaces, suffix] = (post || '').match(/^(\d*)(.*)/)

  let whole = Math.floor(abs).toString()
  if (wholePlaces.indexOf(',')) whole = whole.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  const sign = value < 0 ? '-' : (plus ? '+' : '')
  const magnitude = 10 ** decimalPlaces.length
  const fraction = decimalPlaces.length ? (
    '.' + padStart(Math.round((abs * magnitude) % magnitude).toString(), decimalPlaces.length, '0')
  ) : ''

  return `${sign}${prefix}${whole}${fraction}${suffix}`
}
