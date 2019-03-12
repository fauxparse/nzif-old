import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Textarea from 'react-textarea-autosize'

const Name = ({ value, onChange, onBlur, onKeyDown, ...props }) => {
  const [current, setCurrent] = useState(value)

  useEffect(() => setCurrent(value), [setCurrent, value])

  const inputChanged = e => {
    setCurrent(e.target.value.replace(/[\r\n]/g, ''))
  }

  const inputBlurred = e => {
    onChange(e)
    onBlur && onBlur(e)
  }

  const inputKeyPressed = e => {
    if (e.which === 13) {
      e.target.blur()
    } else if (e.which === 27) {
      setCurrent(value)
    }

    onKeyDown && onKeyDown(e)
  }

  return (
    <Textarea
      className="form__input activity-details__name"
      {...props}
      value={current}
      onChange={inputChanged}
      onBlur={inputBlurred}
      onKeyDown={inputKeyPressed}
    />
  )
}

Name.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
}

export default Name
