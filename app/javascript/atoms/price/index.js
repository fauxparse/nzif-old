import React, { useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import number from 'lib/number'
import classNames from 'classnames'

import './index.scss'

const Price = ({ className, value, cents, currency, as: Component, ...props }) => {
  const formatted = useMemo(() => number(value / 100, `$0,0${cents ? '.00' : ''}`), [value, cents])

  return (
    <Component className={classNames('price', className)} {...props}>
      {formatted}
      {currency && <abbr className="price__currency" title="New Zealand Dollars">{currency}</abbr>}
    </Component>
  )
}

Price.propTypes = {
  as: PropTypes.component,
  value: PropTypes.number.isRequired,
  cents: PropTypes.bool,
  currency: PropTypes.string,
}

Price.defaultProps = {
  as: 'span',
  cents: false,
  currency: 'NZD',
}

export default Price
