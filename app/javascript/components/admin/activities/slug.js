import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AutosizeInput from 'react-input-autosize'
import { IconField } from '../../form'

const Slug = ({ root, value, loading, onChange, onBlur, onKeyDown, ...props }) => {
  const [current, setCurrent] = useState(value)

  useEffect(() => setCurrent(value), [setCurrent, value])

  const inputChanged = e => setCurrent(e.target.value)

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
    <IconField icon="link" label="URL" loading={loading}>
      <div className="slug">
        <span className="slug__root">{root}</span>
        <AutosizeInput
          className="slug__input"
          {...props}
          value={current}
          onChange={inputChanged}
          onBlur={inputBlurred}
          onKeyDown={inputKeyPressed}
        />
      </div>
    </IconField>
  )
}

Slug.propTypes = {
  root: PropTypes.string,
  value: PropTypes.string,
  loading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
}

export default Slug
