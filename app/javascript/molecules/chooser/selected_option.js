import React, { useCallback } from 'react'
import PropTypes from 'lib/proptypes'
import Button from 'atoms/button'

const SelectedOption = ({ option, onRemove }) => {
  const removeClicked = useCallback(() => onRemove(option), [onRemove, option])

  return (
    <span
      className="selected-option chooser__selected-option"
      tabIndex={0}
      aria-label={option.label}
      data-id={option.id}
    >
      <span className="selected-option__label">
        {option.label}
      </span>
      <Button
        className="selected-option__remove"
        icon="close"
        aria-label={`Remove ${option.label}`}
        onClick={removeClicked}
      />
    </span>
  )
}

SelectedOption.propTypes = {
  option: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
  }),
  onRemove: PropTypes.func.isRequired,
}

export default SelectedOption
