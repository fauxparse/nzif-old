import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import RelativePortal from 'react-relative-portal'
import transition from '../../styles/transition'
import Icon from '../icons'

const KEYS = {
  UP: 38,
  DOWN: 40,
  ENTER: 13,
  ESC: 27,
  SPACE: 32,
  HOME: 36,
  END: 35,
}

const Chevron = styled(Icon).attrs({ name: 'chevron-down' })`
  flex: 0 0 auto;
  margin: 0 0 -1px 0.5rem;
  transition: ${transition('transform')};
`

const SelectTrigger = styled.div`${({ theme }) => css`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.border};
  cursor: pointer;

  &:focus,
  &[aria-expanded] {
    outline: none;
    border-bottom-color: ${theme.colors.accent};
  }
`}`

const SelectedValue = styled.span`${({ empty, theme }) => css`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0.5rem 0;
  margin-bottom: -1px;
  color: ${empty ? theme.colors.secondary : 'inherit'};
`}`

const SelectMenuItems = styled.ul`${({ theme }) => css`
  background: ${theme.colors.menuBackground};
  color: ${theme.colors.text};
  box-shadow: ${theme.shadow(8)};
  padding: 0.5rem 0;
  margin: 0;
  list-style: none;
  border-radius: ${theme.layout.borderRadius};
  max-height: 13.5rem;
  overflow-y: scroll;

  &:empty::after {
    content: "(No options)";
    display: block;
    text-align: center;
    padding: 0.5em 0;
    color: ${theme.colors.disabled};
  }
`}`

export const SelectMenuItem = styled.li`${({ theme }) => css`
  margin: 0;
  padding: 0.5rem 1rem;
  display: block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;

  &[aria-selected] {
    background: ${theme.colors.panelBackground};
  }

  &:hover,
  &:focus {
    outline: none;
    background: ${theme.colors.highlight};
  }
`}`

const SelectContainer = styled.div`${({ theme }) => css`
  display: inline-block;
  position: relative;

  &[aria-expanded] {
    ${Chevron} {
      transform: rotate(180deg);
    }
  }
`}`

class Select extends Component {
  static propTypes = {
    value: PropTypes.any,
    options: PropTypes.array.isRequired,
    placeholder: PropTypes.string,
    menuItemComponent: PropTypes.any,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    value: undefined,
    placeholder: 'Choose…',
    menuItemComponent: SelectMenuItem,
  }

  state = {
    open: false,
  }

  trigger = createRef()
  menu = createRef()

  value(option) {
    return option && (option.value === undefined ? option : option.value)
  }

  label(option) {
    return option && (option.label === undefined ? option : option.label)
  }

  setOpen = (open) => {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.setState({ open })
      if (open) {
        this.focusCurrentMenuItem()
      } else {
        this.trigger.current.focus()
      }
    }, 0)
  }

  toggle = () => this.setOpen(!this.state.open)

  show = () => this.setOpen(true)

  hide = () => this.setOpen(false)

  choose = (e) => {
    const { index } = e.target.dataset
    const option = this.props.options[index]
    this.props.onChange(option)
    this.hide()
  }

  triggerKeyDown = (e) => {
    switch(e.which) {
      case KEYS.ENTER:
      case KEYS.SPACE:
        e.preventDefault()
        e.stopPropagation()
        this.toggle()
    }
  }

  menuItemKeyDown = (e) => {
    switch(e.which) {
      case KEYS.ESC:
        e.preventDefault()
        e.stopPropagation()
        this.hide()
        break
      case KEYS.ENTER:
      case KEYS.SPACE:
        e.preventDefault()
        e.stopPropagation()
        this.choose(e)
        break
      case KEYS.UP:
      case KEYS.DOWN: {
        const direction = e.which === KEYS.UP ? -1 : 1
        const { options: { length } } = this.props
        const { dataset: { index } } = e.target
        e.preventDefault()
        e.stopPropagation()
        this.focusMenuItem((parseInt(index, 10) + length + direction) % length)
        break
      }
      case KEYS.HOME:
      case KEYS.END:
        e.preventDefault()
        e.stopPropagation()
        this.focusMenuItem(e.which === KEYS.END ? this.props.options.length - 1 : 0)
        break
    }
  }

  focusCurrentMenuItem() {
    const { value, options } = this.props
    const index = options.indexOf(value)
    this.focusMenuItem(index === -1 ? 0 : index)
  }

  focusMenuItem(index) {
    const items = this.menu.current.querySelectorAll('[role=menuitemradio]')
    const item = items[index]

    if (item) {
      item.focus()
      item.scrollIntoView({ block: 'nearest' })
    }
  }

  render() {
    const { value, options, placeholder, menuItemComponent: Item } = this.props
    const { open } = this.state
    const selectedOption = value && options.find(option => this.value(option) === value)

    return (
      <SelectContainer role="menu" aria-expanded={open || undefined}>
        <SelectTrigger
          ref={this.trigger}
          tabIndex={0}
          onKeyDown={this.triggerKeyDown}
          onClick={this.toggle}
        >
          <SelectedValue empty={!selectedOption}>
            {this.label(selectedOption) || placeholder}
          </SelectedValue>
          <Chevron />
        </SelectTrigger>
        {open && (
          <RelativePortal
            left={-16}
            top={-48}
            onOutClick={open ? this.hide : undefined}
          >
            <SelectMenuItems
              ref={this.menu}
              style={{ minWidth: `${this.trigger.current.offsetWidth + 32}px` }}
            >
              {options.map((option, index) => (
                <Item
                  key={this.value(option)}
                  role="menuitemradio"
                  tabIndex={-1}
                  data-index={index}
                  aria-selected={(this.value(option) === this.value(value)) || undefined}
                  onClick={this.choose}
                  onKeyDown={this.menuItemKeyDown}
                >
                  {this.label(option)}
                </Item>
              ))}
            </SelectMenuItems>
          </RelativePortal>
        )}
      </SelectContainer>
    )
  }
}

Select.Container = SelectContainer

export default Select
