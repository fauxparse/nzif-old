import React, { Component, forwardRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CommonProps from '../../lib/proptypes'
import MenuItem from './menu_item'

class Menu extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    }).isRequired).isRequired,
    selectedIndex: PropTypes.number.isRequired,
    selectedText: PropTypes.string.isRequired,
    menuItemComponent: PropTypes.func,
    menuRef: CommonProps.ref,
    onClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    menuItemComponent: MenuItem,
    menuRef: undefined,
  }

  render() {
    const {
      className,
      options,
      selectedIndex,
      selectedText,
      menuItemComponent: MenuItemComponent,
      menuRef,
      onClick,
    } = this.props

    return (
      <ul
        className={classNames('autocomplete__menu', className)}
        ref={menuRef}
        data-empty-text="(No matches)"
      >
        {options.map((option, i) => (
          <MenuItemComponent
            key={JSON.stringify(option.value)}
            selected={selectedIndex === i}
            selectedText={selectedText}
            onClick={onClick}
            {...option}
          />
        ))}
      </ul>
    )
  }
}

export default forwardRef((props, ref) => <Menu menuRef={ref} {...props} />)
