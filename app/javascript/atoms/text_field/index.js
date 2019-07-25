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
  autosize,
  className,
  multiline,
  onChange,
  ...props
}, ref) => {
  const Component = component || (multiline ? 'textarea' : 'input')

  const ownRef = useRef()

  const input = ref || ownRef

  const resizeInput = useCallback(() => {
    if (autosize) {
      resize(input.current, multiline)
    }
  }, [input, multiline, autosize])

  useResize(resizeInput)

  useEffect(resizeInput, [])

  const changed = (e) => {
    resizeInput()
    onChange(e)
  }

  return (
    <Component
      className={classNames(
        'text-field',
        multiline && 'text-field--multiline',
        autosize && 'text-field--autosize',
        className
      )}
      ref={input}
      onChange={changed}
      {...props}
    />
  )
})

TextField.displayName = 'TextField'

TextField.propTypes = {
  as: PropTypes.component,
  autosize: PropTypes.bool,
  className: PropTypes.className,
  multiline: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

TextField.defaultProps = {
  as: null,
  autosize: false,
  className: null,
  multiline: false,
}

export default TextField
