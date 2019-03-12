import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CommonProps from '../../lib/common_props'
import MenuItem from './menu_item'

const Menu = forwardRef(({
  className,
  options,
  selectedIndex,
  selectedText,
  menuItemComponent: MenuItemComponent,
  menuRef,
  onClick,
  ...props
}, ref) => {
  return (
    <ul
      className={classNames('autocomplete__menu', className)}
      ref={ref}
      data-empty-text="(No matches)"
      {...props}
    >
      {options.map((option, i) => (
        <MenuItemComponent
          key={option.id}
          selected={selectedIndex === i}
          selectedText={selectedText}
          onClick={onClick}
          {...option}
        />
      ))}
    </ul>
  )
})

Menu.displayName = 'Menu'

Menu.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
  }).isRequired).isRequired,
  selectedIndex: PropTypes.number,
  selectedText: PropTypes.string.isRequired,
  menuItemComponent: CommonProps.component,
  menuRef: CommonProps.ref,
  onClick: PropTypes.func.isRequired,
}

Menu. defaultProps = {
  menuItemComponent: MenuItem,
  menuRef: undefined,
}

export default Menu
