import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Button from '../../../atoms/button'
import Icon from '../../../atoms/icon'

const MenuButton = forwardRef(({ className, open, ...props }, ref) => (
  <Button
    ref={ref}
    className={classNames('header__menu-button', className)}
    aria-expanded={open || undefined}
    {...props}
  >
    <Icon viewBox="-12 -12 24 24">
      <g>
        <line x1="-9" y1="0" x2="9" y2="0" />
      </g>
      <g>
        <line x1="-9" y1="0" x2="9" y2="0" />
      </g>
      <g>
        <line x1="-9" y1="0" x2="9" y2="0" />
      </g>
    </Icon>
  </Button>
))

MenuButton.displayName = 'MenuButton'

MenuButton.propTypes = {
  open: PropTypes.bool.isRequired
}

export default MenuButton
