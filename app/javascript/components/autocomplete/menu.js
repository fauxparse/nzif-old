import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import MenuItem from './menu_item'

export const StyledMenu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0.5em 0;
`

class Menu extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      value: PropTypes.any.isRequired,
    }).isRequired).isRequired,
    selectedIndex: PropTypes.number.isRequired,
    selectedText: PropTypes.string.isRequired,
    menuItemComponent: PropTypes.func,
  }

  static defaultProps = {
    menuItemComponent: MenuItem,
  }

  render() {
    const {
      options,
      selectedIndex,
      selectedText,
      menuItemComponent: MenuItemComponent,
    } = this.props

    return (
      <StyledMenu>
        {options.map((option, i) => (
          <MenuItemComponent
            key={option.id}
            selected={selectedIndex === i}
            selectedText={selectedText}
            {...option}
          />
        ))}
      </StyledMenu>
    )
  }
}

export default Menu
