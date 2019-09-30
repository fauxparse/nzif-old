import React, { forwardRef, useCallback, useEffect, useRef } from 'react'
import PropTypes from 'lib/proptypes'
import { useResize } from 'lib/hooks'
import classNames from 'classnames'

import './index.scss'

const resize = (input, multiline = false) => {
  const value = input.value
  input.value = input.value || input.placeholder

  input.style.width = '10000px'
  const offset = input.offsetWidth

  if (offset) {
    if (multiline) {
      input.style.removeProperty('width')
    } else {
      input.style.whiteSpace = 'pre'
      input.style.width = '0'

      let width = Math.max(input.offsetWidth, input.scrollWidth - input.clientWidth)
      input.style.width = `${width}px`

      for (let i = 0; i < 10; i += 1) {
        input.scrollLeft = 1e10

        if (!input.scrollLeft) break

        width += input.scrollLeft
        input.style.width = `${width}px`
      }

      input.style.whiteSpace = 'pre-line'
    }

    if (multiline) {
      input.style.height = '0'
      input.style.height = `${input.scrollHeight}px`
    }
  }

  input.value = value
}

const TextField = forwardRef(({
  as: component,
  value,
  autoSize,
  autoSelect,
  className,
  multiline,
  onChange,
  ...props
}, ref) => {
  const Component = component || (multiline ? 'textarea' : 'input')

  const ownRef = useRef()

  const input = ref || ownRef

  const resizeInput = useCallback(() => {
    if (autoSize) {
      resize(input.current, multiline)
    }
  }, [input, multiline, autoSize])

  useResize(resizeInput)

  useEffect(resizeInput, [value])

  useEffect(() => {
    if (autoSelect) {
      const select = e => e.target.select()
      const field = input.current
      field.addEventListener('focus', select)
      return () => field.removeEventListener('focus', select)
    }
  }, [input, autoSelect])

  const changed = (e) => {
    resizeInput()
    onChange(e)
  }

  return (
    <Component
      className={classNames(
        'text-field',
        multiline && 'text-field--multiline',
        autoSize && 'text-field--autosize',
        className
      )}
      value={value || ''}
      ref={input}
      onChange={changed}
      {...props}
    />
  )
})

TextField.displayName = 'TextField'

TextField.propTypes = {
  as: PropTypes.component,
  autoSize: PropTypes.bool,
  autoSelect: PropTypes.bool,
  className: PropTypes.className,
  multiline: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

TextField.defaultProps = {
  as: null,
  autoSize: false,
  autoSelect: false,
  className: null,
  multiline: false,
  value: '',
}

export default TextField
