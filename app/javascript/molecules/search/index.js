import React, { useCallback, useRef } from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import Button from 'atoms/button'
import Icon from 'atoms/icon'
import TextField from 'atoms/text_field'

import './index.scss'

const Search = ({ className, placeholder, value, onChange, ...props }) => {
  const field = useRef()

  const changed = useCallback(({ target }) => onChange(target.value), [onChange])

  const clear = useCallback(() => {
    onChange('')
    field.current.focus()
  }, [onChange, field])

  return (
    <label className={classNames('search', className)}>
      <TextField
        ref={field}
        className={classNames('search__text', value && 'search__text--filled')}
        value={value}
        placeholder={placeholder}
        onChange={changed}
        {...props}
      />
      <Icon name="search" className="search__icon" />
      <Button className="search__clear" icon="close" aria-label="Clear search" onClick={clear} />
    </label>
  )
}

Search.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

Search.defaultProps = {
  value: '',
  placeholder: 'Search…',
}

export default Search
