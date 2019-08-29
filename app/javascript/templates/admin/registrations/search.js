import React, { useCallback, useRef } from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import Button from 'atoms/button'
import Icon from 'atoms/icon'
import TextField from 'atoms/text_field'

const Search = ({ className, value, onChange, ...props }) => {
  const field = useRef()

  const changed = useCallback(({ target }) => onChange(target.value), [onChange])

  const reset = useCallback(() => {
    onChange('')
    field.current.focus()
  }, [onChange, field])

  return (
    <label className={classNames('search', className)}>
      <TextField
        ref={field}
        className={classNames('search__text', value && 'text-field--filled')}
        value={value}
        onChange={changed}
        {...props}
      />
      <Icon name="search" />
      <Button icon="close" aria-label="Reset search" onClick={reset} />
    </label>
  )
}

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

Search.defaultProps = {
  value: '',
}

export default Search
