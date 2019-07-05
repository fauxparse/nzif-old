import React from 'react'
import PropTypes from 'lib/proptypes'
import classNames from 'classnames'
import Button from 'atoms/button'
import Icon from 'atoms/icon'
import './index.scss'

const Hamburger = ({ as: Component, className, open, ...props }) => (
  <Component
    className={classNames(
      'hamburger',
      open && 'hamburger--open',
      className
    )}
    {...props}
  >
    <Icon viewBox="-12 -12 24 24">
      <g><line x1="-9" y1="0" x2="9" y2="0" /></g>
      <g><line x1="-9" y1="0" x2="9" y2="0" /></g>
      <g><line x1="-9" y1="0" x2="9" y2="0" /></g>
    </Icon>
  </Component>
)

Hamburger.propTypes = {
  as: PropTypes.component.isRequired,
  open: PropTypes.bool.isRequired,
}

Hamburger.defaultProps = {
  as: Button,
  open: false,
}

export default Hamburger
