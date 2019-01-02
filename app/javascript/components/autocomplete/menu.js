import React, { Component, forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CommonProps from '../../lib/proptypes'
import MenuItem from './menu_item'

export const StyledMenu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 20em;
  overflow-y: auto;
`

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
      options,
      selectedIndex,
      selectedText,
      menuItemComponent: MenuItemComponent,
      menuRef,
      onClick,
    } = this.props

    return (
      <StyledMenu ref={menuRef}>
        {options.map((option, i) => (
          <MenuItemComponent
            key={JSON.stringify(option.value)}
            selected={selectedIndex === i}
            selectedText={selectedText}
            onClick={onClick}
            {...option}
          />
        ))}
      </StyledMenu>
    )
  }
}

export default forwardRef((props, ref) => <Menu menuRef={ref} {...props} />)
