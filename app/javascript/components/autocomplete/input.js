import React, { Component, createRef } from 'react'
import styled, { css } from 'styled-components'
import deburr from 'lodash/deburr'

const StyledInput = styled.input`${({ theme }) => css`
  display: block;
  width: 100%;
  appearance: none;
  background: none;
  color: inherit;
  outline: none;
  border: 0;
  font-family: inherit;
  font-size: ${theme.fonts.scale(4)};
  padding: 0.5rem 1rem 0.75rem;

  &[data-autocompleting] {
    &::selection {
      background: transparent;
      color: ${theme.colors.disabled};
    }
  }
`}`

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
    const { value, onChange, ...props } = this.props
    const { completing } = this.state

    return (
      <StyledInput
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
