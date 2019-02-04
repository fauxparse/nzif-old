import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import RelativePortal from 'react-relative-portal'
import ThemeContext from '../../lib/theme_context'
import CommonProps from '../../lib/proptypes'
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

const SelectMenuItem = ({ className, children, ...props }) => (
  <li className={classNames('select__menu-item', className)} {...props}>
    {children}
  </li>
)

class Select extends Component {
  static propTypes = {
    className: CommonProps.className,
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
    const { className, value, options, placeholder, menuItemComponent: Item = 'li' } = this.props
    const { open } = this.state
    const selectedOption = value && options.find(option => this.value(option) === value)

    return (
      <div
        className={classNames('select', className)}
        role="menu"
      >
        <div
          className="select__trigger"
          ref={this.trigger}
          role="menubutton"
          tabIndex={0}
          onKeyDown={this.triggerKeyDown}
          onClick={this.toggle}
          aria-expanded={open || undefined}
        >
          <span className="select__current-value" data-empty={!selectedOption || undefined}>
            {this.label(selectedOption) || placeholder}
          </span>
          <Icon className="select__chevron" name="chevron-down" />
        </div>
        {open && (
          <ThemeContext.Consumer>
            {theme =>
              <RelativePortal
                left={-16}
                top={-48}
                onOutClick={open ? this.hide : undefined}
                data-theme={theme}
              >
                <ul
                  className="select__menu-items"
                  ref={this.menu}
                  style={{ minWidth: `${this.trigger.current.offsetWidth + 32}px` }}
                >
                  {options.map((option, index) => (
                    <Item
                      className="select__menu-item"
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
                </ul>
              </RelativePortal>
            }
          </ThemeContext.Consumer>
        )}
      </div>
    )
  }
}

export default Select
