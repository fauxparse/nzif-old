import React, { Component, Fragment, createRef } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import deburr from 'lodash/deburr'
import Input from './input'
import Menu from './menu'

export { Highlight } from './menu_item'

const KEYS = {
  UP: 38,
  DOWN: 40,
  ENTER: 13,
  TAB: 9,
}

const search = (value, options) => {
  if (value) {
    const expression = new RegExp(`^${deburr(value)}`, 'i')
    return options.filter(({ label }) => deburr(label).match(expression))
  } else {
    return []
  }
}

const Empty = styled.div`${({ theme }) => css`
  text-align: center;
  color: ${theme.colors.secondary};
  padding: 1rem;
`}`

class Autocomplete extends Component {
  static propTypes = {
    search: PropTypes.func,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired
      }).isRequired
    ).isRequired,
    menuItemComponent: PropTypes.func,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    search
  }

  state = {
    value: '',
    matches: []
  }

  menuRef = createRef()

  componentDidUpdate(_, prevState) {
    const menu = this.menuRef.current
    const { selectedIndex } = this.state

    if (menu && selectedIndex !== prevState.selectedIndex) {
      const item = menu.querySelectorAll('li')[selectedIndex]
      item && item.scrollIntoView({ block: 'nearest' })
    }
  }

  inputChanged = (e) => {
    const { target: { value } } = e
    const { search, options } = this.props
    const { selected } = this.state
    const matches = search(value, options)
    const selectedIndex = selected ? Math.max(matches.indexOf(selected), 0) : 0
    this.setState({
      value,
      matches,
      selectedIndex,
      selected: matches[selectedIndex]
    })
  }

  inputKeyDown = e => {
    const { target } = e
    const { selectionStart, selectionEnd } = target

    switch (e.which) {
      case KEYS.UP:
      case KEYS.DOWN:
        e.preventDefault()
        e.stopPropagation()
        this.move(e.which === KEYS.UP ? -1 : 1)
        break
      case KEYS.ENTER:
        e.preventDefault()
        e.stopPropagation()
        this.confirm()
        break
      case KEYS.TAB:
        if (selectionStart < selectionEnd) {
          e.preventDefault()
          e.stopPropagation()
          target.setSelectionRange(selectionEnd, selectionEnd)
          this.inputChanged(e)
        }
        break
      default:
        break
    }
  }

  move = (direction = 1) => {
    const { matches, selectedIndex: oldIndex } = this.state
    if (matches.length > 1) {
      const selectedIndex =
        (oldIndex + matches.length + direction) % matches.length
      this.setState({ selectedIndex, selected: matches[selectedIndex] })
    }
  }

  confirm = (item = undefined) => {
    const selectedItem = item || this.state.selected
    if (selectedItem) {
      this.props.onChange(selectedItem)
    }
  }

  clicked = (e) => {
    const target = e.target.closest('li')
    const index = Array.from(target.parentNode.children).indexOf(target)
    const selected = this.state.matches[index]
    this.confirm(selected)
  }

  render() {
    const { menuItemComponent, placeholder } = this.props
    const { value, matches, selected, selectedIndex } = this.state

    return (
      <Fragment>
        <Input
          autoFocus
          value={value}
          placeholder={(selected ? selected.label : placeholder) || ''}
          onChange={this.inputChanged}
          onKeyDown={this.inputKeyDown}
        />
        {value.length ? (
          matches.length ? (
            <Menu
              options={matches}
              selectedIndex={selectedIndex}
              selectedText={value}
              menuItemComponent={menuItemComponent}
              ref={this.menuRef}
              onClick={this.clicked}
            />
          ) : (
            <Empty>(No matches)</Empty>
          )
        ) : null}
      </Fragment>
    )
  }
}

export default Autocomplete
