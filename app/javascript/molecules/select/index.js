import React, { useRef } from 'react'
import PropTypes from 'lib/proptypes'
import SelectProvider from './context'
import Container from './container'
import Trigger from './trigger'
import Menu from './menu'

import './index.scss'

const Select = ({
  options,
  value,
  placeholder,
  onChange,
  ...props
}) => {
  const trigger = useRef()

  const list = useRef()

  const menuShown = () => {
    list.current.style.minWidth = `${trigger.current.offsetWidth + 32}px`
  }

  return (
    <SelectProvider options={options} value={value} onChange={onChange}>
      <Container {...props}>
        <Trigger ref={trigger} placeholder={placeholder} />
        <Menu ref={list} onShow={menuShown} />
      </Container>
    </SelectProvider>
  )
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.id.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
    PropTypes.string.isRequired,
  ])).isRequired,
  value: PropTypes.id,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

Select.defaultProps = {
  value: undefined,
  placeholder: 'Choose…',
}

export default Select
