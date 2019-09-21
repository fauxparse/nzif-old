import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import PropTypes from 'lib/proptypes'
import { useToggle } from 'lib/hooks'
import TextMask from 'react-text-mask'
import { createNumberMask } from 'text-mask-addons'
import humanize from 'lib/humanize'
import Button from 'atoms/button'
import Date from 'atoms/date'
import Label from 'atoms/label'
import TextField from 'atoms/text_field'
import Modal from 'molecules/modal'
import Field from 'molecules/field'
import LabelledField from 'molecules/labelled_field'

const PaymentDetails = ({ payment, onUpdatePayment, onAddPayment, onClose }) => {
  const [open, , show, hide] = useToggle()

  const [attributes, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'reset':
        return action.payment
      case 'change':
        return { ...state, [action.name]: action.value }
      default:
        return state
    }
  }, payment)

  const changed = useCallback((e) => {
    const { name, value } = e.target
    dispatch({ type: 'change', name, value })
  }, [dispatch])

  const save = useCallback((state) => {
    (payment.id ? onUpdatePayment : onAddPayment)({ ...attributes, state })
    hide()
    onClose()
  }, [payment, attributes, onAddPayment, onUpdatePayment, hide, onClose])

  const setPending = useCallback(() => save('pending'), [save])

  const setCancelled = useCallback(() => save('cancelled'), [save])

  const setApproved = useCallback(() => save('approved'), [save])

  const cancel = useCallback(() => {
    hide()
    dispatch({ type: 'reset', payment })
    onClose()
  }, [hide, dispatch, payment, onClose])

  const [amount, setAmount] = useState()

  const amountChanged = useCallback((e) => {
    setAmount(e.target.value)
    dispatch({ 
      type: 'change',
      name: 'amount',
      value: parseFloat(e.target.value.replace(/[\$,]/g, '') * 100)
    })
  }, [setAmount])

  const textMask = useMemo(() => createNumberMask({ allowDecimal: true }))

  const keyPressed = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      save()
    }
  }, [save])

  useEffect(() => {
    if (payment) {
      dispatch({ type: 'reset', payment })
      setAmount((payment.amount / 100.0).toString())
      show()
    }
  }, [dispatch, payment, show])

  return attributes ? (
    <Modal
      isOpen={open}
      onRequestClose={hide}
    >
      <header className="modal__header">
        <h2 className="modal__title">{attributes.registration && attributes.registration.user.name}</h2>
        <Button className="modal__close" icon="close" onClick={cancel} />
      </header>
      <div className="modal__body">
        <p>
          {humanize(attributes.type)}<br/>
          <Date date={attributes.createdAt} />
        </p>
        <Field>
          <Label htmlFor="payment_amount">Amount</Label>
          <TextField
            id="payment_amount"
            as={TextMask}
            mask={textMask}
            value={amount}
            onChange={amountChanged}
            onKeyPress={keyPressed}
          />
        </Field>
      </div>
      <footer className="modal__footer">
        <Button
          primary={attributes.state === 'pending'}
          text="Pending"
          onClick={setPending}
        />
        <Button
          primary={attributes.state === 'cancelled'}
          text="Cancelled"
          onClick={setCancelled}
        />
        <Button
          primary={attributes.state === 'approved'}
          text="Approved"
          onClick={setApproved}
        />
      </footer>
    </Modal>
  ) : null
}

PaymentDetails.propTypes = {
  payment: PropTypes.payment,
  onAddPayment: PropTypes.func.isRequired,
  onUpdatePayment: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default PaymentDetails