import React, { Component } from 'react'
import Textarea from 'react-textarea-autosize'

class Name extends Component {
  state = {
    value: this.props.value
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props
    if (value !== prevProps.value) {
      this.setState({ value })
    }
  }

  changed = e => {
    this.props.onChange(e)
  }

  inputChanged = e => {
    const value = e.target.value.replace(/[\r\n]/g, '')
    this.setState({ value })
  }

  inputBlurred = e => {
    const { onChange, onBlur } = this.props
    onChange(e)
    onBlur && onBlur(e)
  }

  inputKeyPressed = e => {
    if (e.which === 13) {
      e.target.blur()
    } else if (e.which === 27) {
      this.setState({ value: this.props.value })
    }

    if (this.props.onKeyPress) {
      this.props.onKeyPress(e)
    }
  }

  render() {
    const { onChange, onBlur, onKeyDown, ...props } = this.props
    const { value } = this.state

    return (
      <Textarea
        className="form__input activity-details__name"
        {...props}
        value={value}
        onChange={this.inputChanged}
        onBlur={this.inputBlurred}
        onKeyDown={this.inputKeyPressed}
      />
    )
  }
}

export default Name
