import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'lib/proptypes'
import { useToggle } from 'lib/hooks'
import Button from 'atoms/button'
import Price from 'atoms/price'
import TextField from 'atoms/text_field'

const PriceRow = ({ price, onChange, onDelete }) => {
  const [editing, , startEditing, stopEditing] = useToggle(false)

  const deleteClicked = useCallback(() => onDelete(price), [onDelete, price])

  const [amount, setAmount] = useState(() => price.amount)

  const amountChanged = useCallback(e => setAmount(Math.floor(parseFloat(e.target.value || '0') * 100)), [setAmount]);

  const saveChanges = useCallback(() => {
    stopEditing()
    onChange({ ...price, amount })
  }, [stopEditing, onChange, price, amount])

  useEffect(() => {
    setAmount(price.amount)
  }, [price, setAmount])

  return (
    <tr>
      <th>
        {price.quantity}
        {' '}
        {price.quantity > 1 ? 'workshops' : 'workshop'}
      </th>
      <td onClick={startEditing}>
        {editing ? (
          <TextField type="number" min={0} autoFocus value={(amount / 100).toString()} onChange={amountChanged} onBlur={saveChanges} />
        ) : (
          <Price value={price.amount} currency={null} />
        )}
      </td>
      <td>
        <Button toolbar icon="trash" onClick={deleteClicked} />
      </td>
    </tr>
  )
}

PriceRow.propTypes = {
  price: PropTypes.price.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default PriceRow