import React, { useCallback, useEffect, useMemo } from 'react'
import { useToggle } from 'lib/hooks'
import { useRegistration } from 'contexts/registration'
import sortBy from 'lodash/sortBy'
import Divider from 'atoms/divider'
import Icon from 'atoms/icon'
import TextLink from 'atoms/text_link'
import PaymentSummary from 'molecules/payment_summary'
import Heading from './heading'
import PaymentMethodSelector from './payment_method_selector'

const Payment = () => {
  const {
    registration: { 
      preferences,
      workshops,
      paymentMethod,
      payments,
    },
    earlybird,
    prices,
    change
  } = useRegistration()

  const [moreInfo, toggleMoreInfo] = useToggle()

  const toggleClicked = useCallback((e) => {
    e.preventDefault()
    toggleMoreInfo()
  }, [toggleMoreInfo])

  const workshopCount = useMemo(() => (
    earlybird
      ? preferences.filter(({ position }) => position === 1).length
      : workshops.length
  ), [earlybird, workshops, preferences])

  const total = prices[workshopCount]

  const approvedPayments = useMemo(() => (
    sortBy(payments.filter(p => p.state === 'approved'), [p => p.createdAt])
  ), [payments])

  const paid = useMemo(() => (
    approvedPayments.reduce((total, payment) => total + payment.amount, 0)
  ), [approvedPayments])

  const totalToPay = earlybird ? 0 : Math.max(0, total - paid)

  const setPaymentMethod = useCallback((paymentMethod) => {
    change({ paymentMethod })
  }, [change])

  useEffect(() => {
    change({ state: 'complete' })
  }, [change])

  return (
    <section className="registration-form__section registration-form__payment">
      <Heading>Payment</Heading>
      <p>
        The amount shown below is the total cost for the workshops you have selected.
      </p>
      {earlybird && (
        <div className="note">
          <Icon name="alert" />
          <p><strong>This amount is not due yet! </strong></p>
          {moreInfo ? (
            <>
              <p>
                Once earlybird registrations have closed and we are able to confirm
                workshop allocations, you will be able to make any final selections
                and pay the amount due by credit card or internet banking.{' '}
              </p>
              <a className="text-link" href="#" onClick={toggleClicked}>Okay, got it!</a>
            </>
          ) : (
            <a className="text-link" href="#" onClick={toggleClicked}>More info</a>
          )}
        </div>
      )}
      <PaymentSummary
        payments={payments}
        workshopCount={workshopCount}
        prices={prices}
      />

      {totalToPay > 0 && (
        <PaymentMethodSelector paymentMethod={paymentMethod} onChange={setPaymentMethod} />
      )}

      {(earlybird || !totalToPay) && (
        <p>
          You have nothing to pay right now.
          Click <b>Finish</b> to confirm your registration.
        </p>
      )}

      {earlybird && (
        <div className="registration-form__financial-assistance">
          <Divider accent />
          <h3>Financial assistance</h3>
          <p>
            NZIF 2019 has a financial assistance programme. We have several areas in which we offer
            support (workshop packages, travel grants, and childcare grants) and we invite
            applications from any New Zealand based improvisors who would otherwise not be able to
            attend.  We especially encourage applications from improvisors often underrepresented at
            NZIF, including Māori and Pasifika, LGBTQI*, and people with disabilities.
          </p>
          <p>
            Applications close on 20 September with decisions made by 23 September,
            so you have time before we lock in your selections to decide what you want to commit to.
          </p>
          <p>
            <TextLink external to="https://forms.gle/z2PD7gvRxVUBRJFWA">
              Read more about what we can offer and apply here
            </TextLink>
          </p>
          <p>
            We’re also happy for you to pay in installments. To arrange this, please email
            {' '}
            <TextLink external to="mailto:jen@improvfest.nz">
              jen@improvfest.nz
            </TextLink>
            .
          </p>
        </div>
      )}
    </section>
  )
}

export default Payment
