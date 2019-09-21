import React, { useCallback } from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import kebabCase from 'lodash/kebabCase'
import humanize from 'lib/humanize'
import Date from 'atoms/date'
import Icon from 'atoms/icon'
import Price from 'atoms/price'
import List from 'molecules/list'
import Ripple from 'effects/ripple'

const STATE_ICONS = {
  pending: 'clock',
  approved: 'check',
  cancelled: 'close',
  declined: 'subtract',
}

const Payment = ({ payment, onClick }) => {
  const clicked = useCallback(() => onClick(payment), [onClick, payment])

  return (
    <List.Item
      className={classNames('payment', `payment--${payment.type}`, `payment--${payment.state}`)}
      icon={kebabCase(payment.type)}
      onClick={clicked}
    >
      <Icon className="payment__state" name={STATE_ICONS[payment.state]} viewBox="-4 -4 32 32" />
      <div className="payment__details">
        <div className="list-item__primary">{payment.registration.user.name}</div>
        <div className="list-item__secondary">
          <Date date={payment.createdAt} format="D MMMM" />
          {' • '}
          {payment.description || humanize(payment.type)}
        </div>
      </div>
      <Price className="payment__amount" value={payment.amount} currency={null} />
      <Ripple />
    </List.Item>
  )
}

Payment.propTypes = {
  payment: PropTypes.payment.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Payment
