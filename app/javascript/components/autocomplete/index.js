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
    showFullList: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    search,
    autoFocus: true,
    showFullList: false,
  }

  state = {
    value: '',
    matches: []
  }

  input = createRef()
  menu = createRef()

  componentDidMount() {
    this.valueChanged('')
  }

  componentDidUpdate(_, prevState) {
    const menu = this.menu.current
    const { selectedIndex } = this.state

    if (menu && selectedIndex !== prevState.selectedIndex) {
      const item = menu.querySelectorAll('li')[selectedIndex]
      item && item.scrollIntoView({ block: 'nearest' })
    }
  }

  inputChanged = (e) => {
    const { target: { value } } = e
    this.valueChanged(value)
  }

  valueChanged = (value) => {
    const { search, options } = this.props
    const { selected } = this.state
    const matches = search(value, options)
    const selectedIndex = selected ? Math.max(matches.indexOf(selected), 0) : 0

    this.setState({
      value,
      matches,
      selectedIndex: value ? selectedIndex : undefined,
      selected: matches[selectedIndex],
    })
  }

  inputKeyDown = e => {
    const input = this.input.current
    const { selectionStart, selectionEnd } = input

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
          input.setSelectionRange(selectionEnd, selectionEnd)
          this.inputChanged(e)
        }
        break
      default:
        break
    }
  }

  move = (direction = 1) => {
    const { options, showFullList } = this.props
    const { matches, selectedIndex: oldIndex } = this.state
    const list = matches.length ? matches : (showFullList ? options : [])
    const { length } = list

    if (length) {
      const selectedIndex =
        oldIndex === undefined
          ? (direction < 0 ? matches.length - 1 : 0)
          : (oldIndex + matches.length + direction) % matches.length
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
    this.setState({ selectedIndex: index })
    this.confirm(this.itemAt(index))
  }

  itemAt(index) {
    const { matches } = this.state
    const { options, showFullList } = this.props
    if (matches.length) {
      return matches[index]
    } else if (showFullList) {
      return options[index]
    }
  }

  render() {
    const {
      inputComponent: InputComponent = Input,
      menuItemComponent,
      placeholder,
      autoFocus,
      showFullList,
    } = this.props
    const { value, matches, selected, selectedIndex } = this.state

    return (
      <Fragment>
        <InputComponent
          ref={this.input}
          autoFocus={autoFocus}
          value={value}
          placeholder={value ? (selected ? selected.label : '') : placeholder}
          onChange={this.inputChanged}
          onKeyDown={this.inputKeyDown}
        />
        {showFullList || value.length ? (
          <Menu
            options={matches}
            selectedIndex={selectedIndex}
            selectedText={value}
            menuItemComponent={menuItemComponent}
            tabIndex={-1}
            menuRef={this.menu}
            onClick={this.clicked}
            onKeyDown={this.inputKeyDown}
          />
        ) : null}
      </Fragment>
    )
  }
}

Autocomplete.Input = Input
Autocomplete.Menu = Menu

export default Autocomplete
