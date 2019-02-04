import React, { Component, Fragment, createRef } from 'react'
import PropTypes from 'prop-types'
import deburr from 'lodash/deburr'
import Input from './input'
import Menu from './menu'

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

class Autocomplete extends Component {
  static propTypes = {
    search: PropTypes.func,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired
      }).isRequired
    ).isRequired,
    autoFocus: PropTypes.bool,
    inputComponent: PropTypes.any,
    menuItemComponent: PropTypes.any,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    search,
    autoFocus: true,
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
    const {
      inputComponent: InputComponent = Input,
      menuItemComponent,
      placeholder,
      autoFocus,
    } = this.props
    const { value, matches, selected, selectedIndex } = this.state

    return (
      <Fragment>
        <InputComponent
          autoFocus={autoFocus}
          value={value}
          placeholder={(selected ? selected.label : !value && placeholder) || ''}
          onChange={this.inputChanged}
          onKeyDown={this.inputKeyDown}
        />
        {value.length ? (
          <Menu
            options={matches}
            selectedIndex={selectedIndex}
            selectedText={value}
            menuItemComponent={menuItemComponent}
            ref={this.menuRef}
            onClick={this.clicked}
          />
        ) : null}
      </Fragment>
    )
  }
}

Autocomplete.Input = Input
Autocomplete.Menu = Menu

export default Autocomplete
