import React, { createRef } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class Menu extends React.Component {
  state = { open: false }

  buttonRef = createRef()
  menuRef = createRef()

  componentDidMount() {
    document.addEventListener('mousedown', this.close)
    document.addEventListener('touchstart', this.close)
  }

  componentDidUpdate(prevProps) {
    if (this.state.open && (prevProps.location !== this.props.location)) {
      this.setState({ open: false })
    }
  }

  componentWillUnmount() {
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
    const Wrapper = this.props.component

    return (
      <Wrapper>
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
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

Menu.defaultProps = {
  component: 'div',
}

export default withRouter(Menu)
