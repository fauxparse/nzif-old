import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'lib/proptypes'
import Button from 'atoms/button'
import PaymentSummary from 'molecules/payment_summary'
import PaymentDetails from '../payments/payment_details'

const Payments = ({ registration, earlybird, payments, onAdd, onChange }) => {
  const workshopCount = useMemo(() => (
    earlybird
      ? registration.preferences.filter(p => p.position === 1).length
      : registration.workshops.length
  ), [earlybird, registration])

  const [selected, setSelected] = useState()

  const editPayment = useCallback((payment) => {
    setSelected({
      ...payment,
      registration: {
        id: registration.id,
        user: {
          id: registration.user.id,
          name: registration.name,
        },
      },
    })
  }, [setSelected, registration])

  const closeEditor = useCallback(() => setSelected(null), [setSelected])

  const addPayment = useCallback(() => {
    editPayment({
      type: 'voucher',
      amount: 0,
    })
  }, [editPayment])

  return (
    <div className="registration-details__payments">
      <PaymentSummary
        workshopCount={workshopCount}
        payments={payments}
        prices={registration.prices}
        includePending
        onEditPayment={editPayment}
      />
      <Button
        primary
        icon="add"
        text="Add payment"
        onClick={addPayment}
      />
      <PaymentDetails
        payment={selected}
        onAddPayment={onAdd}
        onUpdatePayment={onChange}
        onClose={closeEditor}
      />
    </div>
  )
}

Payments.propTypes = {
  registration: PropTypes.registration.isRequired,
  payments: PropTypes.arrayOf(PropTypes.payment.isRequired),
  onAdd: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  earlybird: PropTypes.bool,
}

Payments.defaultProps = {
  payments: [],
  earlybird: false,
  onChange: null,
}

export default Payments
