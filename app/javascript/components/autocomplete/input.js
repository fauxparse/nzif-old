import React, { Component, createRef } from 'react'
import classNames from 'classnames'
import deburr from 'lodash/deburr'

class Input extends Component {
  state = {
    completing: false,
  }

  input = createRef()

  componentDidUpdate() {
    if (this.state.completing) {
      const { value, placeholder } = this.props
      const { length } = value
      const input = this.input.current
      const prefix = deburr(placeholder.substring(0, length)).toLowerCase()

      if (length && deburr(value).toLowerCase() === prefix) {
        setTimeout(() => {
          input.value = value + placeholder.substring(length)
          input.setSelectionRange(value.length, placeholder.length, 'backward')
        })
      }
    }
  }

  handleInput = (e) => {
    this.setState({ completing: e.nativeEvent.inputType === 'insertText' })
  }

  render() {
    const { className, value, type = 'text', onChange, ...props } = this.props
    const { completing } = this.state

    return (
      <input
        className={classNames('autocomplete__input', className)}
        type={type}
        {...props}
        ref={this.input}
        value={value}
        data-autocompleting={completing || undefined}
        onChange={onChange}
        onInput={this.handleInput}
      />
    )
  }
}

export default Input
