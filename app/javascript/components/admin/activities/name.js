import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import Textarea from 'react-textarea-autosize'
import { Input } from '../../form'

const NameInput = styled(Input)`${({ theme }) => css`
  font-size: ${theme.fonts.size(7)};
  line-height: ${theme.fonts.lineHeights.tight};
  padding: 0.25em 0;
  margin: 0 0 1.5rem;
  font-weight: ${theme.fonts.weights.light};
  resize: none;
`}`

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
      <NameInput
        as={Textarea}
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
