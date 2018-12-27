import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import deburr from 'lodash/deburr'
import Input from './input'
import Menu from './menu'

export { Highlight } from './menu_item'

const KEYS = {
  UP: 38,
  DOWN: 40,
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
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
        value: PropTypes.any.isRequired
      }).isRequired
    ).isRequired,
    menuItemComponent: PropTypes.func,
    placeholder: PropTypes.string.isRequired,
  }

  static defaultProps = {
    search
  }

  state = {
    value: '',
    matches: []
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
    switch (e.which) {
      case KEYS.UP:
      case KEYS.DOWN:
        e.preventDefault()
        e.stopPropagation()
        this.move(e.which === KEYS.UP ? -1 : 1)
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
