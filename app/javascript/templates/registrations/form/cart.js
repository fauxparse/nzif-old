import React, { useContext, useMemo } from 'react'
import Icon from 'atoms/icon'
import Price from 'atoms/price'
import RegistrationContext from 'contexts/registration'

const Cart = () => {
  const { prices, registration: { preferences } } = useContext(RegistrationContext)

  const workshopCount = useMemo(() => (
    preferences.filter(({ position }) => position === 1).length
  ), [preferences])

  const value = useMemo(() => prices[1] * workshopCount, [prices, workshopCount])

  const total = useMemo(() => prices[workshopCount], [prices, workshopCount])

  return (
    <div className="cart registration-form__cart">
      <Icon name="cart" className="cart__icon" viewBox="-8 -8 40 40" />
      <div className="cart__workshop-count">
        {workshopCount} {workshopCount === 1 ? 'workshop' : 'workshops'}
      </div>
      <div className="cart__total">
        {total < value && <Price as="del" className="cart__value" value={value} />}
        <Price className="cart__cost" value={total} />
      </div>
    </div>
  )
}

export default Cart
