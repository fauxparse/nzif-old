import React, { useCallback } from 'react'
import PropTypes from 'lib/proptypes'
import kebabCase from 'lodash/kebabCase'
import humanize from 'lib/humanize'
import Button from 'atoms/button'
import Date from 'atoms/date'
import Icon from 'atoms/icon'
import Price from 'atoms/price'

const Payment = ({ payment, onEdit }) => {
  const editClicked = useCallback(() => onEdit(payment), [onEdit, payment])

  return (
    <tr className="line-item payment-summary__line-item">
      <td className="payment-summary__icon">
        <Icon name={kebabCase(payment.type)} />
      </td>
      <td className="line-item__description" colSpan={onEdit ? 1 : 2}>
        {humanize(payment.type)} payment
      <small className="line-item__date">
          <Date date={payment.createdAt} format="D MMMM" />
        </small>
      </td>
      {onEdit && (
        <td>
          <Button icon="edit" onClick={editClicked} />
        </td>
      )}
      <td className="line-item__cost">
        <Price value={payment.amount} />
      </td>
    </tr>
  )
}

Payment.propTypes = {
  payment: PropTypes.payment.isRequired,
  onEdit: PropTypes.func,
}

Payment.defaultProps = {
  onEdit: null,
}

export default Payment