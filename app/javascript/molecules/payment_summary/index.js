import React, { useMemo } from 'react'
import PropTypes from 'lib/proptypes'
import sortBy from 'lodash/sortBy'
import Icon from 'atoms/icon'
import Price from 'atoms/price'
import Payment from './payment'

import './index.scss'

const PaymentSummary = ({ workshopCount, prices, payments, includePending, onEditPayment }) => {
  const perWorkshop = prices[1]

  const value = workshopCount * perWorkshop

  const subTotal = prices[workshopCount]

  const discount = subTotal - value

  const paymentStates = useMemo(() => (
    new Set (includePending ? ['pending', 'approved'] : ['approved'])
  ), [includePending])

  const includedPayments = useMemo(() => (
    sortBy(payments, [p => p.createdAt]).filter(p => paymentStates.has(p.state))
  ), [payments, paymentStates])

  const totalToPay = useMemo(() => (
    Math.max(0, includedPayments.reduce((total, p) => total - p.amount, subTotal))
  ), [includedPayments, subTotal])

  return (
    <table className="payment-summary">
      <tbody>
        <tr className="line-item payment-summary__line-item">
          <td className="payment-summary__icon">
            <Icon name="workshop" />
          </td>
          <td className="line-item__description">
            Workshops
            </td>
          <td className="line-item__quantity">
            {workshopCount}
            {' @ '}
            <Price value={perWorkshop} currency={null} />
          </td>
          <td className="line-item__cost">
            <Price value={value} />
          </td>
        </tr>
        <tr className="line-item payment-summary__line-item">
          <td className="payment-summary__icon">
            <Icon name="heart" />
          </td>
          <td className="line-item__description" colSpan="2">
            Discount
            </td>
          <td className="line-item__cost">
            <Price value={discount} />
          </td>
        </tr>
        <tr className="subtotal payment-summary__subtotal">
          <td></td>
          <th className="subtotal__description" colSpan="2">
            Subtotal
            </th>
          <td className="subtotal__cost">
            <Price value={subTotal} />
          </td>
        </tr>
        {includedPayments.map(payment => (
          <Payment key={payment.id} payment={payment} onEdit={onEditPayment} />
        ))}
      </tbody>
      <tfoot>
        <tr className="total">
          <td></td>
          <th className="total__description" colSpan="2">
            Total to pay
            </th>
          <td className="total__cost">
            <Price value={totalToPay} />
          </td>
        </tr>
      </tfoot>
    </table>
  )
}

PaymentSummary.propTypes = {
  payments: PropTypes.arrayOf(PropTypes.payment.isRequired).isRequired,
  workshopCount: PropTypes.number.isRequired,
  prices: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  includePending: PropTypes.bool,
  onEditPayment: PropTypes.func,
}

PaymentSummary.defaultProps = {
  includePending: false,
  onEditPayment: null,
}

export default PaymentSummary