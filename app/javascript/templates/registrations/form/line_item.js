import React from 'react'
import PropTypes from 'lib/proptypes'
import kebabCase from 'lodash/kebabCase'
import humanize from 'lib/humanize'
import Date from 'atoms/date'
import Icon from 'atoms/icon'
import Price from 'atoms/price'

const LineItem = ({ payment }) => (
  <tr className="line-item payment-summary__line-item">
    <td className="payment-summary__icon">
      <Icon name={kebabCase(payment.type)} />
    </td>
    <td className="line-item__description" colSpan={2}>
      {humanize(payment.type)} payment
      <small className="line-item__date">
        <Date date={payment.createdAt} format="D MMMM" />
      </small>
    </td>
    <td className="line-item__cost">
      <Price value={payment.amount} />
    </td>
  </tr>
)

LineItem.propTypes = {
  payment: PropTypes.payment.isRequired,
}

export default LineItem