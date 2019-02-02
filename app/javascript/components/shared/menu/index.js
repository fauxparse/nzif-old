import React, { createRef } from 'react'
import PropTypes from 'prop-types'
import ReactRouterPropTypes from 'react-router-prop-types'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import Button from './button'
import Content from './content'
import Item from './item'
import Separator from './separator'

class Menu extends React.Component {
  state = { open: false }

  buttonRef = createRef()
  menuRef = createRef()

  componentDidUpdate(prevProps, prevState) {
    const { open } = this.state
    if (open) {
      if (!prevState.open) {
        this.addEventListeners()
      }
      if (prevProps.location !== this.props.location) {
        this.setState({ open: false })
      }
    } else if (prevState.open) {
      this.removeEventListeners()
    }
  }

  componentWillUnmount() {
    this.removeEventListeners()
  }

  addEventListeners() {
    document.addEventListener('mousedown', this.close)
    document.addEventListener('touchstart', this.close)
  }

  removeEventListeners() {
    document.removeEventListener('mousedown', this.close)
    document.removeEventListener('touchstart', this.close)
  }

  toggle = () => {
    this.setState({ open: !this.state.open })
  }

  close = e => {
    const menu = this.menuRef.current
    const button = this.buttonRef.current

    if (this.state.open && ![menu, button].find(el => el && el.contains(e.target))) {
      this.toggle()
    }
  }

  renderButton = () => {
    return this.props.renderButton({
      open: this.state.open,
      toggle: this.toggle,
      ref: this.buttonRef,
    })
  }

  renderContent = () => {
    return this.props.renderContent({
      open: this.state.open,
      ref: this.menuRef,
    })
  }

  render() {
    const { component: Wrapper } = this.props
    const { open } = this.state

    return (
      <Wrapper className={classNames('menu', { 'menu--open': open })}>
        {this.renderButton()}
        {this.renderContent()}
      </Wrapper>
    )
  }
}

Menu.propTypes = {
  renderButton: PropTypes.func.isRequired,
  renderContent: PropTypes.func.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.func.isRequired,
    PropTypes.symbol.isRequired,
  ]),
  location: ReactRouterPropTypes.location.isRequired,
}

Menu.defaultProps = {
  component: 'div',
}

Menu.Button = Button
Menu.Content = Content
Menu.Item = Item
Menu.Separator = Separator

export default withRouter(Menu)
