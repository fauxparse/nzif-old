import React, { useCallback } from 'react'
import PropTypes from 'lib/proptypes'
import Checkbox from 'atoms/checkbox'
import Divider from 'atoms/divider'

const PaymentMethodSelector = ({ paymentMethod, onChange }) => {
  const paymentMethodChanged = useCallback((e) => onChange(e.target.value), [onChange])

  return (
    <div className="payment-method-selector">
      <Divider accent />
      <h3 className="payment-method-selector__heading">Payment method</h3>
      <p>Please select your payment method below:</p>

      <div className="payment-methods">
        <Checkbox
          className="payment-method"
          checked={paymentMethod === 'credit_card'}
          value="credit_card"
          onChange={paymentMethodChanged}
        >
          <span className="payment-method__name">Credit card</span>
          <span className="payment-method__description">
            When you click <b>Finish</b>, you’ll be taken to
            a secure page to enter your payment details.
          </span>
        </Checkbox>
        <Checkbox
          className="payment-method"
          checked={paymentMethod === 'internet_banking'}
          value="internet_banking"
          onChange={paymentMethodChanged}
        >
          <span className="payment-method__name">Internet banking</span>
          <span className="payment-method__description">
            We’ll send you instructions for paying your
            registration fees via direct transfer from your bank.
          </span>
        </Checkbox>
      </div>
    </div>
  )
}

PaymentMethodSelector.propTypes = {
  paymentMethod: PropTypes.oneOf(['credit_card', 'internet_banking']),
  onChange: PropTypes.func.isRequired,
}

PaymentMethodSelector.defaultProps = {
  paymentMethod: undefined,
}

export default PaymentMethodSelector