import React, { useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'

const Price = ({ className, value, cents, currency, as: Component, ...props }) => {
  const output = useMemo(
    () => `${Math.floor(value / 100)}${cents ? (value % 100).toString().padStart(2, '0') : ''}`,
    [value, cents]
  )

  return (
    <Component className={classNames('price', className)} {...props}>
      ${output}
      {currency && <abbr title="New Zealand Dollars">{currency}</abbr>}
    </Component>
  )
}

Price.propTypes = {
  as: PropTypes.component,
  cents: PropTypes.bool,
  currency: PropTypes.string,
}

Price.defaultProps = {
  as: 'span',
  cents: false,
  currency: 'NZD',
}

export default Price
