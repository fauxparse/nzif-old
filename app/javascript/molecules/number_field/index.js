import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { useToggle } from 'lib/hooks'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import { useFocusWithin } from 'lib/hooks'
import RepeatingButton from 'molecules/repeating_button'

import './index.scss'

const NumberField = forwardRef(({
  className,
  value: valueProp,
  min,
  max,
  onChange,
  ...props
}, ref) => {
  const ownRef = useRef()

  const container = useRef()

  const input = ref || ownRef

  const [value, setValue] = useState(valueProp)

  useEffect(() => setValue(valueProp), [setValue, valueProp])

  const focused = useFocusWithin(container)

  const changed = useCallback((e) => {
    const value = parseInt(e.target.value, 10)
    setValue(Number.isNaN(value) ? e.target.value : value)
  }, [setValue])

  const clamp = useCallback((number) => {
    if (min === undefined) {
      return max === undefined ? number : Math.min(number, max)
    } else if (max === undefined) {
      return Math.max(number, min)
    } else {
      return Math.max(min, Math.min(max, number))
    }
  }, [min, max])

  const setClampedValue = useCallback((v) => setValue(clamp(v)), [setValue, clamp])

  const increment = useCallback(() => setClampedValue(value + 1), [value, setClampedValue])

  const decrement = useCallback(() => setClampedValue(value - 1), [value, setClampedValue])

  const persistChange = useCallback(() => {
    const newValue = clamp(value)
    if (newValue !== valueProp) onChange(newValue)
  }, [onChange, value, valueProp, clamp])

  const [buttonDown, , buttonPressed, buttonReleased] = useToggle(false)

  useEffect(() => {
    if (buttonDown) {
      window.addEventListener('mouseup', buttonReleased)
      window.addEventListener('touchend', buttonReleased)
      return () => {
        window.removeEventListener('mouseup', buttonReleased)
        window.removeEventListener('touchend', buttonReleased)
      }
    } else {
      if (document.activeElement !== input.current) persistChange()
    }
  }, [buttonDown, persistChange, buttonReleased, input])

  return (
    <div
      ref={container}
      className={classNames(
        'number-field',
        focused && 'number-field--focus',
        className,
      )}
    >
      <input
        ref={input}
        className="text-field number-field__input"
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={changed}
        onBlur={persistChange}
        {...props}
      />
      <RepeatingButton
        icon="subtract"
        className="number-field__button number-field__button--subtract"
        aria-label="Subtract"
        onClick={decrement}
        onMouseDown={buttonPressed}
        onTouchStart={buttonPressed}
      />
      <RepeatingButton
        icon="add"
        className="number-field__button number-field__button--add"
        aria-label="Add"
        onClick={increment}
        onMouseDown={buttonPressed}
        onTouchStart={buttonPressed}
      />
    </div>
  )
})

NumberField.displayName = 'NumberField'

NumberField.propTypes = {
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func,
}

NumberField.defaultProps = {
  value: undefined,
  min: undefined,
  max: undefined,
  onChange: undefined,
}

export default NumberField
