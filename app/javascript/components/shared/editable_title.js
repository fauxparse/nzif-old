import React, { useCallback, useState, useEffect } from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import Textarea from 'react-textarea-autosize'

const EditableTitle = ({ className, value, live, onChange, onBlur, onKeyDown, ...props }) => {
  const [current, setCurrent] = useState(value)

  useEffect(() => setCurrent(value), [setCurrent, value])

  const inputChanged = useCallback((e) => {
    const value = e.target.value.replace(/[\r\n]/g, '')
    setCurrent(value)
    if (live) { onChange(e) }
  }, [setCurrent, live, onChange])

  const inputBlurred = useCallback((e) => {
    onChange(e)
    onBlur && onBlur(e)
  }, [onChange, onBlur])

  const inputKeyPressed = useCallback((e) => {
    if (e.which === 13) {
      e.target.blur()
    } else if (e.which === 27) {
      setCurrent(value)
    }

    onKeyDown && onKeyDown(e)
  }, [value, setCurrent, onKeyDown])

  return (
    <Textarea
      className={classNames('form__input', 'editable-title', className)}
      value={current}
      onChange={inputChanged}
      onBlur={inputBlurred}
      onKeyDown={inputKeyPressed}
      {...props}
    />
  )
}

EditableTitle.propTypes = {
  className: PropTypes.className,
  live: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
}

EditableTitle.defaultProps = {
  live: false,
}

export default EditableTitle
