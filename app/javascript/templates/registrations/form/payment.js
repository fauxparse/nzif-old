import React, { useCallback, useMemo } from 'react'
import { useToggle } from 'lib/hooks'
import { useRegistration } from 'contexts/registration'
import Icon from 'atoms/icon'
import Price from 'atoms/price'
import Heading from './heading'

const Payment = () => {
  const { registration: { preferences }, prices } = useRegistration()

  const [moreInfo, toggleMoreInfo] = useToggle()

  const toggleClicked = useCallback((e) => {
    e.preventDefault()
    toggleMoreInfo()
  }, [toggleMoreInfo])

  const workshopCount = useMemo(() => (
    preferences.filter(({ position }) => position === 1).length
  ), [preferences])

  const value = workshopCount * prices[1]

  const total = prices[workshopCount]

  const discount = value - total

  return (
    <section className="registration-form__section registration-form__payment">
      <Heading>Payment</Heading>
      <p>
        The amount shown below is the total cost for the workshops you have selected.
      </p>
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
              <Price value={prices[1]} currency={null} />
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
              <Price value={-discount} />
            </td>
          </tr>
          <tr className="subtotal payment-summary__subtotal">
            <td></td>
            <th className="subtotal__description" colSpan="2">
              Subtotal
            </th>
            <td className="subtotal__cost">
              <Price value={value - discount} />
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr className="total">
            <td></td>
            <th className="total__description" colSpan="2">
              Total to pay
            </th>
            <td className="total__cost">
              <Price value={total} />
            </td>
          </tr>
        </tfoot>
      </table>
    </section>
  )
}

export default Payment
