/* global stripe */

import React, { useEffect, useState } from 'react'
import PropTypes from 'lib/proptypes'
import { useRegistration } from 'contexts/registration'
import RegistrationForm from 'templates/registrations/form'

const Form = ({ festival, page, onPageChange }) => {
  const { loading, saving, registration } = useRegistration()
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    if (!loading && !saving && !redirecting) {
      const pendingCreditCardPayment = registration.payments.find(payment => (
        payment.state === 'pending' &&
        payment.type === 'credit_card' &&
        payment.reference
      ))

      if (pendingCreditCardPayment) {
        setRedirecting(true)
        stripe.redirectToCheckout({ sessionId: pendingCreditCardPayment.reference })
      }
    }
  }, [loading, saving, redirecting, registration, setRedirecting])

  return (
    <RegistrationForm
      festival={festival}
      page={page}
      redirecting={redirecting}
      onPageChange={onPageChange}
    />
  )
}

Form.propTypes = {
  festival: PropTypes.festival.isRequired,
  page: PropTypes.shape({}).isRequired,
  onPageChange: PropTypes.func.isRequired,
}

export default Form
